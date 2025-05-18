import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppResponse } from '../response/app-response';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, AppResponse<T>>
{
  intercept(
    context: ExecutionContext, 
    next: CallHandler,
  ): Observable<AppResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        return AppResponse.success('Request successful', data);
      }),
    );
  }
}
