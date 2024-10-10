import { PostService } from './post.service';
import AppResponse from 'src/app.interface';
import { CreatePostDTO, findAllPostDTO, UpdatePostDTO } from './post.dto';
import { PayloadDTO, updatePhotoDTO } from '../user/user.dto';
import {
  Body,
  Controller,
  Request,
  Post,
  Get,
  Query,
  Param,
  UploadedFile,
  Patch,
  UseInterceptors,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth, Types } from 'src/decorators/auth.decorators';
import {
  createSchema_201,
  createSchema_400,
  deleteSchema_200,
  findAllSchema_200,
  findUniqueSchema_200,
  notFind_404,
  updatePhotoSchema_200,
  updateSchema_200,
} from './post.schema';
import { ImageDTO } from 'src/infra/validation/image.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/posts')
@ApiTags('Postagem')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiBearerAuth()
  @Auth(Types.ADMIN, Types.PENMANT)
  @ApiOperation({ summary: 'Criar nova postagem' })
  @ApiCreatedResponse({
    example: createSchema_201,
    description: 'Postagem criada com sucesso',
  })
  @ApiBadRequestResponse({
    example: createSchema_400,
    description: 'Slug já existe',
  })
  async create(
    @Body() body: CreatePostDTO,
    @Request() req: { user: PayloadDTO },
  ): Promise<AppResponse> {
    const response = await this.postService.create(req.user, body);

    return {
      success: true,
      message: 'post created successfully',
      data: response,
    };
  }

  @Get()
  @ApiQuery({ name: 'title', required: false })
  @ApiQuery({ name: 'subtitle', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiOperation({ summary: 'Busca de todos as postagens' })
  @ApiOkResponse({
    description: 'Busca bem sucedida',
    example: findAllSchema_200,
  })
  async findAll(@Query() query: findAllPostDTO): Promise<AppResponse> {
    const response = await this.postService.findAll(query);

    return {
      success: true,
      message: 'posts found successfully',
      data: response,
    };
  }

  @Get(':slug')
  @ApiOkResponse({
    description: 'Postagem encontrado',
    example: findUniqueSchema_200,
  })
  @ApiResponse({
    status: 404,
    description: 'Postagem não encontrada',
    example: notFind_404,
  })
  @ApiOperation({ summary: 'Buscar dados do usuário' })
  async findById(@Param('slug') slug: string): Promise<AppResponse> {
    const response = await this.postService.findUnique({ slug });

    return {
      success: true,
      message: 'Users found successfully',
      data: response,
    };
  }

  @Patch(':id')
  @ApiBearerAuth()
  @Auth(Types.ADMIN, Types.PENMANT)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('photo'))
  @ApiOperation({ summary: 'Atualizar imagem da postagem' })
  @ApiOkResponse({
    example: updatePhotoSchema_200,
    description: 'Imagem atualizada com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Postagem não encontrada',
    example: notFind_404,
  })
  @ApiBody({
    description: 'Atualizar imagem da postagem (JPEG, JPG, PNG)',
    type: updatePhotoDTO,
  })
  async updatePhoto(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Request() req: { user: PayloadDTO },
  ): Promise<AppResponse> {
    // Transformar para o DTO manualmente
    const photo: ImageDTO = {
      originalName: file.originalname,
      encoding: file.encoding,
      busBoyMimeType: file.mimetype,
      buffer: file.buffer,
      size: file.size,
      fileType: { ext: file.mimetype.split('/')[1], mime: file.mimetype },
    };

    const response = await this.postService.updatePhoto(id, photo, req.user);

    return {
      success: true,
      message: 'Photo updated successfully',
      data: response,
    };
  }

  @Put(':id')
  @ApiBearerAuth()
  @Auth(Types.ADMIN, Types.USER)
  @ApiOperation({ summary: 'Atualizar postagem' })
  @ApiResponse({
    status: 200,
    description: 'Atualizado com sucesso',
    example: updateSchema_200,
  })
  async update(
    @Param('id') id: string,
    @Body() body: UpdatePostDTO,
    @Request() req: { user: PayloadDTO },
  ): Promise<AppResponse> {
    const response = await this.postService.update(id, req.user, body);

    return {
      success: true,
      message: 'User updated successfully',
      data: response,
    };
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Auth(Types.ADMIN)
  @ApiOperation({ summary: 'Deletar postagem' })
  @ApiResponse({
    status: 200,
    description: 'Usuário excluído com sucesso',
    example: deleteSchema_200,
  })
  async delete(
    @Param('id') id: string,
    @Request() req: { user: PayloadDTO },
  ): Promise<AppResponse> {
    await this.postService.delete(id, req.user);
    return {
      success: true,
      message: 'post deleted successfully',
      data: null,
    };
  }
}
