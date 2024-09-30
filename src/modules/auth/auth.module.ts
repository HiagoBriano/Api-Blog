import { Module } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, PrismaService],
})
export class AuthModule {}
