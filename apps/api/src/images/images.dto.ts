import { IsIn, IsNotEmpty, IsString } from "class-validator";
import { ALLOWED_CONTENT_TYPES, IMAGE_KINDS, ImageKind } from "./images.constants";

export class CreateImageUploadUrlDto {
  @IsIn(IMAGE_KINDS as unknown as string[])
  kind!: ImageKind;

  /**
   * El tipo que declara el navegador. Decide la extension y entra en la firma,
   * pero NO se cree: al confirmar se comprueban los bytes reales del objeto.
   */
  @IsIn(ALLOWED_CONTENT_TYPES)
  contentType!: string;
}

export class CompleteImageUploadDto {
  @IsString()
  @IsNotEmpty()
  uploadRef!: string;
}
