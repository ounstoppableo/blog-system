import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comment-area-skeleton',
  templateUrl: './comment-area-skeleton.component.html',
  styleUrls: ['./comment-area-skeleton.component.scss'],
})
export class CommentAreaSkeletonComponent {
  @Input()
  smallSize!: boolean;
  generateNumbersArray(count: number): number[] {
    // 生成一个包含指定数量数字的数组
    return Array(count)
      .fill(0)
      .map((_, index) => index);
  }
}
