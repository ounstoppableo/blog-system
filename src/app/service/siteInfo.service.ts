import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

type resType = { code: number; VT?: any };
@Injectable({
  providedIn: 'root',
})
export class SiteInfoService {
  constructor(private http: HttpClient) {}
  getVT(): Observable<resType> {
    return this.http.get<resType>('/api/viewTimes');
  }
}
