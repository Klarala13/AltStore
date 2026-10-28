import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import { JwtService } from "@nestjs/jwt";
import { Queue } from "bull";
import * as crypto from "crypto";
import { PrismaService } from "../prisma/prisma.service";
import { StorageProvider, STORAGE_PROVIDER } from "../storage/storage.provider";
import { CompleteUploadDto, CreateVersionDto } from "./versions.dto";
import { SCAN_QUEUE, ScanJobData } from "../security/security.constants";
import { NotificationsService } from "../notifications/notifications.service";

/** APK files start with PK (ZIP) magic bytes: 0x50 0x4B 0x03 0x04 */
const APK_MAGIC = Buffer.from([0x50, 0x4b, 0x03, 0x04]);
const MAX_APK_SIZE_BYTES = 500 * 1024 * 1024; // 500 MB

const APK_CONTENT_TYPE = "application/vnd.android.package-archive";

/** Marca el JWT como valido solo para cerrar una subida, nunca para el API en general. */
const UPLOAD_PURPOSE = "apk-upload";

/** Margen para subir el binario. Generoso: 500 MB por una linea domestica tarda. */
const UPLOAD_REF_TTL = "2h";

/** Lo que firma el paso 1 y devuelve el navegador en el paso 3. */
interface UploadRefPayload {
  appId: string;
  fileKey: string;
  purpose: string;
}

@Injectable()
export class VersionsService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(STORAGE_PROVIDER) private readonly storage: StorageProvider,
    @InjectQueue(SCAN_QUEUE) private readonly scanQueue: Queue<ScanJobData>,
    private readonly jwt: JwtService,
    private readonly notifications: NotificationsService
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
  /**
   * Paso 1 de la subida directa: una URL firmada para que el navegador escriba
   * en R2 por su cuenta.
   *
   * El fichero no puede pasar por el servidor. La funcion de Vercel que hacia
   * de puente corta el cuerpo a 4,5 MB y devuelve FUNCTION_PAYLOAD_TOO_LARGE, y
   * no hay APK real que quepa ahi: Snake pesa 18 MB y TicTacToe 61 MB. Durante
   * meses solo "funciono" con un zip falso de 692 bytes.
   *
   * La clave se devuelve dentro de un JWT, no suelta. Si el cliente pudiera
   * elegirla, podria cerrar la subida de otra persona contra su propia app.
   */
  async createUploadUrl(appId: string, developerId: string) {
    const app = await this.assertOwnership(appId, developerId);

    const fileKey = `uploads/pending/${crypto.randomUUID()}.apk`;
    const uploadUrl = await this.storage.getSignedUploadUrl(fileKey, 3600, APK_CONTENT_TYPE);

    const uploadRef = await this.jwt.signAsync(
      { appId: app.id, fileKey, purpose: UPLOAD_PURPOSE } satisfies UploadRefPayload,
      { expiresIn: UPLOAD_REF_TTL }
    );

    // contentType se devuelve porque la firma lo incluye: si el navegador manda
    // otro encabezado, R2 rechaza el PUT y el error no se parece a su causa.
    return { uploadUrl, uploadRef, contentType: APK_CONTENT_TYPE };
  }

  /**
   * Paso 3: el navegador dice que ya subio, y el API lo comprueba.
   *
   * Nada de lo que afirme el cliente sobre el fichero se da por bueno. El API no
   * lo ha visto pasar, asi que mira el objeto en R2: que exista, cuanto pesa y
   * con que bytes empieza. Y calcula el sha256 el mismo.
   */
  async completeUpload(appId: string, developerId: string, dto: CompleteUploadDto) {
    const app = await this.assertOwnership(appId, developerId);
    const fileKey = await this.resolveUploadRef(dto.uploadRef, app.id);

    const object = await this.storage.head(fileKey);
    if (!object) {
      throw new BadRequestException(
        "No file was uploaded. Upload the APK to the signed URL before completing."
      );
    }
    if (object.size === 0) {
      throw new BadRequestException("The uploaded file is empty.");
    }
    if (object.size > MAX_APK_SIZE_BYTES) {
      throw new BadRequestException(
        `APK exceeds the ${MAX_APK_SIZE_BYTES / (1024 * 1024)} MB limit.`
      );
    }

    const prefix = await this.storage.readPrefix(fileKey, APK_MAGIC.length);
    if (!prefix.equals(APK_MAGIC)) {
      // Nota: esto demuestra "es un zip", no "es un APK". Un IPA pasaria igual,
      // porque tambien es un zip. Distinguirlos pide mirar dentro.
      await this.storage.delete(fileKey).catch(() => undefined);
      throw new BadRequestException("File is not a valid APK (invalid magic bytes)");
    }

    const sha256 = await this.storage.sha256(fileKey);

    const version = await this.prisma.version.create({
      data: {
        appId,
        versionName: dto.versionName,
        versionCode: dto.versionCode,
        platform: dto.platform,
        fileKey,
        fileSize: BigInt(object.size),
        fileSha256: sha256,
        changelog: dto.changelog,
        minOs: dto.minOs,
        status: "SCANNING",
      },
    });

    await this.scanQueue.add(
      { versionId: version.id, fileKey, appBundleId: app.bundleId },
      { attempts: 3, backoff: { type: "exponential", delay: 5000 } }
    );

    this.announce(app, version.versionName, object.size);

    return { ...version, fileSize: version.fileSize.toString() };
  }

  private async assertOwnership(appId: string, developerId: string) {
    const app = await this.prisma.app.findUnique({
      where: { id: appId },
      // name/slug/category salen de aqui para el aviso de app nueva.
      select: {
        id: true,
        developerId: true,
        bundleId: true,
        name: true,
        slug: true,
        category: true,
      },
    });
    if (!app) throw new NotFoundException(`App ${appId} not found`);
    if (app.developerId !== developerId) throw new ForbiddenException();
    return app;
  }

  private async resolveUploadRef(uploadRef: string, appId: string): Promise<string> {
    let payload: UploadRefPayload;
    try {
      payload = await this.jwt.verifyAsync<UploadRefPayload>(uploadRef);
    } catch {
      throw new BadRequestException("Upload link expired. Start the upload again.");
    }

    if (payload.purpose !== UPLOAD_PURPOSE || payload.appId !== appId) {
      throw new ForbiddenException("This upload does not belong to that app");
    }
    return payload.fileKey;
  }

  async uploadApk(
    appId: string,
    developerId: string,
    dto: CreateVersionDto,
    file: Express.Multer.File
  ) {
    const app = await this.assertOwnership(appId, developerId);

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

    this.announce(app, version.versionName, file.size);

    return {
      ...version,
      fileSize: version.fileSize.toString(),
    };
  }

  /**
   * Avisa por correo de que hay algo que revisar. Se llama desde los dos
   * caminos de subida, que es el momento en que la app pasa a ser revisable:
   * antes del APK no hay nada que mirar.
   *
   * Sin `await` a proposito. El aviso no debe retrasar la respuesta al que
   * sube, y el servicio ya se traga sus propios errores; el `catch` de aqui
   * solo cubre que alguien le quite esa garantia mas adelante.
   */
  private announce(
    app: { name: string; slug: string; bundleId: string; category: string },
    versionName: string,
    fileSizeBytes: number
  ): void {
    void this.notifications
      .notifyNewSubmission({
        appName: app.name,
        slug: app.slug,
        bundleId: app.bundleId,
        category: app.category,
        versionName,
        fileSizeBytes,
      })
      .catch(() => undefined);
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
