import { IsEnum, IsOptional } from "class-validator";
import { AppStatus } from "@altstore/db";

export class UpdateAppStatusDto {
  @IsEnum(AppStatus)
  status!: AppStatus;
}
