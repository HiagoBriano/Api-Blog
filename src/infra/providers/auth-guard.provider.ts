import { PayloadDTO } from 'src/modules/user/user.dto';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (token === undefined) {
      throw new HttpException(
        {
          success: false,
          message: 'Unauthorized',
          data: null,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      const payload: PayloadDTO = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET_KEY,
      });

      request['user'] = payload;

      return true;
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Unauthorized',
          data: null,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
