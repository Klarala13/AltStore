import { IsBoolean, IsEnum, IsOptional } from "class-validator";
import { AppStatus } from "@appia/db";

export class UpdateAppStatusDto {
  @IsEnum(AppStatus)
  status!: AppStatus;
}

export class RescanVersionsDto {
  @IsOptional()
  @IsBoolean()
  all?: boolean;
}
