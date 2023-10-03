import { ArticleService } from '@/app/service/article.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-context',
  templateUrl: './context.component.html',
  styleUrls: ['./context.component.scss'],
})
export class ContextComponent implements OnInit {
  article = '';
  articleId = '';
  @Input()
  smallSize!: boolean;
  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit() {
    this.route.params.subscribe((res) => (this.articleId = res['articleId']));
    this.articleService.getArticle(this.articleId).subscribe((res) => {
      if (res.code === 200) this.article = res.data.articleContent;
    });
  }
}
