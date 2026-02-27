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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),

    // Redis queue (BullMQ) — used by VersionsModule (enqueue) and SecurityModule (process)
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        redis: {
          host: config.get<string>("REDIS_HOST", "localhost"),
          port: config.get<number>("REDIS_PORT", 6379),
          password: config.get<string>("REDIS_PASSWORD"),
          tls: config.get<string>("REDIS_TLS") === "true" ? {} : undefined,
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
  ],
})
export class AppModule {}
