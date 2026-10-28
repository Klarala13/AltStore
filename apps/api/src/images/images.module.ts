import { Module } from "@nestjs/common";
import { ImagesService } from "./images.service";
import { ImagesController } from "./images.controller";
import { StorageModule } from "../storage/storage.module";
import { AuthModule } from "../auth/auth.module";

@Module({
  // AuthModule exporta JwtModule: ImagesService firma el `uploadRef` que enlaza
  // el paso de la URL firmada con el de confirmacion.
  imports: [StorageModule, AuthModule],
  controllers: [ImagesController],
  providers: [ImagesService],
  exports: [ImagesService],
})
export class ImagesModule {}
