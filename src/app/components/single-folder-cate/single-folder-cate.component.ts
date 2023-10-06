import { CategoryService } from '@/app/service/category.service';
import { singleFolderMapArticleInfos } from '@/types/category/category';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddArticleFormComponent } from '../add-article-form/add-article-form.component';

@Component({
  selector: 'app-single-folder-cate',
  templateUrl: './single-folder-cate.component.html',
  styleUrls: ['./single-folder-cate.component.scss'],
})
export class SingleFolderCateComponent implements OnInit {
  @Input()
  smallSize!: boolean;
  @Input()
  updateArticleModal!: AddArticleFormComponent
  singleFolderMapArticleInfos: singleFolderMapArticleInfos = {} as singleFolderMapArticleInfos
  constructor(private categoryService: CategoryService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.categoryService.getSingleFolderMapArticleInfos(param['folderId']).subscribe(res => {
        if (res.code === 200) this.singleFolderMapArticleInfos = res.data as singleFolderMapArticleInfos
      })
    })

  }
}
