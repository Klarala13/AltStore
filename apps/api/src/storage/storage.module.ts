import { Module } from "@nestjs/common";
import { R2StorageProvider, STORAGE_PROVIDER } from "./storage.provider";

@Module({
  providers: [
    {
      provide: STORAGE_PROVIDER,
      useClass: R2StorageProvider,
    },
  ],
  exports: [STORAGE_PROVIDER],
})
export class StorageModule {}
