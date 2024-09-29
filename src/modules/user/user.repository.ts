import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly Prisma: PrismaService) {}

  async create(data: CreateUserDTO) {
    return await this.Prisma.user.create({ data });
  }

  async createTwo(data: CreateUserDTO) {
    return await this.Prisma.user.create({ data });
  }
}
