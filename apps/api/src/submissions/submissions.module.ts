import { Module } from "@nestjs/common";
import { SubmissionsService } from "./submissions.service";
import { SubmissionsController } from "./submissions.controller";
import { AppsModule } from "../apps/apps.module";
import { AuthModule } from "../auth/auth.module";
import { VersionsModule } from "../versions/versions.module";

@Module({
  imports: [AppsModule, AuthModule, VersionsModule],
  controllers: [SubmissionsController],
  providers: [SubmissionsService],
})
export class SubmissionsModule {}
