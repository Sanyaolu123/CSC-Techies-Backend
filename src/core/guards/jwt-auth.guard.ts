import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeader =
      request.headers['authorization'] || request.headers['Authorization'];
    if (!authHeader || typeof authHeader !== 'string') {
      throw new UnauthorizedException('No authorization header');
    }

    const [, token] = authHeader.split(' ');
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const jwtService = new JwtService({
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      });
      const user = await jwtService.verifyAsync(token);
      request.user = user;
      return true;
    } catch (err) {
      console.log(err)
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
