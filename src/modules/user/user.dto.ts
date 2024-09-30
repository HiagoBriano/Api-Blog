import { ImageDTO } from 'src/infra/validation/image.dto';
import { Transform } from '@nestjs/class-transformer';
import IsFile from 'src/infra/validation/validFile';
import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
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

export class CreateUserDTO {
  @IsString()
  @ApiProperty({ example: 'Jin Gustavo' })
  @Length(3)
  name: string;

  @IsString()
  @ApiProperty({ example: 'JinGus' })
  @Length(5, 10)
  userName: string;

  @IsString()
  @ApiProperty({ example: 'jin@example.com' })
  @Transform(({ value }) => value.toLowerCase())
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

  @IsInt()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  page?: number;

  @IsInt()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  pageSize?: number;
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
  @Length(5, 10)
  userName?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'jin@example.com' })
  @Transform(({ value }) => value.toLowerCase())
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

export class updatePhotoDTO {
  @IsNotEmpty()
  @ValidateNested()
  @IsFile({ mime: ['image/jpeg', 'image/jpg', 'image/png'] })
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Arquivo de imagem nos formatos JPEG, JPG ou PNG',
  })
  photo: ImageDTO;
}
