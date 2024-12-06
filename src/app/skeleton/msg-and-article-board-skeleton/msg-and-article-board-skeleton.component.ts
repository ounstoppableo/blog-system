import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-msg-and-article-board-skeleton',
    templateUrl: './msg-and-article-board-skeleton.component.html',
    styleUrls: ['./msg-and-article-board-skeleton.component.scss'],
    standalone: false
})
export class MsgAndArticleBoardSkeletonComponent {
  @Input()
  title: any;
  @Input()
  limit = 10;
  generateNumbersArray(count: number): number[] {
    // 生成一个包含指定数量数字的数组
    return Array(count)
      .fill(0)
      .map((_, index) => index);
  }
}
