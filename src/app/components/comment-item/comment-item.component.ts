import { msgItem } from '@/types/msgBorad/msgBorad';
import { cloneDeep } from 'lodash-es';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger,
} from '@angular/animations';
import { BoardMsgService } from '@/app/service/board-msg.service';
import { resType } from '@/types/response/response';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
    selector: 'app-comment-item',
    templateUrl: './comment-item.component.html',
    styleUrls: ['./comment-item.component.scss'],
    animations: [
        trigger('toShow', [
            transition('*=>*', [
                query(':enter', [
                    style({ opacity: 0, transform: 'translateY(-50%)' }),
                    stagger(100, [
                        animate('0.5s', style({ opacity: 1, transform: 'translateY(0)' })),
                    ]),
                ], { optional: true }),
            ]),
        ]),
    ],
    standalone: false
})
export class CommentItemComponent implements OnChanges {
  @Input()
  isLogin = false;
  @Input()
  msgItem: msgItem = {} as msgItem;
  @Output()
  reloadData = new EventEmitter();
  showForm = false;
  showChirdren = false;
  showComponent = false;
  children: msgItem[] = [];
  @Input()
  smallSize = false;

  timer: any = null;

  noToTop = '1970-01-01 08:00:01';

  constructor(
    private boardMsgSerivce: BoardMsgService,
    private message: NzMessageService,
  ) {}

  ngOnChanges(changes: any): void {
    if (changes?.msgItem?.currentValue) {
      this.addChiren(changes.msgItem.currentValue);
      this.checkUpvokeStatus(changes.msgItem.currentValue);
    }
  }
  //从本地缓存取点赞状态
  checkUpvokeStatus(target: any) {
    const upvokeStatus = JSON.parse(
      localStorage.getItem(
        this.msgItem.articleId ? this.msgItem.articleId : 'msgBoard',
      ) as string,
    );
    if (upvokeStatus) {
      const targetUpvokeStatus = upvokeStatus.find(
        (item: any) => item.msgId === target.msgId,
      );
      if (targetUpvokeStatus) {
        target.upvokeChecked = targetUpvokeStatus.checked;
      }
    }
  }

  addChiren(parent: any) {
    if (parent.children) {
      parent.children.forEach((item: any) => {
        const temp = cloneDeep(item);
        temp.children = null;
        this.children.push(temp);
        if (item.children) {
          this.addChiren(item);
        }
      });
    }
  }
  deleteMsg(msgId: any, article: any, isLocal: any) {
    if (isLocal) {
      const msgCache = JSON.parse(
        localStorage.getItem(
          article ? 'msgCacheForArticle' : 'msgCacheForAll',
        ) as any,
      );
      if (msgCache)
        localStorage.setItem(
          article ? 'msgCacheForArticle' : 'msgCacheForAll',
          JSON.stringify(
            msgCache.filter((msgItem: any) => msgItem.msgId !== msgId),
          ),
        );
      this.toReloadData();
      return;
    }
    this.boardMsgSerivce.deleteMsg(msgId, article).subscribe((res) => {
      if (res.code === 200) {
        this.message.success(res.msg as string);
        this.toReloadData();
      }
    });
  }
  auditMsg(msgId: any, article?: string) {
    this.boardMsgSerivce.auditMsg(msgId, article).subscribe((res) => {
      if (res.code === 200) {
        this.message.success(res.msg as string);
        this.toReloadData();
      }
    });
  }
  topMsg(msgId: any, article?: string) {
    if (this.msgItem.toTop === this.noToTop) {
      this.boardMsgSerivce.topMsg(msgId, article).subscribe((res) => {
        if (res.code === 200) {
          this.message.success(res.msg as string);
          this.toReloadData();
        }
      });
    } else {
      this.boardMsgSerivce.cancelTopMsg(msgId, article).subscribe((res) => {
        if (res.code === 200) {
          this.message.success(res.msg as string);
          this.toReloadData();
        }
      });
    }
  }

  toShowForm() {
    this.showForm = !this.showForm;
  }
  toReloadData() {
    this.reloadData.emit();
  }
  toShowChildren() {
    this.showChirdren = !this.showChirdren;
  }
  //点赞功能
  upvoke(msgItem: any) {
    if (this.timer) return this.message.warning('请不要频繁操作！');
    this.timer = setTimeout(() => {
      this.timer = null;
    }, 5000);
    msgItem.upvokeChecked = !msgItem.upvokeChecked;
    const storage = {
      msgId: msgItem.msgId,
      checked: msgItem.upvokeChecked,
    };
    const upvokeStatus = JSON.parse(
      localStorage.getItem(
        msgItem.articleId ? msgItem.articleId : 'msgBoard',
      ) as string,
    );
    if (upvokeStatus) {
      const targetUpvokeStatus = upvokeStatus.find(
        (item: any) => item.msgId === storage.msgId,
      );
      if (targetUpvokeStatus) {
        targetUpvokeStatus.checked = storage.checked;
      } else {
        upvokeStatus.push(storage);
      }
      localStorage.setItem(
        msgItem.articleId ? msgItem.articleId : 'msgBoard',
        JSON.stringify(upvokeStatus),
      );
    } else {
      localStorage.setItem(
        msgItem.articleId ? msgItem.articleId : 'msgBoard',
        JSON.stringify([storage]),
      );
    }
    if (msgItem.articleId) {
      this.boardMsgSerivce
        .upvokeForArticleComment(
          msgItem.articleId,
          msgItem.msgId,
          msgItem.upvokeChecked ? 1 : 0,
        )
        .subscribe((res: resType<any>) => {
          if (res.code === 200) {
            msgItem.upvokeChecked
              ? (msgItem.upvoke += 1)
              : (msgItem.upvoke -= 1);
          }
        });
    } else {
      this.boardMsgSerivce
        .upvokeForBoardComment(msgItem.msgId, msgItem.upvokeChecked ? 1 : 0)
        .subscribe((res: resType<any>) => {
          if (res.code === 200) {
            msgItem.upvokeChecked
              ? (msgItem.upvoke += 1)
              : (msgItem.upvoke -= 1);
          }
        });
    }
  }
}
