import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Generate access and refresh tokens for a user
   * @param userId The user's unique identifier
   * @param email The user's email address
   * @returns Object containing access token and refresh token
   */
  generateTokens(userId: string, email: string) {
    const accessToken = this.jwtService.sign(
      {
        sub: userId,
        email,
      },
      {
        secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get<string>(
          'JWT_ACCESS_TOKEN_EXPIRES_IN',
        ),
      },
    );

    const refreshToken = this.jwtService.sign(
      {
        sub: userId,
        email,
      },
      {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get<string>(
          'JWT_REFRESH_TOKEN_EXPIRES_IN',
        ),
      },
    );

    return { accessToken, refreshToken };
  }

  /**
   * Verify JWT refresh token
   * @param token JWT refresh token to verify
   * @returns Decoded token payload if valid
   * @throws Error if token is invalid or expired
   */
  verifyRefreshToken(token: string) {
    return this.jwtService.verify(token, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
    });
  }

  /**
   * Verify JWT access token
   * @param token JWT access token to verify
   * @returns Decoded token payload if valid
   * @throws Error if token is invalid or expired
   */
  verifyAccessToken(token: string) {
    return this.jwtService.verify(token, {
      secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
    });
  }
}
