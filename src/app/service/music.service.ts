import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

type resType = { code: number; msg: string; result?: any };
@Injectable({
  providedIn: 'root',
})
export class MusicService {
  constructor(private http: HttpClient) {}
  deleteMusic(path: string): Observable<resType> {
    return this.http.get<resType>(`/api/deleteMusic/${path}`);
  }
  deleteLyric(path: string): Observable<resType> {
    return this.http.get<resType>(`/api/deleteLyric/${path}`);
  }
  addMusicInfo(param: any) {
    return this.http.post<resType>(`/api/addMusic`, param);
  }
  getMusicInfo() {
    return this.http.get<resType>(`/api/getMusicInfo`);
  }
}
