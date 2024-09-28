import { Controller, Get } from '@nestjs/common';
import AppResponse from './app.interface';

@Controller()
export class AppController {
  @Get()
  getHello(): AppResponse {
    return { success: true, message: 'Server is running', data: [] };
  }
}
