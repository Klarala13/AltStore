import { IsInt, IsOptional, IsString, Max, MaxLength, Min } from "class-validator";

export class UpsertRatingDto {
  @IsInt()
  @Min(1)
  @Max(5)
  score!: number;

  @IsString()
  @MaxLength(120)
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  body?: string;
}
