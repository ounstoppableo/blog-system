import { CategoryService } from '@/app/service/category.service';
import { singleTagMapArticleInfos } from '@/types/category/category';
import { resType } from '@/types/response/response';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddArticleFormComponent } from '../add-article-form/add-article-form.component';

@Component({
  selector: 'app-single-tag-cate',
  templateUrl: './single-tag-cate.component.html',
  styleUrls: ['./single-tag-cate.component.scss'],
})
export class SingleTagCateComponent implements OnInit {
  @Input()
  smallSize!: boolean;
  @Input()
  updateArticleModal!: AddArticleFormComponent;
  singleTagMapArticleInfos: singleTagMapArticleInfos =
    {} as singleTagMapArticleInfos;

  page = 1;
  limit = 5;
  total = 0;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.singleTagMapArticleInfos.tagName = param['tagName'];
      this.getArticleInfo(this.page, this.limit);
    });
  }
  getArticleInfo(page: number, limit: number) {
    this.categoryService
      .getSingleTagMapArticleInfos(
        this.singleTagMapArticleInfos.tagName,
        page,
        limit,
      )
      .subscribe((res: resType<singleTagMapArticleInfos>) => {
        if (res.code === 200) {
          this.singleTagMapArticleInfos = res.data as singleTagMapArticleInfos;
          this.total = this.singleTagMapArticleInfos.total;
        }
      });
  }

  nextPage(page: number) {
    this.page = page;
    this.getArticleInfo(this.page, this.limit);
  }
}
