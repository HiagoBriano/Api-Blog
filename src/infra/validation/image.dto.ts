import { Type } from '@nestjs/class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  Matches,
  ValidateNested,
} from '@nestjs/class-validator';

export class ImageTypeDTO {
  @IsString()
  @IsNotEmpty()
  ext: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^image\/(jpeg|png)$/, {
    message: 'Invalid file type, allowed: jpeg, png',
  })
  mime: string;
}

export class ImageDTO {
  @IsString()
  @IsNotEmpty()
  originalName: string;

  @IsString()
  @IsNotEmpty()
  encoding: string;

  @IsString()
  @IsNotEmpty()
  busBoyMimeType: string;

  @IsNotEmpty()
  buffer: Buffer; // O Buffer do Node.js não requer validação adicional

  @IsNumber()
  @IsNotEmpty()
  size: number;

  @ValidateNested()
  @IsObject()
  @Type(() => ImageTypeDTO)
  fileType: ImageTypeDTO;
}
