import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddArticleFormComponent } from '../add-article-form/add-article-form.component';
import { articleInfo } from '@/types/overview/overview';
import { HomeService } from '@/app/service/home.service';
import { resType } from '@/types/response/response';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  standalone: false,
})
export class ContainerComponent implements OnInit {
  articleInfoList: articleInfo[] = [];
  catalogue: any[] = [];
  smallSize: Observable<boolean>;
  @Input()
  showInfo: boolean = true;
  @Input()
  isLogin = false;
  @Input()
  updateArticleModal!: AddArticleFormComponent;
  @Input()
  dateCate = false;
  @Input()
  isMsgBoard = false;
  @Input()
  isHome = false;
  @Input()
  isArticle = false;
  @Input()
  folderCate = false;
  @Input()
  tagCate = false;
  @Input()
  tagPage = false;
  @Input()
  folderPage = false;
  @Input()
  search = false;
  @Input()
  msgboard = false;
  @Input()
  scrollTarget = 0;
  @Output()
  getCatalogue = new EventEmitter();
  @Output()
  getWordsCountAndReadTime = new EventEmitter();
  @Output()
  scrollToAnchor = new EventEmitter();
  page = 1;
  limit = 10;
  total = 0;

  constructor(
    private routes: ActivatedRoute,
    private homeService: HomeService,
    private store: Store<{ smallSize: boolean }>,
  ) {
    this.smallSize = store.select('smallSize');
  }
  ngOnInit() {
    if (this.isHome) {
      this.limit = 5;
      this.getArticleInfo(this.page, this.limit);
    }
  }

  getArticleInfo(page: number, limit: number) {
    return new Promise((resolve) => {
      this.homeService
        .getArticleInfoByPage(page, limit)
        .subscribe((res: resType<any>) => {
          resolve(1);
          if (res.code === 200) {
            this.articleInfoList = res.data.articleInfoList as articleInfo[];
            this.total = res.data.total;
          }
        });
    });
  }
  nextPage(param: any) {
    this.page = param.page;
    const resolve = param.resolve;
    this.getArticleInfo(this.page, this.limit).then(() => {
      if (resolve) resolve(1);
    });
  }
  _getCatalogue($event: any) {
    this.catalogue = $event;
  }
}
