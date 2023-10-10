import { msgItem } from '@/types/msgBorad/msgBorad';
import * as lodash from 'lodash';
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

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
  animations: [
    trigger('toShow', [
      transition('*=>*', [
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
export class CommentItemComponent implements OnChanges {
  @Input()
  msgItem: msgItem = {} as msgItem;
  @Output()
  reloadData = new EventEmitter();
  showForm = false;
  showChirdren = false;
  showComponent = false;
  children: msgItem[] = [];

  constructor(private boardMsgSerivce: BoardMsgService) {}

  ngOnChanges(changes: any): void {
    if (changes.msgItem.currentValue) {
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
        const temp = lodash.cloneDeep(item);
        temp.children = null;
        this.children.push(temp);
        if (item.children) {
          this.addChiren(item);
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
    msgItem.upvokeChecked = !msgItem.upvokeChecked;
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
  }
}
