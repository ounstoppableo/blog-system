import { ArticleService } from '@/app/service/article.service';
import { Component, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AddArticleFormComponent } from '../add-article-form/add-article-form.component';
import { OverviewComponent } from '../overview/overview.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: false,
})
export class SearchComponent implements OnInit, OnDestroy {
  isLogin: Observable<boolean>;
  @Input()
  dontShowGpuRenderComponent: boolean = false;
  @Input()
  smallSize!: Observable<boolean>;
  @Input()
  updateArticleModal!: AddArticleFormComponent;
  @ViewChild(OverviewComponent) overviewComponent:
    | OverviewComponent
    | undefined = undefined;

  searchText = '';
  page = 1;
  limit = 5;
  total = 0;
  articleInfoList = [];
  timer: any = undefined;
  subscriptionList: any[] = [];
  constructor(
    private router: Router,
    private articleService: ArticleService,
    private store: Store<{ smallSize: boolean; isLogin: boolean }>,
  ) {
    this.smallSize = store.select('smallSize');
    this.isLogin = store.select('isLogin');
  }
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
  nextPage(param: any) {
    this.page = param.page;
    const resolve = param.resolve;
    this.getArticleInfos().then(() => {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      if (resolve) resolve(1);
    });
  }
  getArticleInfos() {
    return new Promise((resolve) => {
      this.subscriptionList.push(
        this.articleService
          .searchArticle(this.searchText, this.page, this.limit)
          .subscribe((res) => {
            resolve(1);
            if (res.code === 200) {
              this.articleInfoList = res.data.articleInfoList;
              this.total = res.data.total;
            }
          }),
      );
    });
  }
  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscripion) => {
      subscripion.unsubscribe();
    });
  }
}
