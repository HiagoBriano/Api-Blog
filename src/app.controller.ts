import { Body, Controller, Get, Post } from '@nestjs/common';
import AppResponse from './app.interface';
import { ApiOkResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsString } from '@nestjs/class-validator';

class Validate {
  @IsString()
  @ApiProperty({ example: 'Jin' })
  name: string;

  @IsString()
  @ApiProperty({ example: 'jiin@example.com' })
  email: string;

  @IsString()
  @ApiProperty({ example: '123456' })
  password: string;
}

@ApiTags('Status')
@Controller()
export class AppController {
  @Get()
  @ApiOkResponse({
    status: 200,
    example: { success: true, message: 'Server is running', data: null },
  })
  getStatus(): AppResponse {
    return { success: true, message: 'Server is running', data: null };
  }
}
