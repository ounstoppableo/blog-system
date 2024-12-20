import { Component, Input, ViewChild } from '@angular/core';
import { CommentAreaComponent } from '../comment-area/comment-area.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-msg-board',
  templateUrl: './msg-board.component.html',
  styleUrls: ['./msg-board.component.scss'],
  standalone: false,
})
export class MsgBoardComponent {
  @Input()
  isLogin = false;
  @Input()
  articleId = '';
  @ViewChild('commentArea')
  commentArea!: CommentAreaComponent;

  smallSize!: Observable<boolean>;

  reloadMsg() {
    this.commentArea.reload();
  }

  constructor(private store: Store<{ smallSize: boolean }>) {
    this.smallSize = store.select('smallSize');
  }
}
