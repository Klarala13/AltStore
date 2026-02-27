import { IsEnum, IsInt, IsOptional, IsPositive, IsString, MaxLength, Min } from "class-validator";
import { Type } from "class-transformer";
import { Platform } from "@altstore/db";

export class CreateVersionDto {
  @IsString()
  versionName!: string; // "1.2.0"

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  versionCode!: number; // 120

  @IsEnum(Platform)
  platform!: Platform;

  @IsString()
  changelog!: string;

  @IsString()
  minOs!: string; // "8.0"
}

export class VersionQueryDto {
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  limit?: number = 20;
}
