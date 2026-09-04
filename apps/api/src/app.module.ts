import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { BullModule } from "@nestjs/bull";
import { PrismaModule } from "./prisma/prisma.module";
import { StorageModule } from "./storage/storage.module";
import { AuthModule } from "./auth/auth.module";
import { DevelopersModule } from "./developers/developers.module";
import { AppsModule } from "./apps/apps.module";
import { VersionsModule } from "./versions/versions.module";
import { SecurityModule } from "./security/security.module";
import { DownloadsModule } from "./downloads/downloads.module";
import { AdminModule } from "./admin/admin.module";
import { RatingsModule } from "./ratings/ratings.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env.local", ".env", "apps/api/.env.local", "apps/api/.env"],
    }),

    // Redis queue (Bull) — used by VersionsModule (enqueue) and SecurityModule (process)
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        redis: {
          host: config.get<string>("REDIS_HOST", "localhost"),
          port: config.get<number>("REDIS_PORT", 6379),
          password: config.get<string>("REDIS_PASSWORD"),
          tls: config.get<string>("REDIS_TLS") === "true" ? {} : undefined,

          // Without this, an unreachable Redis makes POST /apps/:id/versions hang
          // forever: ioredis buffers the command and retries the connection
          // without ever giving up, so the upload sits at 100% and never
          // resolves. Bounding it turns that into a real 500.
          //
          // Only the plain client is bounded. Bull's own createClient forces
          // maxRetriesPerRequest: null on bclient/subscriber, so the worker
          // keeps its default retry strategy and survives a Redis blip.
          maxRetriesPerRequest: config.get<number>("REDIS_MAX_RETRIES_PER_REQUEST", 3),
          connectTimeout: config.get<number>("REDIS_CONNECT_TIMEOUT_MS", 10000),

          // ioredis resolves IPv4 only by default. Railway's private network is
          // IPv6-only, so redis.railway.internal would never connect. 0 asks
          // for both records, which also keeps IPv4 hosts (Upstash, local)
          // working.
          family: config.get<number>("REDIS_FAMILY", 0),
        },
      }),
      inject: [ConfigService],
    }),

    PrismaModule, // Global — provides PrismaService everywhere
    StorageModule, // R2 storage provider
    AuthModule, // JWT auth + developer registration/login
    DevelopersModule,
    AppsModule,
    VersionsModule, // APK upload + version history
    SecurityModule, // VirusTotal scan queue processor
    DownloadsModule, // Presigned URL + QR code + download log
    AdminModule, // Admin moderation panel
    RatingsModule, // Consumer ratings + avgRating recompute
  ],
})
export class AppModule {}
