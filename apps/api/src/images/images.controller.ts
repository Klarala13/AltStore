import { Body, Controller, Get, Param, Post, Request, UseGuards } from "@nestjs/common";
import { ImagesService } from "./images.service";
import { CompleteImageUploadDto, CreateImageUploadUrlDto } from "./images.dto";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { InternalKeyGuard } from "../common/guards/internal-key.guard";
import { JwtPayload } from "../auth/jwt.strategy";

interface AuthRequest extends Request {
  user: JwtPayload;
}

@Controller()
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  /** POST /apps/:appId/images/upload-url — paso 1: URL firmada para escribir en el almacen. */
  @Post("apps/:appId/images/upload-url")
  @UseGuards(JwtAuthGuard)
  createUploadUrl(
    @Param("appId") appId: string,
    @Body() dto: CreateImageUploadUrlDto,
    @Request() req: AuthRequest
  ) {
    return this.imagesService.createUploadUrl(appId, req.user.sub, dto);
  }

  /** POST /apps/:appId/images/complete — paso 3: el API valida el objeto y lo guarda en la ficha. */
  @Post("apps/:appId/images/complete")
  @UseGuards(JwtAuthGuard)
  completeUpload(
    @Param("appId") appId: string,
    @Body() dto: CompleteImageUploadDto,
    @Request() req: AuthRequest
  ) {
    return this.imagesService.completeUpload(appId, req.user.sub, dto);
  }

  /**
   * GET /images/:appId/:file — URL firmada para el proxy del front.
   *
   * La pide el servidor de Next, nunca el navegador: por eso lleva
   * InternalKeyGuard. El navegador habla con /api/images del front, que cachea
   * y devuelve los bytes.
   */
  @Get("images/:appId/:file")
  @UseGuards(InternalKeyGuard)
  resolve(@Param("appId") appId: string, @Param("file") file: string) {
    return this.imagesService.resolveSignedUrl(`${appId}/${file}`);
  }
}
