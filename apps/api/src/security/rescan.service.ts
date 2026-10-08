import { Injectable, Logger, ServiceUnavailableException } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import { PrismaService } from "../prisma/prisma.service";
import { VirusTotalService } from "./virustotal.service";
import { SCAN_QUEUE, ScanJobData } from "./security.constants";

// Spacing jobs out keeps a batch inside VirusTotal's public quota (4 requests/minute).
const STAGGER_MS = 20_000;

export interface RescanResult {
  queued: number;
  versionIds: string[];
}

@Injectable()
export class RescanService {
  private readonly logger = new Logger(RescanService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly virusTotal: VirusTotalService,
    @InjectQueue(SCAN_QUEUE) private readonly scanQueue: Queue<ScanJobData>
  ) {}

  /**
   * Queues a rescan for every APPROVED version — by default only the ones that
   * never got a VirusTotal report (e.g. seeded straight to APPROVED), or all of
   * them when `all` is set, to refresh old reports against newer signatures.
   */
  async queueApprovedVersions(all: boolean, requestedBy: string): Promise<RescanResult> {
    // Fail loudly here instead of queueing jobs that would each fail three times.
    if (!this.virusTotal.isConfigured()) {
      throw new ServiceUnavailableException(
        "VirusTotal is not configured. Set VT_API_KEY on the API before rescanning."
      );
    }

    const versions = await this.prisma.version.findMany({
      where: { status: "APPROVED", ...(all ? {} : { virusTotalId: null }) },
      select: {
        id: true,
        fileKey: true,
        fileSha256: true,
        app: { select: { bundleId: true } },
      },
      orderBy: { createdAt: "asc" },
    });

    await Promise.all(
      versions.map((v, i) =>
        this.scanQueue.add(
          {
            versionId: v.id,
            fileKey: v.fileKey,
            appBundleId: v.app.bundleId,
            fileSha256: v.fileSha256,
            mode: "rescan",
          },
          {
            // Same id while a rescan is pending or running, so a double click
            // doesn't scan twice; removed afterwards so the next request can run.
            jobId: `rescan:${v.id}`,
            delay: i * STAGGER_MS,
            attempts: 3,
            backoff: { type: "exponential", delay: 60_000 },
            removeOnComplete: true,
            removeOnFail: true,
          }
        )
      )
    );

    await this.prisma.securityLog.create({
      data: {
        entityType: "VERSION",
        entityId: "*",
        action: "VIRUS_RESCAN_QUEUED",
        severity: "INFO",
        metadata: { all, count: versions.length, versionIds: versions.map((v) => v.id) },
        performedBy: requestedBy,
      },
    });

    this.logger.log(`Queued ${versions.length} rescans (all=${all}) for ${requestedBy}`);
    return { queued: versions.length, versionIds: versions.map((v) => v.id) };
  }
}
