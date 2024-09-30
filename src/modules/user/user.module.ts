import { SupabaseStorage } from 'src/infra/providers/storage/supabase.storage';
import { ImageSizeValidation } from 'src/infra/validation/imageSize';
import { IStorage } from 'src/infra/providers/storage/storage';
import { PrismaService } from 'src/prisma/prisma.service';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [NestjsFormDataModule],
  controllers: [UserController],
  providers: [
    PrismaService,
    UserService,
    UserRepository,
    ImageSizeValidation,
    { provide: IStorage, useClass: SupabaseStorage },
  ],
})
export class UserModule {}
