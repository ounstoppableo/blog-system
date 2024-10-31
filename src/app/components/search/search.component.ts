import { ArticleService } from '@/app/service/article.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddArticleFormComponent } from '../add-article-form/add-article-form.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input()
  smallSize!: boolean;
  @Input()
  updateArticleModal!: AddArticleFormComponent;

  searchText = '';
  page = 1;
  limit = 5;
  total = 0;
  articleInfoList = [];
  timer: number | undefined = undefined;
  constructor(
    private router: Router,
    private articleService: ArticleService,
  ) {}
  ngOnInit(): void {}
  goHome() {
    this.router.navigate(['home']);
  }
  search() {
    this.page = 1;
    this.limit = 5;
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.getArticleInfos();
      clearTimeout(this.timer);
      this.timer = undefined;
    }, 200);
  }
  nextPage(page: number) {
    this.page = page;
    this.getArticleInfos().then(() => {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }
  getArticleInfos() {
    return new Promise((resolve) => {
      this.articleService
        .searchArticle(this.searchText, this.page, this.limit)
        .subscribe((res) => {
          resolve(1);
          if (res.code === 200) {
            this.articleInfoList = res.data.articleInfoList;
            this.total = res.data.total;
          }
        });
    });
  }
}
