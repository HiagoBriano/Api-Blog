import { Controller, Get } from '@nestjs/common';
import AppResponse from './app.interface';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Status')
@Controller()
export class AppController {
  @Get()
  @ApiOkResponse({
    example: { success: true, message: 'Server is running', data: [] },
  })
  getStatus(): AppResponse {
    return { success: true, message: 'Server is running', data: [] };
  }
}
