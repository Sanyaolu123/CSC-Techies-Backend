import { User } from '@prisma/client';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenResponse {
  user: User;
  tokens: AuthTokens;
}

export interface LoginResponse {
  user: User;
  tokens: AuthTokens;
}

export interface TokenPayload {
  sub: string;
  email: string;
  role: string;
}
