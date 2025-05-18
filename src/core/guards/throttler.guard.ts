import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ExecutionContext } from '@nestjs/common';

@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {
  protected async getTracker(req: Record<string, any>): Promise<string> {
    return req.ips.length ? req.ips[0] : req.ip;
  }

  protected getRequestResponse(context: ExecutionContext) {
    const http = context.switchToHttp();
    return { req: http.getRequest(), res: http.getResponse() };
  }
}
