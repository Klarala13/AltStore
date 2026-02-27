import { BadRequestException, Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import * as crypto from "crypto";
import * as QRCode from "qrcode";
import { PrismaService } from "../prisma/prisma.service";
import { StorageProvider, STORAGE_PROVIDER } from "../storage/storage.provider";
import { RequestDownloadDto } from "./downloads.dto";
import { ConfigService } from "@nestjs/config";

/** TTL for presigned R2 download URLs (5 minutes) */
const SIGNED_URL_TTL = 300;

/** GDPR: monthly rotating salt — stored in env, rotated externally */
function hashIp(ip: string, salt: string): string {
  return crypto.createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

@Injectable()
export class DownloadsService {
  private readonly logger = new Logger(DownloadsService.name);

  constructor(
    private readonly prisma: PrismaService,
    @Inject(STORAGE_PROVIDER) private readonly storage: StorageProvider,
    private readonly config: ConfigService
  ) {}

  /**
   * Download request flow (per plan §1.3):
   * 1. Verify version exists and is APPROVED
   * 2. Generate R2 presigned URL (5 min TTL)
   * 3. Generate QR code pointing to the signed URL
   * 4. Log download event (hashed IP — GDPR)
   * 5. Increment app totalDownloads counter
   */
  async requestDownload(
    dto: RequestDownloadDto,
    ip: string,
    userAgent: string,
    country?: string
  ): Promise<{ signedUrl: string; qrCode: string }> {
    const version = await this.prisma.version.findUnique({
      where: { id: dto.versionId },
      include: { app: { select: { id: true, status: true } } },
    });

    if (!version) throw new NotFoundException("Version not found");
    if (version.status !== "APPROVED") {
      throw new BadRequestException("This version is not available for download");
    }
    if (version.app.status !== "ACTIVE") {
      throw new BadRequestException("This app is not currently available");
    }

    // Generate signed download URL from R2
    const signedUrl = await this.storage.getSignedUrl(version.fileKey, SIGNED_URL_TTL);

    // Generate QR code as data URL (base64 PNG)
    const qrCode = await QRCode.toDataURL(signedUrl);

    // GDPR-compliant download log: hash IP with monthly rotating salt
    const salt = this.config.get<string>("IP_HASH_SALT") ?? "default-salt";
    const ipHash = hashIp(ip, salt);

    await this.prisma.$transaction([
      this.prisma.downloadLog.create({
        data: {
          versionId: dto.versionId,
          userId: dto.userId ?? null,
          ipHash,
          userAgent,
          country: country ?? null,
        },
      }),
      this.prisma.app.update({
        where: { id: version.app.id },
        data: { totalDownloads: { increment: 1 } },
      }),
    ]);

    this.logger.log(`Download issued for version ${dto.versionId}`);

    return { signedUrl, qrCode };
  }
}
