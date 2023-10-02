import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HomeService {
  constructor(private http: HttpClient) {}
  getFolderCategory() {
    return this.http.get('/api/folder');
  }
  uploadArticle(data: any) {
    return this.http.post('/api/addArticle', { ...data });
  }
  delFile(url: string) {
    return this.http.delete('/api/delFile', { body: { url } });
  }
  getTags() {
    return this.http.get('/api/getTags');
  }
  getArticleInfo() {
    return this.http.get('/api/getArticleInfo');
  }
}
