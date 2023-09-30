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
        (event) => {
          if (event instanceof HttpResponse) {
            if (event.body.code === 401) {
              this.message.error('token失效');
              localStorage.removeItem('token');
            }
          }
        },
        (error) => {
          console.log(error);
        },
      ),
    );
  }
}
