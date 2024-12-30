import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cate-by-tag-skeleton',
  templateUrl: './cate-by-tag-skeleton.component.html',
  styleUrls: ['./cate-by-tag-skeleton.component.scss'],
  standalone: false,
})
export class CateByTagSkeletonComponent implements OnInit {
  smallSize!: Observable<boolean>;
  widths: number[] = [];
  generateNumbersArray(count: number): number[] {
    // 生成一个包含指定数量数字的数组
    return Array(count)
      .fill(0)
      .map((_, index) => index);
  }
  ngOnInit(): void {
    for (let i = 0; i < 20; i++) {
      this.widths.push(this.randomNumber());
    }
  }
  randomNumber() {
    return Math.floor(Math.random() * 60) + 40;
  }
  constructor(private store: Store<{ smallSize: boolean }>) {
    this.smallSize = store.select('smallSize');
  }
}
