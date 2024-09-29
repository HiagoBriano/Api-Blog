import { Injectable, BadRequestException } from '@nestjs/common';
import { ImageDTO } from 'src/modules/user/user.dto';
import * as sharp from 'sharp';

@Injectable()
export class ImageSizeValidation {
  async transform(file: ImageDTO): Promise<ImageDTO> {
    if (!file) throw new BadRequestException('Image submission is mandatory');

    const MAX_SIZE = 500 * 1024; // 500 KB

    if (file.size > MAX_SIZE) {
      const resizedBuffer = await sharp(file.buffer)
        .resize({ width: 800 })
        .toBuffer();

      if (resizedBuffer.length > MAX_SIZE) {
        throw new BadRequestException('Image size must be less than 500 KB');
      }

      file.buffer = resizedBuffer;
      file.size = resizedBuffer.length;
    }

    return file;
  }
}
