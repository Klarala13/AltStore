import { IsEnum, IsInt, IsOptional, IsPositive, IsString, MaxLength, Min } from "class-validator";
import { Type } from "class-transformer";
import { Platform } from "@appia/db";

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

/**
 * Confirmacion de una subida directa a R2.
 *
 * `uploadRef` es el JWT que devolvio el paso de la URL firmada, y lleva dentro
 * la clave del objeto. No se acepta la clave suelta a proposito: si el cliente
 * pudiera nombrarla, podria confirmar la subida de otro y colgar su binario de
 * su propia app.
 */
export class CompleteUploadDto extends CreateVersionDto {
  @IsString()
  uploadRef!: string;
}
