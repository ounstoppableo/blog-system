import { addMsg } from '@/types/msgBorad/msgBorad';
import { resType } from '@/types/response/response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardMsgService {
  constructor(private http: HttpClient) {}
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
  upvokeForArticleComment(
    articleId: string,
    msgId: string,
    checked: 0 | 1,
  ): Observable<resType<any>> {
    return this.http.get<resType<any>>(
      `/api/upvokeForArticle/${articleId}/${msgId}/${checked}`,
    );
  }
  //留言板评论点赞功能
  upvokeForBoardComment(
    msgId: string,
    checked: 0 | 1,
  ): Observable<resType<any>> {
    return this.http.get<resType<any>>(
      `/api/upvokeForBoard/${msgId}/${checked}`,
    );
  }
  //删除评论
  deleteMsg(msgId: number, articleId?: string): Observable<resType<any>> {
    if (articleId) {
      return this.http.delete<resType<any>>(`/api/deleteMsgForArticle`, {
        body: { msgId },
      });
    }
    return this.http.delete<resType<any>>(`/api/deleteMsgForBoard`, {
      body: { msgId },
    });
  }
  //审核评论
  auditMsg(msgId: number, articleId?: string): Observable<resType<any>> {
    if (articleId) {
      return this.http.get<resType<any>>(
        `/api/auditMsgForArticle/${msgId}`,
        {},
      );
    }
    return this.http.get<resType<any>>(`/api/auditMsgForBoard/${msgId}`, {});
  }
  //置顶评论
  topMsg(msgId: number, articleId?: string): Observable<resType<any>> {
    if (articleId) {
      return this.http.get<resType<any>>(`/api/topMsgForArticle/${msgId}`, {});
    }
    return this.http.get<resType<any>>(`/api/topMsgForBoard/${msgId}`, {});
  }
  //取消置顶
  cancelTopMsg(msgId: number, articleId?: string): Observable<resType<any>> {
    if (articleId) {
      return this.http.get<resType<any>>(
        `/api/cancelTopMsgForArticle/${msgId}`,
        {},
      );
    }
    return this.http.get<resType<any>>(
      `/api/cancelTopMsgForBoard/${msgId}`,
      {},
    );
  }
}
