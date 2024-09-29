import { IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';

export class CreateUserDTO {
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

export class PayloadDTO {
  @IsString()
  sub: string;

  @IsString()
  email: string;

  @IsString()
  type: $Enums.roles;
}
