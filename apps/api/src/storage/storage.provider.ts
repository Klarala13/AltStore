import { Injectable, ServiceUnavailableException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  DeleteObjectCommand,
  CopyObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createHash } from "crypto";

/** Lo que se sabe de un objeto sin descargarlo entero. */
export interface StoredObject {
  size: number;
  contentType?: string;
}

export interface StorageProvider {
  upload(key: string, buffer: Buffer, contentType: string): Promise<void>;
  getSignedUrl(key: string, ttlSeconds: number): Promise<string>;
  delete(key: string): Promise<void>;
  move(sourceKey: string, destinationKey: string): Promise<void>;

  /**
   * URL firmada para que el NAVEGADOR escriba directamente en el almacen.
   *
   * Existe porque el APK no puede viajar por el servidor: la funcion de Vercel
   * que hacia de puente corta el cuerpo a 4,5 MB (FUNCTION_PAYLOAD_TOO_LARGE), y
   * ningun APK real cabe ahi. Mandando los bytes directos al almacen, ni Vercel
   * ni Railway los ven pasar — lo que de paso quita el pico de memoria de
   * bufferear el fichero entero en el API.
   */
  getSignedUploadUrl(key: string, ttlSeconds: number, contentType: string): Promise<string>;

  /** Metadatos del objeto, o null si no existe. Para comprobar lo que subio el navegador. */
  head(key: string): Promise<StoredObject | null>;

  /** Primeros bytes del objeto, para validar magic bytes sin descargarlo entero. */
  readPrefix(key: string, bytes: number): Promise<Buffer>;

  /**
   * SHA-256 del objeto, leyendolo en streaming.
   *
   * `Version.fileSha256` no admite nulo y el API ya no ve pasar el fichero, asi
   * que tiene que calcularlo desde el almacen. Se hace por trozos y no cargando
   * el objeto entero: un APK de 500 MB en memoria es justo el pico que esta
   * subida directa venia a quitar.
   */
  sha256(key: string): Promise<string>;
}

export const STORAGE_PROVIDER = "STORAGE_PROVIDER";

@Injectable()
export class SupabaseStorageProvider implements StorageProvider {
  private readonly supabaseUrl?: string;
  private readonly serviceRoleKey?: string;
  private readonly bucket: string;
  private readonly frontendUrl: string;

  constructor(private readonly config: ConfigService) {
    this.supabaseUrl = this.config.get<string>("SUPABASE_URL");
    this.serviceRoleKey = this.config.get<string>("SUPABASE_SERVICE_ROLE_KEY");
    this.bucket = this.config.get<string>("SUPABASE_STORAGE_BUCKET") ?? "apks";
    this.frontendUrl = this.config.get<string>("FRONTEND_URL") ?? "http://localhost:3000";
  }

  private getConfiguredClient(): { baseUrl: string; key: string; bucket: string } {
    if (!this.supabaseUrl || !this.serviceRoleKey || !this.bucket) {
      throw new ServiceUnavailableException(
        "Supabase Storage is not configured. Set SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY and SUPABASE_STORAGE_BUCKET (optional) to enable file storage."
      );
    }

    return {
      baseUrl: `${this.supabaseUrl}/storage/v1`,
      key: this.serviceRoleKey,
      bucket: this.bucket,
    };
  }

  private async request(
    path: string,
    init: RequestInit & { key: string; baseUrl: string }
  ): Promise<Response> {
    const { key, baseUrl, ...requestInit } = init;

    return fetch(`${baseUrl}${path}`, {
      ...requestInit,
      headers: {
        Authorization: `Bearer ${key}`,
        apikey: key,
        ...(requestInit.headers ?? {}),
      },
    });
  }

