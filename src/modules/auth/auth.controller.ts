import { signInSchema_200, unauthorized_401 } from './auth.schema';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import AppResponse from 'src/app.interface';
import { signInDTO } from './auth.dto';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Autenticação')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(200)
  @ApiOkResponse({
    description: 'Login realizado com sucesso',
    example: signInSchema_200,
  })
  @ApiUnauthorizedResponse({
    description: 'E-mail ou senha inválido',
    example: unauthorized_401,
  })
  @ApiOperation({ summary: 'Fazer login' })
  async signIn(@Body() body: signInDTO): Promise<AppResponse> {
    const response = await this.authService.signIn(body);
    return {
      success: true,
      message: 'Login realizado com sucesso',
      data: response,
    };
  }
}
