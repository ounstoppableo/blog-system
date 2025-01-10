import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  constructor(private message: NzMessageService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token') || '';
    const copyReq = req.clone({
      setHeaders: {
        token: token,
      },
    });
    return next.handle(copyReq).pipe(
      tap(
        (event: any) => {
          if (event instanceof HttpResponse) {
            if (event.body.code === 401) {
              this.message.warning('token失效');
              localStorage.removeItem('token');
            }
            if (event.body.code >= 400 && event.body.code < 500) {
              return this.message.warning(event.body.msg);
            }
            if (event.body.code === 500) {
              this.message.error('服务器错误');
            }
          }
        },
        (error: any) => {
          console.error(error);
        },
      ),
    );
  }
}
