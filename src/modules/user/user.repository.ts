import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateUserDTO,
  findAllUserDTO,
  findUniqueUserDTO,
  UpdateUserDTO,
} from './user.dto';

const select = {
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
};
@Injectable()
export class UserRepository {
  constructor(private readonly Prisma: PrismaService) {}

  async create(data: CreateUserDTO) {
    return await this.Prisma.user.create({
      data,
      select,
    });
  }

  async findUnique({ id, email }: findUniqueUserDTO) {
    return await this.Prisma.user.findUnique({
      where: {
        deletedAt: null,
        ...(id && { id }),
        ...(email && { email }),
      },
      select,
    });
  }

  async findAll({
    email,
    name,
    role,
    page = 1,
    pageSize = 10,
  }: findAllUserDTO) {
    const response = await this.Prisma.user.findMany({
      where: {
        deletedAt: null,
        ...(email && { email: { contains: email, mode: 'insensitive' } }),
        ...(name && { name: { contains: name, mode: 'insensitive' } }),
        ...(role && { role }),
      },
      select,
      orderBy: [{ name: 'asc' }],
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const total = await this.Prisma.user.count({
      where: {
        ...(email && { email: { contains: email, mode: 'insensitive' } }),
        ...(name && { name: { contains: name, mode: 'insensitive' } }),
        ...(role && { role }),
      },
    });

    return {
      total,
      totalPages: page ? Math.ceil(total / pageSize) : 1,
      data: response,
    };
  }

  async updatePhoto(id: string, photo: string) {
    return await this.Prisma.user.update({
      where: {
        id,
      },
      data: {
        photo,
      },
      select,
    });
  }

  async update(id: string, { name, password, phone }: UpdateUserDTO) {
    return await this.Prisma.user.update({
      where: {
        id,
      },
      data: {
        ...(name && { name }),
        ...(password && { password }),
        ...(phone && { phone }),
      },
      select,
    });
  }

  async delete(id: string) {
    return await this.Prisma.user.update({
      where: {
        id,
      },
      data: {
        email: null,
        deletedAt: new Date(),
      },
      select,
    });
  }
}
