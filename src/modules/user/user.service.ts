import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FileType } from 'src/infra/providers/storage/storage.dto';
import { IStorage } from 'src/infra/providers/storage/storage';
import { Types } from 'src/decorators/auth.decorators';
import { UserRepository } from './user.repository';
import { extname } from 'path';
import {
  CreateUserDTO,
  findAllUserDTO,
  PayloadDTO,
  UpdateUserDTO,
} from './user.dto';

@Injectable()
export class UserService {
  constructor(
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

    return await this.userRepository.create(user);
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

  async updatePhoto(id: string, photo: FileType, user: PayloadDTO) {
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

  async delete(data: PayloadDTO) {
    return await this.userRepository.delete(data.sub);
  }
}
