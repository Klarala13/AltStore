import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bull";
import { VersionsService } from "./versions.service";
import { VersionsController } from "./versions.controller";
import { StorageModule } from "../storage/storage.module";
import { SCAN_QUEUE } from "../security/security.constants";

@Module({
  imports: [StorageModule, BullModule.registerQueue({ name: SCAN_QUEUE })],
  controllers: [VersionsController],
  providers: [VersionsService],
})
export class VersionsModule {}
