import { folderItem, tag } from '@/types/home/home';
import { articleInfo } from '@/types/overview/overview';
import { resType } from '@/types/response/response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HomeService {
  constructor(private http: HttpClient) {}
  //获取文章分类
  getFolderCategory(): Observable<resType<folderItem[]>> {
    return this.http.get<resType<any>>('/api/folder');
  }
  //更新文章
  uploadArticle(data: any): Observable<resType<any>> {
    return this.http.post<resType<any>>('/api/addArticle', { ...data });
  }
  //删除文件
  delFile(url: string): Observable<resType<any>> {
    return this.http.delete<resType<any>>('/api/delFile', { body: { url } });
  }
  //获取标签
  getTags(): Observable<resType<tag[]>> {
    return this.http.get<resType<any>>('/api/getTags');
  }
  //获取文章信息
  getArticleInfo(): Observable<resType<articleInfo[]>> {
    return this.http.get<resType<any>>('/api/getArticleInfo');
  }
  //更新文章
  updateArticleInfo(articleInfo: any): Observable<resType<any>> {
    return this.http.post<resType<any>>('/api/updateArticle', articleInfo);
  }
  //删除文章
  delArticle(articleId: string): Observable<resType<any>> {
    return this.http.get<resType<any>>(`/api/delArticle/${articleId}`);
  }
  //根据页数获取文章信息
  getArticleInfoByPage(
    page?: number,
    limit?: number,
  ): Observable<resType<articleInfo[]>> {
    const _page = page && page > 0 ? page : 1;
    const _limit = limit && limit > 0 ? limit : 5;
    return this.http.get<resType<any>>(
      `/api/getArticleInfoByPage/${_page}/${_limit}`,
    );
  }
}
