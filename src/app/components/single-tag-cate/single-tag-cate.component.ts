import { CategoryService } from '@/app/service/category.service';
import { singleTagMapArticleInfos } from '@/types/category/category';
import { resType } from '@/types/response/response';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddArticleFormComponent } from '../add-article-form/add-article-form.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-single-tag-cate',
  templateUrl: './single-tag-cate.component.html',
  styleUrls: ['./single-tag-cate.component.scss'],
  standalone: false,
})
export class SingleTagCateComponent implements OnInit {
  @Input()
  isLogin = false;
  @Input()
  smallSize!: Observable<boolean>;
  @Input()
  updateArticleModal!: AddArticleFormComponent;
  singleTagMapArticleInfos: singleTagMapArticleInfos =
    {} as singleTagMapArticleInfos;
  loading = true;

  page = 1;
  limit = 7;
  total = 0;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private store: Store<{ smallSize: boolean }>,
  ) {
    this.smallSize = store.select('smallSize');
  }
  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.singleTagMapArticleInfos.tagName = param['tagName'];
      this.getArticleInfo(this.page, this.limit);
    });
  }
  getArticleInfo(page: number, limit: number) {
    return new Promise((resolve) => {
      this.loading = true;
      this.categoryService
        .getSingleTagMapArticleInfos(
          this.singleTagMapArticleInfos.tagName,
          page,
          limit,
        )
        .subscribe((res: resType<singleTagMapArticleInfos>) => {
          resolve(1);
          this.loading = false;
          if (res.code === 200) {
            this.singleTagMapArticleInfos =
              res.data as singleTagMapArticleInfos;
            this.total = this.singleTagMapArticleInfos.total;
          }
        });
    });
  }

  nextPage(param: any) {
    this.page = param.page;
    const resolve = param.resolve;
    this.getArticleInfo(this.page, this.limit).then(() => {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      if (resolve) resolve(1);
    });
  }
}
