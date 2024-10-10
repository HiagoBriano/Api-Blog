import { Transform, Type } from '@nestjs/class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
} from '@nestjs/class-validator';

export class CreatePostDTO {
  @IsString()
  @ApiProperty({ example: 'Como centralizar uma div' })
  title: string;

  @IsString()
  @ApiProperty({
    example: 'Aprenda de uma vez por todos como centralizar uma div',
  })
  @Transform(({ value }) => value.toLowerCase())
  subtitle: string;

  @IsString()
  @ApiProperty({ example: 'como-centralizar-uma-div' })
  slug: string;

  @IsString()
  @ApiProperty({ example: 'Conteudo da publicação' })
  content: string;

  @IsString()
  @ApiProperty({ example: 'fbce887e-c259-4a68-bfb0-0a092cd69e43' })
  authorId: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'é a imagem do VS Code com um código em HTML',
  })
  photoDescription?: string;

  @IsString()
  @ApiProperty({ example: 'ptBR' })
  language: $Enums.Languages;

  @IsBoolean()
  @Type(() => Boolean)
  @ApiProperty({ example: false })
  published: boolean;
}

export class findUniquePostDTO {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  slug?: string;
}

export class findAllPostDTO {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  subtitle?: string;

  @IsInt()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  page?: number;

  @IsInt()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  pageSize?: number;
}

export class UpdatePostDTO {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Como centralizar uma div' })
  title?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Aprenda de uma vez por todos como centralizar uma div',
  })
  @Transform(({ value }) => value.toLowerCase())
  subtitle?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'como-centralizar-uma-div' })
  slug?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Conteudo da publicação' })
  content?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'é a imagem do VS Code com um código em HTML',
  })
  photoDescription?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'ptBR' })
  language?: $Enums.Languages;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @ApiProperty({ example: true })
  published?: boolean;
}
