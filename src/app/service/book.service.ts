import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { resType } from '@/types/response/response';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}
  addBook(param: {
    bookUrl: string;
    bookFrontPicUrl: string;
    bookBackPicUrl: string;
  }): Observable<resType<any>> {
    return this.http.post<resType<any>>('/api/addBook', param);
  }
  getBooks(limit: number): Observable<resType<any>> {
    return this.http.get<resType<any>>(`/api/getBooks?limit=${limit}`);
  }
  deleteBook(bookUrl: string): Observable<resType<any>> {
    return this.http.delete<resType<any>>('/api/deleteBook', {
      body: {
        bookUrl,
      },
    });
  }
}
