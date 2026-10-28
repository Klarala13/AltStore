import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bull";
import { VersionsService } from "./versions.service";
import { VersionsController } from "./versions.controller";
import { StorageModule } from "../storage/storage.module";
import { AuthModule } from "../auth/auth.module";
import { NotificationsModule } from "../notifications/notifications.module";
import { SCAN_QUEUE } from "../security/security.constants";

@Module({
  // AuthModule exporta JwtModule: VersionsService firma el `uploadRef` que
  // enlaza el paso de la URL firmada con el de confirmacion.
  imports: [
    StorageModule,
    AuthModule,
    NotificationsModule,
    BullModule.registerQueue({ name: SCAN_QUEUE }),
  ],
  controllers: [VersionsController],
  providers: [VersionsService],
  exports: [VersionsService],
})
export class VersionsModule {}
