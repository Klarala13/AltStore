import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";
import { VersionsService } from "./versions.service";
import { CompleteUploadDto, CreateVersionDto } from "./versions.dto";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { JwtPayload } from "../auth/jwt.strategy";

interface AuthRequest extends Request {
  user: JwtPayload;
}

@Controller()
export class VersionsController {
  constructor(private readonly versionsService: VersionsService) {}

  /** GET /apps/:appId/versions/:versionId/status — authenticated developer polls scan result */
  @Get("apps/:appId/versions/:versionId/status")
  @UseGuards(JwtAuthGuard)
  getVersionStatus(
    @Param("appId") appId: string,
    @Param("versionId") versionId: string,
    @Request() req: AuthRequest
  ) {
    return this.versionsService.getVersionStatus(appId, versionId, req.user.sub);
  }

  /** GET /apps/:slug/versions — public, returns approved versions with diffs */
  @Get("apps/:slug/versions")
  getVersionHistory(@Param("slug") slug: string) {
    return this.versionsService.getVersionHistory(slug);
  }

  /**
   * POST /apps/:appId/versions/upload-url — paso 1 de la subida directa.
   *
   * Devuelve una URL firmada para que el navegador escriba en R2 sin pasar por
   * ningun servidor. El puente de Vercel corta el cuerpo a 4,5 MB, asi que por
   * la ruta multipart de abajo no cabe ningun APK real.
   */
  @Post("apps/:appId/versions/upload-url")
  @UseGuards(JwtAuthGuard)
  createUploadUrl(@Param("appId") appId: string, @Request() req: AuthRequest) {
    return this.versionsService.createUploadUrl(appId, req.user.sub);
  }

  /** POST /apps/:appId/versions/complete — paso 3: el API comprueba el objeto y crea la version. */
  @Post("apps/:appId/versions/complete")
  @UseGuards(JwtAuthGuard)
  completeUpload(
    @Param("appId") appId: string,
    @Body() dto: CompleteUploadDto,
    @Request() req: AuthRequest
  ) {
    return this.versionsService.completeUpload(appId, req.user.sub, dto);
  }

  /**
   * POST /apps/:appId/versions — authenticated developer uploads new APK
   * multipart/form-data: file (APK) + JSON fields (CreateVersionDto)
   */
  @Post("apps/:appId/versions")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor("file", {
      storage: memoryStorage(), // Buffer stays in memory; max 500 MB validated in service
      limits: { fileSize: 500 * 1024 * 1024 },
    })
  )
  uploadApk(
    @Param("appId") appId: string,
    @Body() dto: CreateVersionDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req: AuthRequest
  ) {
    return this.versionsService.uploadApk(appId, req.user.sub, dto, file);
  }
}