  async upload(key: string, buffer: Buffer, contentType: string): Promise<void> {
    const { baseUrl, key: serviceRoleKey, bucket } = this.getConfiguredClient();

    const response = await this.request(`/object/${bucket}/${key}`, {
      method: "POST",
      body: buffer,
      key: serviceRoleKey,
      baseUrl,
      headers: {
        "Content-Type": contentType,
        "x-upsert": "true",
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new ServiceUnavailableException(`Supabase upload failed: ${error}`);
    }
  }

  async getSignedUrl(key: string, ttlSeconds: number): Promise<string> {
    if (key.startsWith("/")) {
      return `${this.frontendUrl}${key}`;
    }

    const { baseUrl, key: serviceRoleKey, bucket } = this.getConfiguredClient();

    const response = await this.request(`/object/sign/${bucket}/${key}`, {
      method: "POST",
      key: serviceRoleKey,
      baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ expiresIn: ttlSeconds }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new ServiceUnavailableException(`Supabase signed URL failed: ${error}`);
    }

    const payload = (await response.json()) as { signedURL?: string; signedUrl?: string };
    const signedPath = payload.signedURL ?? payload.signedUrl;

    if (!signedPath) {
      throw new ServiceUnavailableException("Supabase signed URL response is missing signed URL.");
    }

    if (signedPath.startsWith("http://") || signedPath.startsWith("https://")) {
      return signedPath;
    }

    return `${baseUrl}${signedPath}`;
  }

  async delete(key: string): Promise<void> {
    const { baseUrl, key: serviceRoleKey, bucket } = this.getConfiguredClient();

    const response = await this.request(`/object/${bucket}/${key}`, {
      method: "DELETE",
      key: serviceRoleKey,
      baseUrl,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new ServiceUnavailableException(`Supabase delete failed: ${error}`);
    }
  }

  async move(sourceKey: string, destinationKey: string): Promise<void> {
    const { baseUrl, key: serviceRoleKey, bucket } = this.getConfiguredClient();

    const response = await this.request("/object/move", {
      method: "POST",
      key: serviceRoleKey,
      baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bucketId: bucket,
        sourceKey,
        destinationKey,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new ServiceUnavailableException(`Supabase move failed: ${error}`);
    }
  }

  // Produccion corre con STORAGE_DRIVER=r2, asi que la subida directa se
  // implemento solo ahi. Fallar con un mensaje que diga exactamente que pasa es
  // mejor que devolver una URL que no funcione: este proyecto ya ha perdido
  // demasiado tiempo con errores que no se parecian a su causa.
  getSignedUploadUrl(): Promise<string> {
    throw new ServiceUnavailableException(
      "Direct browser upload is only implemented for the R2 driver. Set STORAGE_DRIVER=r2."
    );
  }

  head(): Promise<StoredObject | null> {
    throw new ServiceUnavailableException(
      "Object inspection is only implemented for the R2 driver. Set STORAGE_DRIVER=r2."
    );
  }

  readPrefix(): Promise<Buffer> {
    throw new ServiceUnavailableException(
      "Object inspection is only implemented for the R2 driver. Set STORAGE_DRIVER=r2."
    );
  }

  sha256(): Promise<string> {
    throw new ServiceUnavailableException(
      "Object inspection is only implemented for the R2 driver. Set STORAGE_DRIVER=r2."
    );
  }
}

@Injectable()
export class R2StorageProvider implements StorageProvider {
  private readonly client?: S3Client;
  private readonly bucket?: string;
  private readonly frontendUrl: string;

  constructor(private readonly config: ConfigService) {
    this.frontendUrl = this.config.get<string>("FRONTEND_URL") ?? "http://localhost:3000";

    const accountId = this.config.get<string>("CF_ACCOUNT_ID");
    const accessKeyId = this.config.get<string>("R2_ACCESS_KEY");
    const secretAccessKey = this.config.get<string>("R2_SECRET_KEY");
    const bucket = this.config.get<string>("R2_BUCKET");

    if (accountId && accessKeyId && secretAccessKey && bucket) {
      this.client = new S3Client({
        region: "auto",
        endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
      });
      this.bucket = bucket;
    }
  }

  private getConfiguredClient(): { client: S3Client; bucket: string } {
    if (!this.client || !this.bucket) {
      throw new ServiceUnavailableException(
        "Cloudflare R2 is not configured. Set CF_ACCOUNT_ID, R2_ACCESS_KEY, R2_SECRET_KEY and R2_BUCKET to enable file storage."
      );
    }

    return { client: this.client, bucket: this.bucket };
  }

  async upload(key: string, buffer: Buffer, contentType: string): Promise<void> {
    const { client, bucket } = this.getConfiguredClient();

    await client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: buffer,
        ContentType: contentType,
      })
    );
  }

  async getSignedUrl(key: string, ttlSeconds: number): Promise<string> {
    if (key.startsWith("/")) {
      return `${this.frontendUrl}${key}`;
    }

    const { client, bucket } = this.getConfiguredClient();

    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    return getSignedUrl(client, command, { expiresIn: ttlSeconds });
  }

  async delete(key: string): Promise<void> {
    const { client, bucket } = this.getConfiguredClient();
    await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
  }

  /**
   * Move an object within R2 (copy + delete). R2/S3 has no native move.
   */
  async move(sourceKey: string, destinationKey: string): Promise<void> {
    const { client, bucket } = this.getConfiguredClient();

    await client.send(
      new CopyObjectCommand({
        Bucket: bucket,
        CopySource: `${bucket}/${sourceKey}`,
        Key: destinationKey,
      })
    );
    await this.delete(sourceKey);
  }

  async getSignedUploadUrl(key: string, ttlSeconds: number, contentType: string): Promise<string> {
    const { client, bucket } = this.getConfiguredClient();

    // ContentType va firmado: el navegador tiene que mandar exactamente este
    // encabezado o R2 rechaza la subida. Evita que una URL firmada para un APK
    // sirva para colar otra cosa.
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: contentType,
    });

