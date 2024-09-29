import { SupabaseStorage } from 'src/infra/providers/storage/supabase.storage';
import { IStorage } from 'src/infra/providers/storage/storage';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    PrismaService,
    UserService,
    UserRepository,
    { provide: IStorage, useClass: SupabaseStorage },
  ],
})
export class UserModule {}
