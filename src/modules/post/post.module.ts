import { SupabaseStorage } from 'src/infra/providers/storage/supabase.storage';
import { ImageSizeValidation } from 'src/infra/validation/imageSize';
import { IStorage } from 'src/infra/providers/storage/storage';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [PostController],
  providers: [
    PostRepository,
    PostService,
    PrismaService,
    ImageSizeValidation,
    { provide: IStorage, useClass: SupabaseStorage },
  ],
})
export class PostModule {}
