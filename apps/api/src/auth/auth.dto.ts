import { IsEmail, IsString, IsEnum, IsOptional, Length } from "class-validator";
import { DeveloperType } from "@altstore/db";

export enum SocialProvider {
  GOOGLE = "google",
  GITHUB = "github",
  APPLE = "apple",
}

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}

export class RegisterDeveloperDto {
  @IsEmail()
  email!: string;

  @IsString()
  @Length(2, 100)
  name!: string;

  @IsEnum(DeveloperType)
  type!: DeveloperType;

  @IsString()
  @Length(2, 2)
  country!: string; // ISO 3166-1 alpha-2

  @IsString()
  @IsOptional()
  vatNumber?: string;

  @IsString()
  @Length(8, 100)
  password!: string;
}

export class SocialLoginDto {
  @IsEnum(SocialProvider)
  provider!: SocialProvider;

  @IsEmail()
  email!: string;

  @IsString()
  @Length(2, 100)
  name!: string;
}
