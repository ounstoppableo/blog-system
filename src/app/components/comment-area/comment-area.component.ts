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
})
export class CommentAreaComponent implements OnInit {
  @Input()
  articleId = '';
  show = false;
  loading = false;
  msgItems: msgItem[] = [];
  @Input()
  smallSize=false
  //判断是不是留言板页面
  isMsgBoard = false;
  msgCount = 0;
  //分页器数据
  page = 1;
  limit = 5;
  total = 0;
  constructor(
    private addMsgService: BoardMsgService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.route.url.subscribe((res) => {
      this.isMsgBoard = res[0].path === 'msgboard' ? true : false;
      this.getMsgItems(this.page, this.limit);
    });
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
            this.total = res.data.pages * limit;
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
            this.total = res.data.pages * limit;
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
