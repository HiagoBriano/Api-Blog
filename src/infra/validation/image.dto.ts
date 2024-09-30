import { Type } from '@nestjs/class-transformer';
import {
  IsNotEmpty,
  IsString,
  Matches,
  ValidateNested,
} from '@nestjs/class-validator';
import { FileType, FileTypeDTO } from '../providers/storage/storage.dto';

export class ImageTypeDTO extends FileTypeDTO {
  @IsString()
  @IsNotEmpty()
  @Matches(/^image\/(jpeg|png)$/, {
    message: 'Invalid file type, allowed: jpeg, png',
  })
  mime: string;
}

export class ImageDTO extends FileType {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ImageTypeDTO)
  fileType: ImageTypeDTO;
}
