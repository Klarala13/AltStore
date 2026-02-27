import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import * as crypto from "crypto";
import { PrismaService } from "../prisma/prisma.service";
import { StorageProvider, STORAGE_PROVIDER } from "../storage/storage.provider";
import { CreateVersionDto } from "./versions.dto";
import { SCAN_QUEUE, ScanJobData } from "../security/security.constants";

/** APK files start with PK (ZIP) magic bytes: 0x50 0x4B 0x03 0x04 */
const APK_MAGIC = Buffer.from([0x50, 0x4b, 0x03, 0x04]);
const MAX_APK_SIZE_BYTES = 500 * 1024 * 1024; // 500 MB

@Injectable()
export class VersionsService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(STORAGE_PROVIDER) private readonly storage: StorageProvider,
    @InjectQueue(SCAN_QUEUE) private readonly scanQueue: Queue<ScanJobData>
  ) {}

  async getVersionHistory(appSlug: string) {
    const app = await this.prisma.app.findUnique({ where: { slug: appSlug } });
    if (!app) throw new NotFoundException(`App "${appSlug}" not found`);

    const versions = await this.prisma.version.findMany({
      where: { appId: app.id, status: "APPROVED" },
      orderBy: { createdAt: "desc" },
    });

    return versions.map((v, index) => ({
      ...v,
      fileSize: v.fileSize.toString(), // BigInt → string for JSON
      isLatest: index === 0,
      diffFromPrevious:
        index < versions.length - 1 ? this.computeDiff(v, versions[index + 1]) : null,
    }));
  }

  /**
   * Main upload flow:
   * 1. Validate MIME type + magic bytes + size
   * 2. Compute SHA-256
   * 3. Upload to R2 under uploads/pending/{uuid}.apk
   * 4. Create Version record (SCANNING status)
   * 5. Enqueue VirusTotal scan job
   */
  async uploadApk(
    appId: string,
    developerId: string,
    dto: CreateVersionDto,
    file: Express.Multer.File
  ) {
    // --- Ownership check ---
    const app = await this.prisma.app.findUnique({
      where: { id: appId },
      select: { developerId: true, bundleId: true },
    });
    if (!app) throw new NotFoundException(`App ${appId} not found`);
    if (app.developerId !== developerId) throw new ForbiddenException();

    // --- File validations ---
    this.validateApkFile(file);

    const sha256 = crypto.createHash("sha256").update(file.buffer).digest("hex");

    // --- Upload to R2 (pending quarantine folder) ---
    const pendingKey = `uploads/pending/${crypto.randomUUID()}.apk`;
    await this.storage.upload(pendingKey, file.buffer, "application/vnd.android.package-archive");

    // --- Persist Version record (SCANNING) ---
    const version = await this.prisma.version.create({
      data: {
        appId,
        versionName: dto.versionName,
        versionCode: dto.versionCode,
        platform: dto.platform,
        fileKey: pendingKey,
        fileSize: BigInt(file.size),
        fileSha256: sha256,
        changelog: dto.changelog,
        minOs: dto.minOs,
        status: "SCANNING",
      },
    });

    // --- Enqueue async VirusTotal scan ---
    await this.scanQueue.add(
      { versionId: version.id, fileKey: pendingKey, appBundleId: app.bundleId },
      { attempts: 3, backoff: { type: "exponential", delay: 5000 } }
    );

    return {
      ...version,
      fileSize: version.fileSize.toString(),
    };
  }

  async getVersionStatus(appId: string, versionId: string, developerId: string) {
    const version = await this.prisma.version.findUnique({
      where: { id: versionId },
      select: { id: true, appId: true, status: true },
    });
    if (!version || version.appId !== appId) throw new NotFoundException("Version not found");

    // Confirm the requesting developer owns the app
    const app = await this.prisma.app.findUnique({
      where: { id: appId },
      select: { developerId: true },
    });
    if (!app || app.developerId !== developerId) throw new ForbiddenException();

    return { id: version.id, status: version.status };
  }

  private validateApkFile(file: Express.Multer.File): void {
    if (!file) throw new BadRequestException("APK file is required");

    if (file.size > MAX_APK_SIZE_BYTES) {
      throw new BadRequestException("File exceeds the 500 MB size limit");
    }

    // Validate APK magic bytes (PK ZIP header) — prevents MIME spoofing
    const magic = file.buffer.subarray(0, 4);
    if (!magic.equals(APK_MAGIC)) {
      throw new BadRequestException("File is not a valid APK (invalid magic bytes)");
    }
  }

  private computeDiff(
    current: { fileSize: bigint; versionName: string },
    previous: { fileSize: bigint; versionName: string }
  ) {
    const sizeDelta = Number(current.fileSize) - Number(previous.fileSize);
    return {
      sizeDelta,
      sizeDeltaFormatted: this.formatBytes(Math.abs(sizeDelta)),
      sizeTrend: sizeDelta > 0 ? "larger" : "smaller",
      previousVersion: previous.versionName,
    };
  }

  private formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
}
