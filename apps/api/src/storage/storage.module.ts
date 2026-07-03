import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { R2StorageProvider, STORAGE_PROVIDER, SupabaseStorageProvider } from "./storage.provider";

@Module({
  providers: [
    R2StorageProvider,
    SupabaseStorageProvider,
    {
      provide: STORAGE_PROVIDER,
      useFactory: (
        config: ConfigService,
        r2Provider: R2StorageProvider,
        supabaseProvider: SupabaseStorageProvider
      ) => {
        const driver = config.get<string>("STORAGE_DRIVER", "supabase").toLowerCase();
        return driver === "r2" ? r2Provider : supabaseProvider;
      },
      inject: [ConfigService, R2StorageProvider, SupabaseStorageProvider],
    },
  ],
  exports: [STORAGE_PROVIDER],
})
export class StorageModule {}
