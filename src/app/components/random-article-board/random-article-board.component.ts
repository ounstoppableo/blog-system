import { ArticleService } from '@/app/service/article.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-random-article-board',
  templateUrl: './random-article-board.component.html',
  styleUrls: ['./random-article-board.component.scss'],
  standalone: false,
})
export class RandomArticleBoardComponent implements OnInit, OnDestroy {
  articleList: any[] = [];
  @Input()
  limit = 10;
  subscriptionList: any[] = [];
  constructor(private articleService: ArticleService) {}
  ngOnInit() {
    this.subscriptionList.push(
      this.articleService.getRandomArticle(this.limit).subscribe((res) => {
        if (res.code === 200) this.articleList = res.data;
      }),
    );
  }
  generateNumbersArray(count: number): number[] {
    // 生成一个包含指定数量数字的数组
    return Array(count)
      .fill(0)
      .map((_, index) => index);
  }
  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscripion) => {
      subscripion.unsubscribe();
    });
  }
}
