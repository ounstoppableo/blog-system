import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {

  }
  login(username: string, password: string) {
    return this.http.post('api/login', { username, password })
  }
  getUserInfo() {
    return this.http.get('api/userinfo')
  }
}
