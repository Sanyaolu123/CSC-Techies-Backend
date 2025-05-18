import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenPayload } from '@/interfaces';

export const GetUser = createParamDecorator(
  (data: keyof TokenPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('User not found in request');
    }

    if (!data) {
      return user;
    }

    if (data === 'sub') {
      const value = user.id || user.sub;
      if (!value) {
        throw new UnauthorizedException('User ID not found');
      }
      return value;
    }

    const value = user[data];

    if (value === undefined) {
      throw new UnauthorizedException(`User ${data} not found`);
    }

    return value;
  },
);
