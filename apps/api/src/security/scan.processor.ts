import { Inject, Logger } from "@nestjs/common";
import type { Prisma } from "@appia/db";
import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { PrismaService } from "../prisma/prisma.service";
import { StorageProvider, STORAGE_PROVIDER } from "../storage/storage.provider";
import { VirusTotalService, VtAnalysis } from "./virustotal.service";
import { SCAN_QUEUE, ScanJobData } from "./security.constants";

@Processor(SCAN_QUEUE)
export class ScanProcessor {
  private readonly logger = new Logger(ScanProcessor.name);

  constructor(
    private readonly prisma: PrismaService,
    @Inject(STORAGE_PROVIDER) private readonly storage: StorageProvider,
    private readonly virusTotal: VirusTotalService
  ) {}

  @Process()
  async handleScan(job: Job<ScanJobData>): Promise<void> {
    const { versionId } = job.data;
    const isRescan = job.data.mode === "rescan";
    this.logger.log(`Starting virus ${isRescan ? "rescan" : "scan"} for version ${versionId}`);

    await this.log(versionId, "VIRUS_SCAN_STARTED", "INFO", { rescan: isRescan });

    try {
      const analysis = await this.analyse(job.data, isRescan);
      const isClean = analysis.stats.malicious === 0 && analysis.stats.suspicious === 0;

      if (isRescan) {
        await this.recordRescan(job.data, analysis, isClean);
      } else if (isClean) {
        await this.approveUpload(job.data, analysis);
      } else {
        await this.rejectInfectedUpload(job.data, analysis);
      }
    } catch (err) {
      this.logger.error(`Scan failed for version ${versionId}`, err);

      const isLastAttempt = job.attemptsMade + 1 >= (job.opts.attempts ?? 1);

      // A rescan targets a version that may be live: an outage or a missing
      // VT_API_KEY must not unpublish it, so its status is left untouched.
      if (!isRescan) {
        await this.prisma.version.update({
          where: { id: versionId },
          data: { status: isLastAttempt ? "REJECTED" : "SCANNING" },
        });
      }

      await this.log(versionId, "VIRUS_SCAN_ERROR", "ERROR", {
        error: String(err),
        lastAttempt: isLastAttempt,
        rescan: isRescan,
      });

      throw err; // Re-throw so Bull retries the job
    }
  }

  private async analyse(data: ScanJobData, isRescan: boolean): Promise<VtAnalysis> {
    // Rescans are usually files VirusTotal already knows; a hash lookup costs one
    // request instead of an upload plus minutes of polling.
    if (isRescan && data.fileSha256) {
      const known = await this.virusTotal.lookupHash(data.fileSha256);
      if (known) return known;
    }

    const signedUrl = await this.storage.getSignedUrl(data.fileKey, 300);
    const fileRes = await fetch(signedUrl);
    if (!fileRes.ok) throw new Error(`Failed to fetch APK from storage: ${fileRes.status}`);
    const buffer = Buffer.from(await fileRes.arrayBuffer());

    const filename = data.fileKey.split("/").pop() ?? "upload.apk";
    return this.virusTotal.scanBuffer(buffer, filename);
  }

  private async approveUpload(data: ScanJobData, analysis: VtAnalysis): Promise<void> {
    const { versionId, fileKey, appBundleId } = data;
    const permanentKey = `apps/${appBundleId}/${versionId}/app-release.apk`;
    await this.storage.move(fileKey, permanentKey);

    await this.prisma.version.update({
      where: { id: versionId },
      data: {
        status: "APPROVED",
        fileKey: permanentKey,
        virusTotalId: analysis.id,
        virusTotalReport: analysis as unknown as Prisma.InputJsonValue,
        scannedAt: new Date(),
      },
    });

    await this.log(versionId, "VIRUS_SCAN_CLEAN", "INFO", { stats: analysis.stats });
    this.logger.log(`Version ${versionId} passed scan — moved to ${permanentKey}`);
  }

  private async rejectInfectedUpload(data: ScanJobData, analysis: VtAnalysis): Promise<void> {
    const { versionId, fileKey } = data;
    await this.storage.delete(fileKey);

    await this.prisma.version.update({
      where: { id: versionId },
      data: {
        status: "INFECTED",
        virusTotalId: analysis.id,
        virusTotalReport: analysis as unknown as Prisma.InputJsonValue,
        scannedAt: new Date(),
      },
    });

    await this.log(versionId, "VIRUS_FOUND", "CRITICAL", {
      stats: analysis.stats,
      analysisId: analysis.id,
    });
    this.logger.error(
      `Version ${versionId} INFECTED — ${analysis.stats.malicious} detections. File deleted.`
    );
  }

  /**
   * Status only ever moves to INFECTED here, never to APPROVED: a rescan must
   * not publish something an admin rejected. The file of an infected live
   * version is kept (downloads stop because status is no longer APPROVED) so an
   * admin can confirm or overrule the detection before anything is deleted.
   */
  private async recordRescan(
    data: ScanJobData,
    analysis: VtAnalysis,
    isClean: boolean
  ): Promise<void> {
    const { versionId, fileKey } = data;

    await this.prisma.version.update({
      where: { id: versionId },
      data: {
        ...(isClean ? {} : { status: "INFECTED" as const }),
        virusTotalId: analysis.id,
        virusTotalReport: analysis as unknown as Prisma.InputJsonValue,
        scannedAt: new Date(),
      },
    });

    if (isClean) {
      await this.log(versionId, "VIRUS_RESCAN_CLEAN", "INFO", { stats: analysis.stats });
      this.logger.log(`Version ${versionId} passed rescan`);
      return;
    }

    await this.log(versionId, "VIRUS_FOUND", "CRITICAL", {
      stats: analysis.stats,
      analysisId: analysis.id,
      rescan: true,
      quarantinedFileKey: fileKey,
    });
    this.logger.error(
      `Version ${versionId} INFECTED on rescan — ${analysis.stats.malicious} detections. Downloads blocked, file kept for review.`
    );
  }

  private log(
    versionId: string,
    action: string,
    severity: "INFO" | "ERROR" | "CRITICAL",
    metadata: Prisma.InputJsonObject
  ) {
    return this.prisma.securityLog.create({
      data: {
        entityType: "VERSION",
        entityId: versionId,
        action,
        severity,
        metadata,
        performedBy: "SYSTEM",
      },
    });
  }
}
