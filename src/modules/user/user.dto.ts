import { ImageDTO } from 'src/infra/validation/image.dto';
import { Transform, Type } from '@nestjs/class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import {
  IsInt,
  IsOptional,
  IsString,
  Length,
  Matches,
} from '@nestjs/class-validator';

const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

// Conteúdo codificado do JWT
export class PayloadDTO {
  @IsString()
  sub: string;

  @IsString()
  @Matches(emailRegex)
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
  @ApiProperty({ example: 'jin@example.com' })
  @Transform(({ value }) => value.toLowerCase())
  @Matches(emailRegex, { message: 'Invalid email' })
  email: string;

  @IsString()
  @ApiProperty({ example: '123456' })
  password: string;
}

export class findAllUserDTO {
  @IsString()
  @IsOptional()
  @Matches(emailRegex, { message: 'Invalid email' })
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
  @Matches(emailRegex)
  email?: string;
}

export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'jin@example.com' })
  @Transform(({ value }) => value.toLowerCase())
  @Matches(emailRegex)
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
  // @IsFile({ mime: ['image/jpeg', 'image/jpg', 'image/png'] })
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Arquivo de imagem nos formatos JPEG, JPG ou PNG',
  })
  @Type(() => ImageDTO)
  photo: any;
}
