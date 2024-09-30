import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly Prisma: PrismaService) {}

  async findUnique(email: string) {
    return await this.Prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
