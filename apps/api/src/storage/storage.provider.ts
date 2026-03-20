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
export class R2StorageProvider implements StorageProvider {
  private readonly client?: S3Client;
  private readonly bucket?: string;

  constructor(private readonly config: ConfigService) {
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
