import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as crypto from "crypto";
import { PrismaService } from "../prisma/prisma.service";
import { StorageProvider, STORAGE_PROVIDER } from "../storage/storage.provider";
import { CompleteImageUploadDto, CreateImageUploadUrlDto } from "./images.dto";
import {
  ALLOWED_IMAGE_TYPES,
  IMAGE_KEY_PREFIX,
  IMAGE_PUBLIC_PREFIX,
  ImageKind,
  MAGIC_PREFIX_BYTES,
  MAX_SCREENSHOTS,
  PUBLIC_IMAGE_PATH,
  maxBytesFor,
} from "./images.constants";

/** Marca el JWT como valido solo para cerrar una subida de imagen. */
const UPLOAD_PURPOSE = "image-upload";
const UPLOAD_REF_TTL = "1h";

/** Las imagenes son pequenas: una hora para escribirlas sobra. */
const PUT_URL_TTL_SECONDS = 3600;

/** La URL firmada de lectura solo la usa el proxy del front, que lee al momento. */
const GET_URL_TTL_SECONDS = 300;

interface ImageRefPayload {
  appId: string;
  fileKey: string;
  kind: ImageKind;
  contentType: string;
  purpose: string;
}

@Injectable()
export class ImagesService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(STORAGE_PROVIDER) private readonly storage: StorageProvider,
    private readonly jwt: JwtService
  ) {}

  /**
   * Paso 1: URL firmada para que el navegador escriba la imagen en el almacen.
   *
   * Mismo camino que el APK y por el mismo motivo: el cuerpo de una funcion de
   * Vercel se corta a 4,5 MB. Una captura de movil no llega, pero cuatro en el
   * mismo envio si, y sobre todo no tiene sentido hacer pasar los bytes por dos
   * servidores cuando pueden ir directos.
   *
   * La clave viaja dentro del JWT, no suelta: si fuera un campo del formulario,
   * cualquiera podria confirmar una clave que no es suya.
   */
  async createUploadUrl(appId: string, developerId: string, dto: CreateImageUploadUrlDto) {
    const app = await this.assertOwnership(appId, developerId);

    if (dto.kind === "screenshot" && app.screenshots.length >= MAX_SCREENSHOTS) {
      throw new BadRequestException(`An app can have at most ${MAX_SCREENSHOTS} screenshots.`);
    }

    const { ext } = ALLOWED_IMAGE_TYPES[dto.contentType];
    const fileKey = `${IMAGE_KEY_PREFIX}/${app.id}/${crypto.randomUUID()}.${ext}`;
    const uploadUrl = await this.storage.getSignedUploadUrl(
      fileKey,
      PUT_URL_TTL_SECONDS,
      dto.contentType
    );

    const uploadRef = await this.jwt.signAsync(
      {
        appId: app.id,
        fileKey,
        kind: dto.kind,
        contentType: dto.contentType,
        purpose: UPLOAD_PURPOSE,
      } satisfies ImageRefPayload,
      { expiresIn: UPLOAD_REF_TTL }
    );

    // contentType vuelve porque la firma lo incluye: si el navegador manda otro
    // encabezado, R2 rechaza el PUT y el error no se parece a su causa.
    return { uploadUrl, uploadRef, contentType: dto.contentType };
  }

  /**
   * Paso 3: el API mira el objeto por su cuenta y, si cuadra, lo guarda en la
   * ficha. No se fia de nada de lo que diga el cliente sobre un fichero que no
   * ha visto pasar.
   */
  async completeUpload(appId: string, developerId: string, dto: CompleteImageUploadDto) {
    const app = await this.assertOwnership(appId, developerId);
    const ref = await this.resolveUploadRef(dto.uploadRef, app.id);

    const object = await this.storage.head(ref.fileKey);
    if (!object) {
      throw new BadRequestException("No image was uploaded to the signed URL.");
    }
    if (object.size === 0) {
      throw new BadRequestException("The uploaded image is empty.");
    }

    const limit = maxBytesFor(ref.kind);
    if (object.size > limit) {
      await this.discard(ref.fileKey);
      throw new BadRequestException(
        `The ${ref.kind} exceeds the ${Math.round(limit / (1024 * 1024))} MB limit.`
      );
    }

    const prefix = await this.storage.readPrefix(ref.fileKey, MAGIC_PREFIX_BYTES);
    if (!ALLOWED_IMAGE_TYPES[ref.contentType].matches(prefix)) {
      // Se borra: un objeto que no es lo que dice ser no se queda en el bucket.
      await this.discard(ref.fileKey);
      throw new BadRequestException(
        "That file is not a valid PNG, JPEG or WebP image. Only real images are accepted."
      );
    }

    const url = `${IMAGE_PUBLIC_PREFIX}/${ref.fileKey.slice(IMAGE_KEY_PREFIX.length + 1)}`;

    if (ref.kind === "icon") {
      // El icono anterior deja de estar referenciado: si era nuestro, se borra.
      await this.discardIfManaged(app.iconUrl);
      await this.prisma.app.update({ where: { id: app.id }, data: { iconUrl: url } });
      return { kind: ref.kind, url };
    }

    if (app.screenshots.length >= MAX_SCREENSHOTS) {
      await this.discard(ref.fileKey);
      throw new BadRequestException(`An app can have at most ${MAX_SCREENSHOTS} screenshots.`);
    }

    await this.prisma.app.update({
      where: { id: app.id },
      data: { screenshots: { push: url } },
    });
    return { kind: ref.kind, url };
  }

  /**
   * URL firmada de lectura para el proxy del front.
   *
   * Solo acepta `<appId>/<uuid>.<ext>`. Sin esa comprobacion, esta ruta seria
   * una forma de pedir cualquier clave del bucket, incluidos los APK que estan
   * en cuarentena esperando el escaneo.
   */
  async resolveSignedUrl(path: string): Promise<{ url: string }> {
    if (!PUBLIC_IMAGE_PATH.test(path)) {
      throw new NotFoundException("Image not found");
    }

    const key = `${IMAGE_KEY_PREFIX}/${path}`;
    const object = await this.storage.head(key);
    if (!object) throw new NotFoundException("Image not found");

    return { url: await this.storage.getSignedUrl(key, GET_URL_TTL_SECONDS) };
  }

  private async assertOwnership(appId: string, developerId: string) {
    const app = await this.prisma.app.findUnique({
      where: { id: appId },
      select: { id: true, developerId: true, iconUrl: true, screenshots: true },
    });
    if (!app) throw new NotFoundException(`App ${appId} not found`);
    if (app.developerId !== developerId) throw new ForbiddenException();
    return app;
  }

  private async resolveUploadRef(uploadRef: string, appId: string): Promise<ImageRefPayload> {
    let payload: ImageRefPayload;
    try {
      payload = await this.jwt.verifyAsync<ImageRefPayload>(uploadRef);
    } catch {
      throw new BadRequestException("Upload link expired. Pick the image again.");
    }

    if (payload.purpose !== UPLOAD_PURPOSE || payload.appId !== appId) {
      throw new ForbiddenException("This upload does not belong to that app");
    }
    if (!ALLOWED_IMAGE_TYPES[payload.contentType]) {
      throw new BadRequestException("Unsupported image type.");
    }
    return payload;
  }

  /** Borrar es limpieza, no parte del resultado: si falla, no se tumba la peticion. */
  private async discard(key: string): Promise<void> {
    await this.storage.delete(key).catch(() => undefined);
  }

  /** Solo borra lo que subimos nosotros: nunca "/icon.svg" ni una URL externa. */
  private async discardIfManaged(url: string | null): Promise<void> {
    if (!url?.startsWith(`${IMAGE_PUBLIC_PREFIX}/`)) return;
    const path = url.slice(IMAGE_PUBLIC_PREFIX.length + 1);
    if (!PUBLIC_IMAGE_PATH.test(path)) return;
    await this.discard(`${IMAGE_KEY_PREFIX}/${path}`);
  }
}
