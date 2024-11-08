import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

type resType = { code: number; msg: string; data?: any };

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}
  getWeatherByLocation(location: string): Observable<resType> {
    return this.http.get<resType>(`/api/weather?location=${location}`);
  }
}
