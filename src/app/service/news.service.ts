import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

type resType = { code: number; msg: string; result: any };
@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}
  getNews(): Observable<resType> {
    return this.http.get<resType>(
      'https://apis.tianapi.com/internet/index?key=b03dbfb167da973f5ba36abeee462571&num=10 ',
    );
  }
}
