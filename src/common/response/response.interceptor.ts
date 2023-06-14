import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { KnittingResponse } from './knitting.response';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, KnittingResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<KnittingResponse<T>> {
    return next.handle().pipe(map((data) => KnittingResponse.of(data)));
  }
}
