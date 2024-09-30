import { Controller, Get } from '@nestjs/common';
import AppResponse from './app.interface';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Status')
@Controller()
export class AppController {
  @Get()
  @ApiOkResponse({
    description: 'Servidor está online',
    example: { success: true, message: 'Server is running', data: null },
  })
  @ApiOperation({ summary: 'Verifica se o servidor está online' })
  getStatus(): AppResponse {
    return { success: true, message: 'Server is running', data: null };
  }
}
