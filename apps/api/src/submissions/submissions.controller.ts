import {
  Body,
  Controller,
  Headers,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";
import { SubmissionsService } from "./submissions.service";
import { SubmitAppDto } from "./submissions.dto";
import { VersionsService } from "../versions/versions.service";
import { CompleteUploadDto, CreateVersionDto } from "../versions/versions.dto";
import { RateLimit, RateLimitGuard } from "../common/guards/rate-limit.guard";
import { InternalKeyGuard } from "../common/guards/internal-key.guard";

const MAX_APK_BYTES = 500 * 1024 * 1024;
const ONE_HOUR_MS = 60 * 60 * 1000;

/**
 * Submitting an app without an account.
 *
 * Two steps, because the APK upload needs an app to attach to: POST /submissions
 * creates the app and hands back a short-lived token, which POST
 * /submissions/:appId/apk then spends. Everything lands in PENDING_REVIEW and
 * SCANNING exactly as an authenticated upload does, so nothing reaches the store
 * without moderation and a virus scan.
 */
@Controller("submissions")
export class SubmissionsController {
  constructor(
    private readonly submissionsService: SubmissionsService,
    private readonly versionsService: VersionsService
  ) {}

  @Post()
  @UseGuards(InternalKeyGuard, RateLimitGuard)
  @RateLimit({ limit: 5, windowMs: ONE_HOUR_MS })
  submit(@Body() dto: SubmitAppDto) {
    return this.submissionsService.submit(dto);
  }

  /**
   * Subida directa, en dos llamadas pequenas con el binario en medio yendo a R2.
   *
   * La ruta multipart de abajo no sirve para un APK real: el puente de Vercel
   * corta el cuerpo a 4,5 MB. Estas dos solo mueven JSON, asi que pasan de
   * sobra.
   */
  @Post(":appId/apk/upload-url")
  @UseGuards(InternalKeyGuard, RateLimitGuard)
  @RateLimit({ limit: 10, windowMs: ONE_HOUR_MS })
  async createUploadUrl(
    @Param("appId") appId: string,
    @Headers("x-upload-token") uploadToken: string | undefined
  ) {
    const developerId = await this.submissionsService.resolveUploadToken(uploadToken, appId);
    return this.versionsService.createUploadUrl(appId, developerId);
  }

  @Post(":appId/apk/complete")
  @UseGuards(InternalKeyGuard, RateLimitGuard)
  @RateLimit({ limit: 10, windowMs: ONE_HOUR_MS })
  async completeUpload(
    @Param("appId") appId: string,
    @Headers("x-upload-token") uploadToken: string | undefined,
    @Body() dto: CompleteUploadDto
  ) {
    const developerId = await this.submissionsService.resolveUploadToken(uploadToken, appId);
    return this.versionsService.completeUpload(appId, developerId, dto);
  }

  @Post(":appId/apk")
  @UseGuards(InternalKeyGuard, RateLimitGuard)
  @RateLimit({ limit: 5, windowMs: ONE_HOUR_MS })
  @UseInterceptors(
    FileInterceptor("file", {
      storage: memoryStorage(),
      limits: { fileSize: MAX_APK_BYTES },
    })
  )
  async uploadApk(
    @Param("appId") appId: string,
    @Headers("x-upload-token") uploadToken: string | undefined,
    @Body() dto: CreateVersionDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    const developerId = await this.submissionsService.resolveUploadToken(uploadToken, appId);
    return this.versionsService.uploadApk(appId, developerId, dto, file);
  }
}
