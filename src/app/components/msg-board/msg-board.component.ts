import { Component, Input, ViewChild } from '@angular/core';
import { CommentAreaComponent } from '../comment-area/comment-area.component';

@Component({
  selector: 'app-msg-board',
  templateUrl: './msg-board.component.html',
  styleUrls: ['./msg-board.component.scss'],
})
export class MsgBoardComponent {
  @Input()
  articleId = '';
  @ViewChild('commentArea')
  commentArea!: CommentAreaComponent;
  @Input()
  smallSize!: boolean;

  reloadMsg() {
    this.commentArea.reload();
  }

  constructor() {}
}
