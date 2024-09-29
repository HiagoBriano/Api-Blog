import { IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
