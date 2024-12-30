import { BoardMsgService } from '@/app/service/board-msg.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-new-msg-board',
    templateUrl: './new-msg-board.component.html',
    styleUrls: ['./new-msg-board.component.scss'],
    standalone: false
})
export class NewMsgBoardComponent implements OnInit {
  msgList: any[] = [];
  msgListLength = 0;
  @Input()
  limit = 10;
  constructor(
    private boardMsgService: BoardMsgService,
    private router: Router,
  ) {}
  ngOnInit() {
    this.boardMsgService.getNewMsg(this.limit).subscribe((res) => {
      if (res.code === 200) this.msgList = res.data;
    });
  }
  generateNumbersArray(count: number): number[] {
    // 生成一个包含指定数量数字的数组
    return Array(count)
      .fill(0)
      .map((_, index) => index);
  }
  handelMsgJump(e: any, msgInfo: any) {
    e.preventDefault();
    const articleId = msgInfo.articleId;
    if (articleId) {
      this.router.navigate(['article', articleId]);
    } else {
      this.router.navigate(['msgboard']);
    }
  }
}
