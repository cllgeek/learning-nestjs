import { ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformResInterceptor implements NestInterceptor { // 实现NestInterceptor接口
  intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Observable<any> {
    const controller = context.getClass().name; // 取得controller name
    const handler = context.getHandler().name; // 取得method name

    return call$.pipe(
      map(data => // 原response內容
        ({ // 改变response內容
          controller,
          handler,
          data,
        })),
    );
  }
}