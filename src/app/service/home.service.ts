import { folderItem, tag } from '@/types/home/home';
import { articleInfo } from '@/types/overview/overview';
import { resType } from '@/types/response/response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HomeService {
  constructor(private http: HttpClient) { }
  getFolderCategory(): Observable<resType<folderItem[]>> {
    return this.http.get<resType<any>>('/api/folder');
  }
  uploadArticle(data: any): Observable<resType<any>> {
    return this.http.post<resType<any>>('/api/addArticle', { ...data });
  }
  delFile(url: string): Observable<resType<any>> {
    return this.http.delete<resType<any>>('/api/delFile', { body: { url } });
  }
  getTags(): Observable<resType<tag[]>> {
    return this.http.get<resType<any>>('/api/getTags');
  }
  getArticleInfo(): Observable<resType<articleInfo[]>> {
    return this.http.get<resType<any>>('/api/getArticleInfo');
  }
}
