import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-article-content-skeleton',
  templateUrl: './article-content-skeleton.component.html',
  styleUrls: ['./article-content-skeleton.component.scss'],
  standalone: false,
})
export class ArticleContentSkeletonComponent implements OnInit {
  smallSize!: Observable<boolean>;
  widths: number[] = [];
  generateNumbersArray(count: number): number[] {
    // 生成一个包含指定数量数字的数组
    return Array(count)
      .fill(0)
      .map((_, index) => index);
  }
  randomNumber() {
    return Math.floor(Math.random() * 20) + 60;
  }
  ngOnInit(): void {
    for (let i = 0; i < 40; i++) {
      this.widths.push(this.randomNumber());
    }
  }
  constructor(private store: Store<{ smallSize: boolean }>) {
    this.smallSize = store.select('smallSize');
  }
}
