import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { resType } from '@/types/response/response';
import { articleInfo } from '@/types/overview/overview';
import {
  singleFolderMapArticleInfos,
  singleTagMapArticleInfos,
} from '@/types/category/category';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}
  //获取所有文章信息
  getAllArticleInfo(): Observable<resType<articleInfo[]>> {
    return this.http.get<resType<articleInfo[]>>('/api/getArticleInfo');
  }
  //获取文件夹对应的文章数
  getArticleInFolderCount(): Observable<resType<any[]>> {
    return this.http.get<resType<any[]>>('/api/articleInFolderCount');
  }
  //获取单个文件夹对应的文章信息
  getSingleFolderMapArticleInfos(
    folderId: number,
  ): Observable<resType<singleFolderMapArticleInfos>> {
    return this.http.get<resType<singleFolderMapArticleInfos>>(
      `/api/singleFolder/${folderId}`,
    );
  }
  //获取tag对应的文章数
  getArticleInTagCount(): Observable<resType<any[]>> {
    return this.http.get<resType<any[]>>('/api/articleInTagCount');
  }
  //单个标签对应的文章信息页
  getSingleTagMapArticleInfos(
    tagName: string,
  ): Observable<resType<singleTagMapArticleInfos>> {
    return this.http.get<resType<singleTagMapArticleInfos>>(
      `/api/singleTag/${tagName}`,
    );
  }
}
