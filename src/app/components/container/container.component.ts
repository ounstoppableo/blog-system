import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddArticleFormComponent } from '../add-article-form/add-article-form.component';
import { articleInfo } from '@/types/overview/overview';
import { HomeService } from '@/app/service/home.service';
import { resType } from '@/types/response/response';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
  articleInfoList: articleInfo[] = [];
  @Input()
  showInfo!: boolean;
  @Input()
  smallSize!: boolean;
  @Input()
  updateArticleModal!: AddArticleFormComponent;
  @Input()
  dateCate = false;
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

  constructor(
    private routes: ActivatedRoute,
    private homeService: HomeService,
  ) {}
  ngOnInit() {
    if (this.isHome) {
      this.homeService
        .getArticleInfo()
        .subscribe((res: resType<articleInfo[]>) => {
          if (res.code === 200)
            this.articleInfoList = res.data as articleInfo[];
        });
    }
  }
}
