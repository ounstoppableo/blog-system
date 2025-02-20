import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

type resType = {
  code: number;
  msg: string;
  data?: any;
};
@Injectable({
  providedIn: 'root',
})
export class TreeHoleService {
  constructor(private http: HttpClient) {}
  sendMsg(msg: string): Observable<resType> {
    return this.http.post<resType>('/api/sendMsgInTreeHole', { msg });
  }
  getMsgs(): Observable<resType> {
    return this.http.get<resType>('/api/getMsgFromTreeHole');
  }
}
