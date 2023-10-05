import { HomeService } from '@/app/service/home.service';
import { articleInfo } from '@/types/overview/overview';
import { resType } from '@/types/response/response';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  @Input()
  showInfo!: boolean;
  @Input()
  smallSize = false;
  articleInfoList: articleInfo[] = []; //文章列表
  constructor(
    private homeService: HomeService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.homeService
      .getArticleInfo()
      .subscribe((res: resType<articleInfo[]>) => {
        if (res.code === 200) this.articleInfoList = res.data as articleInfo[];
      });
  }
  toArticle(articleId: string) {
    this.router.navigate(['article', articleId]);
  }
}
