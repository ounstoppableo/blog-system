import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cate-by-date-skeleton',
  templateUrl: './cate-by-date-skeleton.component.html',
  styleUrls: ['./cate-by-date-skeleton.component.scss'],
  standalone: false,
})
export class CateByDateSkeletonComponent {
  smallSize!: Observable<boolean>;
  generateNumbersArray(count: number): number[] {
    // 生成一个包含指定数量数字的数组
    return Array(count)
      .fill(0)
      .map((_, index) => index);
  }
  constructor(private store: Store<{ smallSize: boolean }>) {
    this.smallSize = store.select('smallSize');
  }
}
