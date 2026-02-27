import { IsEmail, IsEnum, IsOptional, IsString, Length } from "class-validator";
import { DeveloperType } from "@altstore/db";

export class UpdateDeveloperDto {
  @IsString()
  @Length(2, 100)
  @IsOptional()
  name?: string;

  @IsEnum(DeveloperType)
  @IsOptional()
  type?: DeveloperType;

  @IsString()
  @Length(2, 2)
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  vatNumber?: string;
}
