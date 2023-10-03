import { HomeService } from '@/app/service/home.service';
import { articleInfo } from '@/types/overview/overview';
import { resType } from '@/types/response/response';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  articleInfoList: articleInfo[] = [];
  @Input()
  smallSize!: boolean;
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
