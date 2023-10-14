import { articleInfo } from '@/types/overview/overview';
import { resType } from '@/types/response/response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class ArticleService {
  constructor(private http: HttpClient) { }
  getArticle(articleId: string): Observable<resType<any>> {
    return this.http.get<resType<any>>(`/api/getArticle/${articleId}`);
  }
  getArticleInfo(articleId: string): Observable<resType<articleInfo>> {
    return this.http.get<resType<articleInfo>>(
      `/api/getArticleInfo/${articleId}`,
    );
  }
  getPreAndNextArticleInfo(articleId: string): Observable<resType<any>> {
    return this.http.get<resType<any>>(`/api/preAndNextArticle/${articleId}`)
  }
}
