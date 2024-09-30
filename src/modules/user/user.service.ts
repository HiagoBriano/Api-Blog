import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ImageSizeValidation } from 'src/infra/validation/imageSize';
import { IStorage } from 'src/infra/providers/storage/storage';
import { Types } from 'src/decorators/auth.decorators';
import { UserRepository } from './user.repository';
import { extname } from 'path';
import { hash } from 'bcrypt';
import {
  CreateUserDTO,
  findAllUserDTO,
  PayloadDTO,
  UpdateUserDTO,
} from './user.dto';
import { ImageDTO } from 'src/infra/validation/image.dto';

@Injectable()
export class UserService {
  constructor(
    private imageSizeValidation: ImageSizeValidation,
    private readonly userRepository: UserRepository,
    private readonly storage: IStorage,
  ) {}

  async checkUserName(userName: string) {
    const userExists = await this.userRepository.findUnique({
      userName,
    });

    if (userExists) {
      return {
        success: true,
        message: 'userName already registered',
        data: null,
      };
    }

    return {
      success: true,
      message: 'free userName',
      data: null,
    };
  }

  async create(user: CreateUserDTO) {
    let userExists = await this.userRepository.findUnique({
      email: user.email,
    });

    if (userExists) {
      throw new HttpException(
        {
          success: false,
          message: 'email already registered',
          data: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    userExists = await this.userRepository.findUnique({
      userName: user.userName,
    });

    if (userExists) {
      throw new HttpException(
        {
          success: false,
          message: 'userName already registered',
          data: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const password = await hash(user.password, 10);
    return await this.userRepository.create({ ...user, password });
  }

  async findUnique(id: string, data: PayloadDTO) {
    if (data.role !== Types.ADMIN) {
      if (data.sub !== id) {
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

    return await this.userRepository.findUnique({ id });
  }

  async findAll(data: findAllUserDTO) {
    return await this.userRepository.findAll(data);
  }

  async updatePhoto(id: string, photo: ImageDTO, user: PayloadDTO) {
    if (user.role !== Types.ADMIN) {
      if (user.sub !== id) {
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

    const extFile = extname(photo.originalName);
    photo.originalName = `${id}.${extFile}`;

    const imageUrl = await this.storage.uploadFile(photo, 'photo-users/');

    return await this.userRepository.updatePhoto(id, imageUrl);
  }

  async update(id: string, user: PayloadDTO, data: UpdateUserDTO) {
    if (user.role !== Types.ADMIN) {
      if (user.sub !== id) {
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

    if (data.password) {
      data.password = await hash(data.password, 10);
    }

    try {
      return await this.userRepository.update(id, data);
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: error.message,
          data: null,
        },
        HttpStatus.CONFLICT,
      );
    }
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

    return await this.userRepository.delete(id);
  }
}
