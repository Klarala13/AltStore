import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    // Phase 1: modules will be added here as they are built
    // AppsModule, DevelopersModule, VersionsModule, DownloadsModule, AuthModule
  ],
})
export class AppModule {}
