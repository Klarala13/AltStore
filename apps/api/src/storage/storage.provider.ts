import { Injectable, ServiceUnavailableException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  CopyObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export interface StorageProvider {
  upload(key: string, buffer: Buffer, contentType: string): Promise<void>;
  getSignedUrl(key: string, ttlSeconds: number): Promise<string>;
  delete(key: string): Promise<void>;
  move(sourceKey: string, destinationKey: string): Promise<void>;
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
}
