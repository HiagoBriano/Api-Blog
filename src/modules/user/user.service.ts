import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ImageSizeValidation } from 'src/infra/validation/imageSize';
import { IStorage } from 'src/infra/providers/storage/storage';
import { ImageDTO } from 'src/infra/validation/image.dto';
import { Types } from 'src/decorators/auth.decorators';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcrypt';
import {
  CreateUserDTO,
  findAllUserDTO,
  PayloadDTO,
  UpdateUserDTO,
} from './user.dto';

@Injectable()
export class UserService {
  constructor(
    private imageSizeValidation: ImageSizeValidation,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly storage: IStorage,
  ) {}

  async create(user: CreateUserDTO) {
    const userExists = await this.userRepository.findUnique({
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

    const password = await hash(user.password, 10);
    const userCreated = await this.userRepository.create({ ...user, password });

    const payload: PayloadDTO = {
      sub: userCreated.id,
      email: userCreated.email,
      role: userCreated.role,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
      ...userCreated,
    };
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

    const user = await this.userRepository.findUnique({ id });

    if (!user) {
      throw new HttpException(
        {
          success: false,
          message: 'user not found',
          data: null,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
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

    photo.originalName = `${id}.${photo.fileType.ext}`;

    const imageUrl = await this.storage.uploadFile(photo, 'avatars');

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
