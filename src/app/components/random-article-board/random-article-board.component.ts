import { ArticleService } from '@/app/service/article.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-random-article-board',
  templateUrl: './random-article-board.component.html',
  styleUrls: ['./random-article-board.component.scss'],
})
export class RandomArticleBoardComponent implements OnInit {
  articleList: any[] = [];
  @Input()
  limit = 10;
  constructor(private articleService: ArticleService) {}
  ngOnInit() {
    this.articleService.getRandomArticle(this.limit).subscribe((res) => {
      if (res.code === 200) this.articleList = res.data;
    });
  }
  generateNumbersArray(count: number): number[] {
    // 生成一个包含指定数量数字的数组
    return Array(count)
      .fill(0)
      .map((_, index) => index);
  }
}
