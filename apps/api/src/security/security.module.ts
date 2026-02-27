import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bull";
import { ScanProcessor } from "./scan.processor";
import { VirusTotalService } from "./virustotal.service";
import { StorageModule } from "../storage/storage.module";
import { SCAN_QUEUE } from "./security.constants";

@Module({
  imports: [StorageModule, BullModule.registerQueue({ name: SCAN_QUEUE })],
  providers: [VirusTotalService, ScanProcessor],
  exports: [VirusTotalService],
})
export class SecurityModule {}
