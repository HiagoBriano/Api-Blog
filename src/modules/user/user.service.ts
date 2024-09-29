import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(user: CreateUserDTO) {
    return await this.userRepository.create(user);
  }
}
