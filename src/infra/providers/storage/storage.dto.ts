import { Type } from '@nestjs/class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from '@nestjs/class-validator';

export class FileTypeDTO {
  @IsString()
  @IsNotEmpty()
  ext: string;

  @IsString()
  @IsNotEmpty()
  mime: string;
}

export class FileType {
  @IsString()
  @IsNotEmpty()
  originalName: string;

  @IsString()
  @IsNotEmpty()
  encoding: string;

  @IsString()
  @IsNotEmpty()
  busBoyMimeType: string;

  @Type(() => Buffer)
  @IsNotEmpty()
  buffer: Buffer;

  @IsNumber()
  @IsNotEmpty()
  size: number;

  @Type(() => FileTypeDTO)
  @ValidateNested()
  @IsNotEmpty()
  fileType: FileTypeDTO;
}
