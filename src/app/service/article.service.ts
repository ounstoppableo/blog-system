import { resType } from "@/types/response/response";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
@Injectable({ providedIn: 'root' })
export class ArticleService {
  constructor(private http: HttpClient) { }
  getArticle(articleId: string) {
    return this.http.get<resType<any>>(`/api/getArticle/${articleId}`)
  }
  getArticleInfo(articleId: string) {
    return this.http.get<resType<any>>(`/api/getArticleInfo/${articleId}`)
  }
}
