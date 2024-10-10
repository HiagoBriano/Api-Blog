import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import {
  CreatePostDTO,
  findAllPostDTO,
  findUniquePostDTO,
  UpdatePostDTO,
} from './post.dto';

@Injectable()
export class PostRepository {
  constructor(private readonly Prisma: PrismaService) {}

  async create(data: CreatePostDTO) {
    return await this.Prisma.post.create({
      data: {
        ...data,
        ...(data.published && { publishedAt: new Date() }),
      },
    });
  }

  async findUnique({ id, slug }: findUniquePostDTO) {
    return await this.Prisma.post.findUnique({
      where: {
        deletedAt: null,
        ...(id && { id }),
        ...(slug && { slug }),
      },
    });
  }

  async findAll({ title, subtitle, page = 1, pageSize = 10 }: findAllPostDTO) {
    const response = await this.Prisma.post.findMany({
      where: {
        deletedAt: null,
        ...(title && { title: { contains: title, mode: 'insensitive' } }),
        ...(subtitle && {
          subtitle: { contains: subtitle, mode: 'insensitive' },
        }),
      },
      select: {
        id: true,
        title: true,
        subtitle: true,
        slug: true,
        publishedAt: true,
      },
      orderBy: [{ publishedAt: 'desc' }],
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const total = await this.Prisma.post.count({
      where: {
        ...(title && { email: { contains: title, mode: 'insensitive' } }),
        ...(subtitle && {
          subtitle: { contains: subtitle, mode: 'insensitive' },
        }),
      },
    });

    return {
      total,
      totalPages: page ? Math.ceil(total / pageSize) : 1,
      data: response,
    };
  }

  async update(
    id: string,
    {
      title,
      subtitle,
      content,
      slug,
      photoDescription,
      language,
      published,
    }: UpdatePostDTO,
  ) {
    return await this.Prisma.post.update({
      where: {
        id,
      },
      data: {
        ...(title && { title }),
        ...(photoDescription && { photoDescription }),
        ...(slug && { slug }),
        ...(subtitle && { subtitle }),
        ...(content && { content }),
        ...(language && { language }),
        ...(published && { published }),
        ...(published && { publishedAt: new Date() }),
      },
    });
  }

  async updatePhoto(id: string, photo: string) {
    return await this.Prisma.post.update({
      where: {
        id,
      },
      data: {
        photo,
      },
    });
  }

  async delete(id: string) {
    return await this.Prisma.post.update({
      where: {
        id,
      },
      data: {
        slug: null,
        deletedAt: new Date(),
      },
    });
  }
}
