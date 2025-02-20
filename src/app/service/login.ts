import { resType } from '@/types/response/response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  login(code: string): Observable<resType<any>> {
    return this.http.post<resType<any>>('api/login', { code });
  }
  getUserInfo(): Observable<resType<any>> {
    return this.http.get<resType<any>>('api/userinfo');
  }
}
