import { Inject, Logger } from "@nestjs/common";
import type { Prisma } from "@altstore/db";
import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { PrismaService } from "../prisma/prisma.service";
import { StorageProvider, STORAGE_PROVIDER } from "../storage/storage.provider";
import { VirusTotalService } from "./virustotal.service";
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
    const { versionId, fileKey, appBundleId } = job.data;
    this.logger.log(`Starting virus scan for version ${versionId}`);

    // --- Log scan start ---
    await this.prisma.securityLog.create({
      data: {
        entityType: "VERSION",
        entityId: versionId,
        action: "VIRUS_SCAN_STARTED",
        severity: "INFO",
        performedBy: "SYSTEM",
      },
    });

    try {
      // Download file from R2 into memory for VirusTotal submission
      // We get a signed URL and fetch the bytes
      const signedUrl = await this.storage.getSignedUrl(fileKey, 300);
      const fileRes = await fetch(signedUrl);
      if (!fileRes.ok) throw new Error("Failed to fetch APK from R2");
      const buffer = Buffer.from(await fileRes.arrayBuffer());

      const filename = fileKey.split("/").pop() ?? "upload.apk";
      const analysis = await this.virusTotal.scanBuffer(buffer, filename);

      const isClean = analysis.stats.malicious === 0 && analysis.stats.suspicious === 0;

      if (isClean) {
        // Move file from pending → permanent location
        const permanentKey = `apps/${appBundleId}/${versionId}/app-release.apk`;
        await this.storage.move(fileKey, permanentKey);

        await this.prisma.version.update({
          where: { id: versionId },
          data: {
            status: "APPROVED",
            fileKey: permanentKey,
            virusTotalId: analysis.id,
            virusTotalReport: analysis as unknown as Prisma.InputJsonValue,
          },
        });

        await this.prisma.securityLog.create({
          data: {
            entityType: "VERSION",
            entityId: versionId,
            action: "VIRUS_SCAN_CLEAN",
            severity: "INFO",
            metadata: { stats: analysis.stats },
            performedBy: "SYSTEM",
          },
        });

        this.logger.log(`Version ${versionId} passed scan — moved to ${permanentKey}`);
      } else {
        // Delete infected file from R2 immediately
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

        await this.prisma.securityLog.create({
          data: {
            entityType: "VERSION",
            entityId: versionId,
            action: "VIRUS_FOUND",
            severity: "CRITICAL",
            metadata: { stats: analysis.stats, analysisId: analysis.id },
            performedBy: "SYSTEM",
          },
        });

        this.logger.error(
          `Version ${versionId} INFECTED — ${analysis.stats.malicious} detections. File deleted.`
        );
      }
    } catch (err) {
      this.logger.error(`Scan failed for version ${versionId}`, err);

      await this.prisma.version.update({
        where: { id: versionId },
        data: { status: "SCANNING" }, // Keep in SCANNING for retry
      });

      await this.prisma.securityLog.create({
        data: {
          entityType: "VERSION",
          entityId: versionId,
          action: "VIRUS_SCAN_ERROR",
          severity: "ERROR",
          metadata: { error: String(err) },
          performedBy: "SYSTEM",
        },
      });

      throw err; // Re-throw so BullMQ retries the job
    }
  }
}
