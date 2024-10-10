import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ImageSizeValidation } from 'src/infra/validation/imageSize';
import { IStorage } from 'src/infra/providers/storage/storage';
import { ImageDTO } from 'src/infra/validation/image.dto';
import { Types } from 'src/decorators/auth.decorators';
import { PostRepository } from './post.repository';
import { PayloadDTO } from '../user/user.dto';
import {
  CreatePostDTO,
  findAllPostDTO,
  findUniquePostDTO,
  UpdatePostDTO,
} from './post.dto';

@Injectable()
export class PostService {
  constructor(
    private readonly imageSizeValidation: ImageSizeValidation,
    private readonly postRepository: PostRepository,
    private readonly storage: IStorage,
  ) {}

  async create(user: PayloadDTO, data: CreatePostDTO) {
    const postExists = await this.postRepository.findUnique({
      slug: data.slug,
    });

    if (postExists) {
      throw new HttpException(
        {
          success: false,
          message: 'slug already registered',
          data: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.postRepository.create({ ...data, authorId: user.sub });
  }

  async findUnique(data: findUniquePostDTO) {
    const user = await this.postRepository.findUnique(data);

    if (!user) {
      throw new HttpException(
        {
          success: false,
          message: 'post not found',
          data: null,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async findAll(data: findAllPostDTO) {
    return await this.postRepository.findAll(data);
  }

  async updatePhoto(id: string, photo: ImageDTO, user: PayloadDTO) {
    const post = await this.postRepository.findUnique({ id });

    if (!post) {
      throw new HttpException(
        {
          success: false,
          message: 'post not found',
          data: null,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (user.role !== Types.ADMIN) {
      if (user.sub !== post.authorId) {
        throw new HttpException(
          {
            success: false,
            message: 'Unauthorized',
            data: null,
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
    }

    photo = await this.imageSizeValidation.transform(photo);

    photo.originalName = `${id}.${photo.fileType.ext}`;

    const imageUrl = await this.storage.uploadFile(photo, 'posts');

    return await this.postRepository.updatePhoto(id, imageUrl);
  }

  async update(id: string, user: PayloadDTO, data: UpdatePostDTO) {
    const post = await this.postRepository.findUnique({ id });

    if (!post) {
      throw new HttpException(
        {
          success: false,
          message: 'post not found',
          data: null,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (user.role !== Types.ADMIN) {
      if (user.sub !== post.authorId) {
        throw new HttpException(
          {
            success: false,
            message: 'Unauthorized',
            data: null,
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
    }

    return await this.postRepository.update(id, data);
  }

  async delete(id: string, data: PayloadDTO) {
    if (data.role !== Types.ADMIN && data.sub !== id) {
      throw new HttpException(
        {
          success: false,
          message: 'Unauthorized',
          data: null,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return await this.postRepository.delete(id);
  }
}
