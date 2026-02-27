import { IsArray, IsEnum, IsOptional, IsString, IsUrl, Length, MaxLength } from "class-validator";
import { Category, Platform } from "@altstore/db";

export class CreateAppDto {
  @IsString()
  @Length(2, 100)
  name!: string;

  @IsString()
  slug!: string; // URL-friendly identifier

  @IsString()
  bundleId!: string; // com.example.myapp

  @IsEnum(Category)
  category!: Category;

  @IsString()
  description!: string;

  @IsString()
  @MaxLength(200)
  shortDesc!: string;

  @IsString()
  iconUrl!: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  screenshots?: string[];

  @IsEnum(Platform)
  @IsOptional()
  platform?: Platform;

  @IsString()
  @IsOptional()
  minAndroid?: string;

  @IsUrl()
  @IsOptional()
  websiteUrl?: string;

  @IsUrl()
  privacyUrl!: string; // Mandatory — GDPR

  @IsUrl()
  @IsOptional()
  sourceUrl?: string;
}

export class UpdateAppDto {
  @IsString()
  @Length(2, 100)
  @IsOptional()
  name?: string;

  @IsEnum(Category)
  @IsOptional()
  category?: Category;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @MaxLength(200)
  @IsOptional()
  shortDesc?: string;

  @IsString()
  @IsOptional()
  iconUrl?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  screenshots?: string[];

  @IsEnum(Platform)
  @IsOptional()
  platform?: Platform;

  @IsString()
  @IsOptional()
  minAndroid?: string;

  @IsUrl()
  @IsOptional()
  websiteUrl?: string;

  @IsUrl()
  @IsOptional()
  privacyUrl?: string;

  @IsUrl()
  @IsOptional()
  sourceUrl?: string;
}
