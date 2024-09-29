import { FileType, FileTypeDTO } from 'src/infra/providers/storage/storage.dto';
import { Type } from '@nestjs/class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from '@nestjs/class-validator';

// Conteúdo codificado do JWT
export class PayloadDTO {
  @IsString()
  sub: string;

  @IsString()
  email: string;

  @IsString()
  role: $Enums.roles;
}

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

export class CreateUserDTO {
  @IsString()
  @ApiProperty({ example: 'Jin Gustavo' })
  name: string;

  @IsString()
  @ApiProperty({ example: 'JinGus' })
  userName: string;

  @IsString()
  @ApiProperty({ example: 'jin@example.com' })
  email: string;

  @IsString()
  @ApiProperty({ example: '123456' })
  password: string;

  @IsString()
  @ApiProperty({ example: '11954614344' })
  phone: string;
}

export class findAllUserDTO {
  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  role?: $Enums.roles;
}

export class findUniqueUserDTO {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  userName?: string;
}

export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  userName?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'jin@example.com' })
  email?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '123456' })
  password?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '11954614344' })
  phone?: string;
}
