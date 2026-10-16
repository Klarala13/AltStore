import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Process, Processor } from "@nestjs/bull";
import { PrismaService } from "../prisma/prisma.service";
import {
  DEFAULT_RETENTION_DAYS,
  DELETE_BATCH_SIZE,
  DOWNLOAD_LOG_SWEEP,
  MAX_BATCHES_PER_RUN,
  RETENTION_QUEUE,
} from "./retention.constants";

/**
 * Deletes DownloadLog rows past their retention period.
 *
 * Why this exists: /privacy and /gdpr both state that download logs are deleted
 * after 90 days, and /gdpr goes further and calls it "an automated nightly job".
 * Until this file there was no such job, so the rows were kept forever and all
 * three statements were false.
 *
 * It is also right independently of the copy. A DownloadLog row holds an ipHash,
 * a userAgent, a country and — for a signed-in consumer — a real userId. A
 * hashed IP is pseudonymised, not anonymous, so GDPR still treats it as personal
 * data and Article 5(1)(e) caps how long it may be kept.
 *
 * Nothing is lost by deleting. The table is write-only: `downloads.service.ts`
 * creates rows and no code path ever reads them. Download totals come from the
 * `App.totalDownloads` counter, which is incremented separately.
 */
@Processor(RETENTION_QUEUE)
export class RetentionProcessor {
  private readonly logger = new Logger(RetentionProcessor.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService
  ) {}

  @Process(DOWNLOAD_LOG_SWEEP)
  async sweepDownloadLogs(): Promise<void> {
    const days = this.config.get<number>("DOWNLOAD_LOG_RETENTION_DAYS", DEFAULT_RETENTION_DAYS);
    const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    let deleted = 0;
    let batches = 0;

    // Deleted in bounded batches rather than one statement: the table only ever
    // grows, so the first run after shipping this could be large.
    for (; batches < MAX_BATCHES_PER_RUN; batches++) {
      const stale = await this.prisma.downloadLog.findMany({
        where: { createdAt: { lt: cutoff } },
        select: { id: true },
        take: DELETE_BATCH_SIZE,
      });

      if (stale.length === 0) break;

      const { count } = await this.prisma.downloadLog.deleteMany({
        where: { id: { in: stale.map((row) => row.id) } },
      });
      deleted += count;

      if (stale.length < DELETE_BATCH_SIZE) break;
    }

    this.logger.log(
      `DownloadLog sweep: deleted ${deleted} row(s) older than ${days} days (before ${cutoff.toISOString()})`
    );

    // Written even when nothing was deleted. "The job ran and found nothing" and
    // "the job never ran" look identical otherwise, and this project has already
    // lost two weeks to a green tick that meant nothing. Visible in
    // /admin/security-logs.
    await this.prisma.securityLog.create({
      data: {
        entityType: "SYSTEM",
        entityId: "download-log-retention",
        action: "RETENTION_SWEEP",
        severity: "INFO",
        performedBy: "SYSTEM",
        metadata: { deleted, retentionDays: days, cutoff: cutoff.toISOString() },
      },
    });
  }
}
