import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cate-by-date-skeleton',
  templateUrl: './cate-by-date-skeleton.component.html',
  styleUrls: ['./cate-by-date-skeleton.component.scss'],
})
export class CateByDateSkeletonComponent {
  @Input()
  smallSize!: boolean;
  generateNumbersArray(count: number): number[] {
    // 生成一个包含指定数量数字的数组
    return Array(count)
      .fill(0)
      .map((_, index) => index);
  }
}
