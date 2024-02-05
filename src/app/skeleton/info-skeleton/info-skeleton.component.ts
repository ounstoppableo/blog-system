import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-skeleton',
  templateUrl: './info-skeleton.component.html',
  styleUrls: ['./info-skeleton.component.scss']
})
export class InfoSkeletonComponent {
  @Input()
  smallSize!: boolean;
  generateNumbersArray(count: number): number[] {
    // 生成一个包含指定数量数字的数组
    return Array(count).fill(0).map((_, index) => index);
  }
}
