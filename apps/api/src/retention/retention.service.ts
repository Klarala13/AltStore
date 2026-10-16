import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import {
  DOWNLOAD_LOG_SWEEP,
  DOWNLOAD_LOG_SWEEP_CRON,
  RETENTION_QUEUE,
} from "./retention.constants";

/** Registers the daily sweep as a Bull repeatable job. */
@Injectable()
export class RetentionService implements OnModuleInit {
  private readonly logger = new Logger(RetentionService.name);

  constructor(@InjectQueue(RETENTION_QUEUE) private readonly queue: Queue) {}

  async onModuleInit(): Promise<void> {
    try {
      // Clear before adding. Bull keys a repeatable job by its cron, so changing
      // the schedule leaves the old one registered and the sweep would then run
      // on both. Clearing first keeps boot idempotent.
      const existing = await this.queue.getRepeatableJobs();
      for (const job of existing) {
        await this.queue.removeRepeatableByKey(job.key);
      }

      await this.queue.add(
        DOWNLOAD_LOG_SWEEP,
        {},
        {
          repeat: { cron: DOWNLOAD_LOG_SWEEP_CRON },
          removeOnComplete: true,
          removeOnFail: 50,
        }
      );

      this.logger.log(`DownloadLog sweep scheduled (${DOWNLOAD_LOG_SWEEP_CRON} UTC)`);
    } catch (error) {
      // Never block boot on this. If Redis is unreachable the API must still
      // come up and serve the catalogue — a missed retention sweep is a problem
      // for tomorrow, an API that refuses to start is a problem right now. This
      // project has already spent two weeks down; it does not need a new way to
      // fail at startup.
      this.logger.error(
        `Could not schedule the DownloadLog sweep, continuing without it: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }
}
