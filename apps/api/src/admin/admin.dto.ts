import { IsEnum, IsOptional } from "class-validator";
import { AppStatus } from "@appia/db";

export class UpdateAppStatusDto {
  @IsEnum(AppStatus)
  status!: AppStatus;
}
