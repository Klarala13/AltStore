import { IsEmail, IsEnum, IsString, Length } from "class-validator";
import { DeveloperType } from "@appia/db";
import { CreateAppDto } from "../apps/apps.dto";

/**
 * An app submitted without an account. The submitter fields become a Developer
 * row with no passwordHash, which the schema already allows, so nothing here
 * needs a migration. The submitter never signs in.
 */
export class SubmitAppDto extends CreateAppDto {
  @IsEmail()
  submitterEmail!: string;

  @IsString()
  @Length(2, 100)
  submitterName!: string;

  @IsEnum(DeveloperType)
  submitterType!: DeveloperType;

  @IsString()
  @Length(2, 2)
  submitterCountry!: string;
}
