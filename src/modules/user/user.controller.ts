import { Auth, Types } from 'src/decorators/auth.decorators';
import { FormDataRequest } from 'nestjs-form-data';
import { UserService } from './user.service';
import AppResponse from 'src/app.interface';
import { $Enums } from '@prisma/client';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  createSchema_201,
  createSchema_400,
  deleteSchema_200,
  findAllSchema_200,
  findByIdSchema_200,
  unauthorized_401,
  updatePhotoSchema_200,
} from './user.schema';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import {
  CreateUserDTO,
  findAllUserDTO,
  PayloadDTO,
  updatePhotoDTO,
  UpdateUserDTO,
} from './user.dto';

@Controller('/users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Criação de usuário' })
  @ApiCreatedResponse({
    example: createSchema_201,
    description: 'Usuário criado com sucesso',
  })
  @ApiBadRequestResponse({
    example: createSchema_400,
    description: 'E-mail já existe',
  })
  async create(@Body() body: CreateUserDTO): Promise<AppResponse> {
    const response = await this.userService.create(body);
    return {
      success: true,
      message: 'user created successfully',
      data: response,
    };
  }

  @Get()
  @Auth(Types.ADMIN)
  @ApiBearerAuth()
  @ApiQuery({ name: 'email', required: false })
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'role', required: false, enum: $Enums.roles })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiOperation({ summary: 'Busca de todos os usuários' })
  @ApiOkResponse({
    description: 'Todos os usuários',
    example: findAllSchema_200,
  })
  @ApiUnauthorizedResponse({
    description: 'Não autorizado',
    example: unauthorized_401,
  })
  async findAll(@Query() query: findAllUserDTO): Promise<AppResponse> {
    const response = await this.userService.findAll(query);

    return {
      success: true,
      message: 'users found successfully',
      data: response,
    };
  }

  @Get(':id')
  @ApiBearerAuth()
  @Auth(Types.ADMIN, Types.USER)
  @ApiOkResponse({
    description: 'usuário encontrado',
    example: findByIdSchema_200,
  })
  @ApiUnauthorizedResponse({
    description: 'Não autorizado',
    example: unauthorized_401,
  })
  @ApiOperation({ summary: 'Buscar dados do usuário' })
  async findById(
    @Param('id') id: string,
    @Request() req: { user: PayloadDTO },
  ) {
    const response = await this.userService.findUnique(id, req.user);

    return {
      success: true,
      message: 'Users found successfully',
      data: response,
    };
  }

  @Patch(':id')
  @ApiBearerAuth()
  @FormDataRequest()
  @Auth(Types.ADMIN, Types.USER)
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Atualizar foto do usuário' })
  @ApiOkResponse({
    example: updatePhotoSchema_200,
    description: 'Todos os usuários',
  })
  @ApiUnauthorizedResponse({
    description: 'Não autorizado',
    example: unauthorized_401,
  })
  async updatePhoto(
    @Param('id') id: string,
    @Body() body: updatePhotoDTO,
    @Request() req: { user: PayloadDTO },
  ): Promise<AppResponse> {
    const response = await this.userService.updatePhoto(
      id,
      body.photo,
      req.user,
    );

    return {
      success: true,
      message: 'Photo updated successfully',
      data: response,
    };
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar dados do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Atualizado com sucesso',
    example: deleteSchema_200,
  })
  @ApiUnauthorizedResponse({
    description: 'Não autorizado',
    example: unauthorized_401,
  })
  async update(
    @Param('id') id: string,
    @Body() body: UpdateUserDTO,
    @Request() req: { user: PayloadDTO },
  ): Promise<AppResponse> {
    const response = await this.userService.update(id, req.user, body);

    return {
      success: true,
      message: 'User updated successfully',
      data: response,
    };
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Auth(Types.ADMIN)
  @ApiOperation({ summary: 'Deletar usuário' })
  @ApiResponse({
    status: 200,
    description: 'Usuário excluído com sucesso',
    example: deleteSchema_200,
  })
  @ApiUnauthorizedResponse({
    description: 'Não autorizado',
    example: unauthorized_401,
  })
  async delete(
    @Param('id') id: string,
    @Request() req: { user: PayloadDTO },
  ): Promise<AppResponse> {
    await this.userService.delete(id, req.user);
    return {
      success: true,
      message: 'user deleted successfully',
      data: null,
    };
  }
}
