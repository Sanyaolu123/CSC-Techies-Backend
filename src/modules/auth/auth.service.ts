import { LoginDto } from '@/interfaces/auth/dto/login.dto';
import { PrismaService, TokenService } from '@/shared';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokenService,
  ) {}

  async login(data: LoginDto) {
    const email = data.email.toLowerCase();
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user || !(await argon2.verify(user.password, data.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.tokenService.generateTokens(user.id, user.email);

    return { user, tokens };
  }
}
