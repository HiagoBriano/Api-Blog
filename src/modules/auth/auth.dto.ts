import { Transform } from '@nestjs/class-transformer';
import { IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class signInDTO {
  @IsString()
  @ApiProperty({ example: 'jin@example.com' })
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @IsString()
  @ApiProperty({ example: '123456' })
  password: string;
}