    return getSignedUrl(client, command, { expiresIn: ttlSeconds });
  }

  async head(key: string): Promise<StoredObject | null> {
    const { client, bucket } = this.getConfiguredClient();

    try {
      const res = await client.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
      return {
        size: Number(res.ContentLength ?? 0),
        contentType: res.ContentType,
      };
    } catch (error) {
      if (isNotFound(error)) return null;
      throw error;
    }
  }

  async readPrefix(key: string, bytes: number): Promise<Buffer> {
    const { client, bucket } = this.getConfiguredClient();

    // Range pide solo la cabecera del fichero. Validar los magic bytes no puede
    // costar descargar 60 MB.
    const res = await client.send(
      new GetObjectCommand({
        Bucket: bucket,
        Key: key,
        Range: `bytes=0-${bytes - 1}`,
      })
    );

    const body = res.Body as { transformToByteArray?: () => Promise<Uint8Array> } | undefined;
    if (!body?.transformToByteArray) return Buffer.alloc(0);

    return Buffer.from(await body.transformToByteArray());
  }

  async sha256(key: string): Promise<string> {
    const { client, bucket } = this.getConfiguredClient();

    const res = await client.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
    const body = res.Body as AsyncIterable<Uint8Array> | undefined;
    if (!body) {
      throw new ServiceUnavailableException(`Could not read ${key} back from storage`);
    }

    const hash = createHash("sha256");
    for await (const chunk of body) {
      hash.update(chunk);
    }
    return hash.digest("hex");
  }
}

/** R2 responde 404/NotFound/NoSuchKey segun la operacion; se cubren los tres. */
function isNotFound(error: unknown): boolean {
  if (typeof error !== "object" || error === null) return false;
  const name = (error as { name?: unknown }).name;
  const status = (error as { $metadata?: { httpStatusCode?: number } }).$metadata?.httpStatusCode;
  return name === "NotFound" || name === "NoSuchKey" || status === 404;
}
