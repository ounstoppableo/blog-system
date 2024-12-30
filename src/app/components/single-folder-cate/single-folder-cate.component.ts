import { CategoryService } from '@/app/service/category.service';
import { singleFolderMapArticleInfos } from '@/types/category/category';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddArticleFormComponent } from '../add-article-form/add-article-form.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-single-folder-cate',
  templateUrl: './single-folder-cate.component.html',
  styleUrls: ['./single-folder-cate.component.scss'],
  standalone: false,
})
export class SingleFolderCateComponent implements OnInit {
  smallSize!: Observable<boolean>;
  @Input()
  isLogin = false;
  @Input()
  updateArticleModal!: AddArticleFormComponent;
  singleFolderMapArticleInfos: singleFolderMapArticleInfos =
    {} as singleFolderMapArticleInfos;
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
    this.getArticleInfos(this.page, this.limit);
  }
  getArticleInfos(page: number, limit: number) {
    return new Promise((resolve) => {
      this.loading = true;
      this.route.params.subscribe((param) => {
        this.categoryService
          .getSingleFolderMapArticleInfos(param['folderId'], page, limit)
          .subscribe((res) => {
            resolve(1);
            this.loading = false;
            if (res.code === 200) {
              this.singleFolderMapArticleInfos =
                res.data as singleFolderMapArticleInfos;
              this.total = this.singleFolderMapArticleInfos.total;
            }
          });
      });
    });
  }
  nextPage(param: any) {
    this.page = param.page;
    const resolve = param.resolve;
    this.getArticleInfos(this.page, this.limit).then(() => {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      if (resolve) resolve(1);
    });
  }
}
