import { addMsg } from '@/types/msgBorad/msgBorad';
import { resType } from '@/types/response/response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardMsgService {
  constructor(private http: HttpClient) { }
  addMsgForArticle(data: addMsg): Observable<resType<addMsg>> {
    return this.http.post<resType<addMsg>>('/api/addMsgForArticle', data);
  }
  getMsgForArticle(
    articleId: string,
    page?: number,
    limit?: number,
  ): Observable<resType<any>> {
    if ((page && page < 0) || (limit && limit < 0))
      throw new Error('page和limit不能小于0');
    const _page = page ? page : 1;
    const _limit = limit ? limit : 5;
    return this.http.get<resType<any>>(
      `/api/getMsgForArticle/${articleId}/${_page}/${_limit}`,
    );
  }
  addMsgForBoard(data: addMsg): Observable<resType<addMsg>> {
    return this.http.post<resType<addMsg>>('/api/addMsgForBoard', data);
  }
  getMsgForBoard(page?: number, limit?: number): Observable<resType<any>> {
    if ((page && page < 0) || (limit && limit < 0))
      throw new Error('page和limit不能小于0');
    const _page = page ? page : 1;
    const _limit = limit ? limit : 5;
    return this.http.get<resType<any>>(
      `/api/getMsgForBoard/${_page}/${_limit}`,
    );
  }
  //文章评论点赞功能
  upvokeForArticleComment(articleId: string, msgId: string, checked: 0 | 1): Observable<resType<any>> {
    return this.http.get<resType<any>>(`/api/upvokeForArticle/${articleId}/${msgId}/${checked}`)
  }
  //留言板评论点赞功能
  upvokeForBoardComment( msgId: string, checked: 0 | 1): Observable<resType<any>> {
    return this.http.get<resType<any>>(`/api/upvokeForBoard/${msgId}/${checked}`)
  }
}
