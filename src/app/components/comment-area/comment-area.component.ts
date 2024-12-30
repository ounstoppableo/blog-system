import { Component, Input, OnInit } from '@angular/core';
import { BoardMsgService } from '@/app/service/board-msg.service';
import { resType } from '@/types/response/response';
import { msgItem } from '@/types/msgBorad/msgBorad';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger,
} from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import dayjs from 'dayjs';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-comment-area',
  templateUrl: './comment-area.component.html',
  styleUrls: ['./comment-area.component.scss'],
  animations: [
    trigger('toShow', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-50%)' }),
            stagger(100, [
              animate(
                '0.5s',
                style({ opacity: 1, transform: 'translateY(0)' }),
              ),
            ]),
          ],
          { optional: true },
        ),
      ]),
    ]),
  ],
  standalone: false,
})
export class CommentAreaComponent implements OnInit {
  isLogin: Observable<boolean>;
  @Input()
  articleId = '';
  show = false;
  loading = false;
  msgItems: msgItem[] = [];

  smallSize: Observable<boolean>;
  //判断是不是留言板页面
  isMsgBoard = false;
  msgCount = 0;
  //分页器数据
  page = 1;
  limit = 5;
  constructor(
    private addMsgService: BoardMsgService,
    private route: ActivatedRoute,
    private store: Store<{ smallSize: boolean; isLogin: boolean }>,
  ) {
    this.smallSize = store.select('smallSize');
    this.isLogin = store.select('isLogin');
  }
  ngOnInit(): void {
    this.route.url.subscribe((res) => {
      this.isMsgBoard = res[0].path === 'msgboard' ? true : false;
      this.getMsgItems(this.page, this.limit);
    });
  }
  getMsgByLocal(store: 'msgCacheForAll' | 'msgCacheForArticle') {
    const msgCache = JSON.parse(localStorage.getItem(store) as any);
    let count = 0;
    msgCache?.forEach((item: msgItem) => {
      if (!this.articleId || this.articleId === item.articleId)
        if (item.fatherMsgId) {
          const fatherMsg = this.msgItems.find(
            (msgItem) => msgItem.msgId === item.fatherMsgId,
          );
          if (
            fatherMsg?.children?.findIndex(
              (msgItem) => msgItem.msgId === item.msgId,
            ) === -1
          ) {
            fatherMsg.children.push(item);
            fatherMsg.children.sort(
              (a, b) => dayjs(b.subTime).unix() - dayjs(a.subTime).unix(),
            );
            fatherMsg.children.sort(
              (a, b) => dayjs(b.toTop).unix() - dayjs(a.toTop).unix(),
            );
            count++;
          }
          if (!fatherMsg?.children) {
            (fatherMsg as any).children = [item];
          }
        } else {
          if (
            this.msgItems?.findIndex(
              (msgItem) => msgItem.msgId === item.msgId,
            ) === -1
          ) {
            this.msgItems.push(item);
            this.msgItems.sort(
              (a, b) => dayjs(b.subTime).unix() - dayjs(a.subTime).unix(),
            );
            this.msgItems.sort(
              (a, b) => dayjs(b.toTop).unix() - dayjs(a.toTop).unix(),
            );
            count++;
          }
        }
    });
    this.msgCount += count;
  }
  getMsgItems(page: number, limit: number) {
    this.show = false;
    this.loading = true;
    if (this.isMsgBoard) {
      this.addMsgService
        .getMsgForBoard(page, limit)
        .subscribe((res: resType<any>) => {
          if (res.code === 200) {
            this.msgItems = res.data.msgData as msgItem[];
            this.msgCount = res.data.msgCount;
            this.getMsgByLocal('msgCacheForAll');
            this.loading = false;
            this.show = true;
          }
        });
    } else {
      this.addMsgService
        .getMsgForArticle(this.articleId, page, limit)
        .subscribe((res: resType<any>) => {
          if (res.code === 200) {
            this.msgItems = res.data.msgData as msgItem[];
            this.msgCount = res.data.msgCount;
            this.getMsgByLocal('msgCacheForArticle');
            this.loading = false;
            this.show = true;
          }
        });
    }
  }
  //页码改变的回调
  pageIndexChange(page: number) {
    this.page = page;
    this.getMsgItems(this.page, this.limit);
  }
  reload() {
    this.getMsgItems(this.page, this.limit);
  }
}
