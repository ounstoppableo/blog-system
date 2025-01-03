import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { resType } from '@/types/response/response';

@Injectable({
  providedIn: 'root',
})
export class FriendService {
  constructor(private http: HttpClient) {}
  getFriendList(limit: number, page: number): Observable<resType<any>> {
    return this.http.get<resType<any>>(
      `/api/getFriendList?limit=${limit}&page=${page}`,
    );
  }
  addFriend(param: {
    name: string;
    website: string;
    cover: string;
    brief: string;
  }): Observable<resType<any>> {
    return this.http.post<resType<any>>('/api/addFriend', param);
  }
  auditFriend(website: string): Observable<resType<any>> {
    return this.http.post<resType<any>>(`/api/auditFriend`, { website });
  }
  deleteFriend(website: string): Observable<resType<any>> {
    return this.http.delete<resType<any>>(`/api/deleteFriend`, {
      body: { website },
    });
  }
}
