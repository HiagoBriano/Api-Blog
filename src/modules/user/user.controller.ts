import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDTO } from './user.dto';
import AppResponse from 'src/app.interface';

@Controller('/users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Criação de usuário' })
  async create(@Body() body: CreateUserDTO): Promise<AppResponse> {
    const response = await this.userService.create(body);
    return { success: true, message: 'Server is running', data: response };
  }
}
