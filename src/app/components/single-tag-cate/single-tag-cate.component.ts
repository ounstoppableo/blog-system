import { CategoryService } from '@/app/service/category.service';
import { singleTagMapArticleInfos } from '@/types/category/category';
import { articleInfo } from '@/types/overview/overview';
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
  updateArticleModal!: AddArticleFormComponent
  singleTagMapArticleInfos: singleTagMapArticleInfos = {} as singleTagMapArticleInfos
  constructor(private categoryService: CategoryService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.singleTagMapArticleInfos.tagName = param['tagName']
    })
    this.categoryService.getSingleTagMapArticleInfos(this.singleTagMapArticleInfos.tagName).subscribe((res: resType<singleTagMapArticleInfos>) => {
      if (res.code === 200) this.singleTagMapArticleInfos.articleInfos = res.data?.articleInfos as articleInfo[]
    })
  }
}
