import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { PayloadDTO } from '../user/user.dto';
import { JwtService } from '@nestjs/jwt';
import { signInDTO } from './auth.dto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn({ email, password }: signInDTO) {
    const user = await this.authRepository.findUnique(email);

    if (!user) {
      throw new HttpException(
        {
          success: false,
          message: 'Unauthorized',
          data: null,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isEqualPassword = await compare(password, user.password);

    if (!isEqualPassword) {
      throw new HttpException(
        {
          success: false,
          message: 'Unauthorized',
          data: null,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload: PayloadDTO = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const token = await this.jwtService.signAsync(payload);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;

    return {
      ...userWithoutPassword,
      access_token: token,
    };
  }
}
