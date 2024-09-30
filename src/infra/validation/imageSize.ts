import { Injectable, BadRequestException } from '@nestjs/common';
import { ImageDTO } from './image.dto';
import * as sharp from 'sharp';

@Injectable()
export class ImageSizeValidation {
  async transform(image: ImageDTO): Promise<ImageDTO> {
    if (!image) throw new BadRequestException('Image submission is mandatory');

    const MAX_SIZE = 500 * 1024; // 500 KB

    if (image.size > MAX_SIZE) {
      const resizedBuffer = await sharp(image.buffer)
        .resize({ width: 800 })
        .toBuffer();

      if (resizedBuffer.length > MAX_SIZE) {
        throw new BadRequestException('Image size must be less than 500 KB');
      }

      image.buffer = resizedBuffer;
      image.size = resizedBuffer.length;
    }

    return image;
  }
}
