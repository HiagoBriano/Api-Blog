import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateUserDTO,
  findAllUserDTO,
  findUniqueUserDTO,
  UpdateUserDTO,
} from './user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly Prisma: PrismaService) {}

  async create(data: CreateUserDTO) {
    return await this.Prisma.user.create({ data });
  }

  async findUnique({ id, email, userName }: findUniqueUserDTO) {
    return await this.Prisma.user.findUnique({
      where: {
        ...(id && { id }),
        ...(email && { email }),
        ...(userName && { userName: { mode: 'insensitive' } }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        photo: true,
        status: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });
  }

  async findAll({ email, name, role }: findAllUserDTO) {
    return await this.Prisma.user.findMany({
      where: {
        ...(email && { email: { contains: email, mode: 'insensitive' } }),
        ...(name && { name: { contains: name, mode: 'insensitive' } }),
        ...(role && { role }),
      },
    });
  }

  async updatePhoto(id: string, photo: string) {
    return await this.Prisma.user.update({
      where: {
        id,
      },
      data: {
        photo,
      },
    });
  }

  async update(
    id: string,
    { email, password, phone, userName }: UpdateUserDTO,
  ) {
    return await this.Prisma.user.update({
      where: {
        id,
      },
      data: {
        ...(email && { email }),
        ...(password && { password }),
        ...(phone && { phone }),
        ...(userName && { userName }),
      },
    });
  }

  async delete(id: string) {
    return await this.Prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
