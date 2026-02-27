import { IsOptional, IsString } from "class-validator";

export class RequestDownloadDto {
  @IsString()
  versionId!: string;

  @IsString()
  @IsOptional()
  userId?: string;
}
