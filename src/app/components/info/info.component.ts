import { HomeService } from '@/app/service/home.service';
import { articleInfo } from '@/types/overview/overview';
import { resType } from '@/types/response/response';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import dayjs from 'dayjs';

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
  @Input()
  isMsgBoard = false;
  @Input()
  catalogue: any[] = [];
  @Input()
  isArticle = false;
  articleInfoList: articleInfo[] = []; //文章列表
  loading = true;

  isHaveNews = true;
  constructor(
    private homeService: HomeService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.homeService
      .getArticleInfo()
      .subscribe((res: resType<articleInfo[]>) => {
        this.loading = false;
        if (res.code === 200)
          this.articleInfoList = res.data?.sort(
            (a, b) => dayjs(b.subTime).unix() - dayjs(a.subTime).unix(),
          ) as articleInfo[];
      });
  }
  newsShowControl($event: boolean) {
    this.isHaveNews = $event;
  }
  toArticle(articleId: string) {
    this.router.navigate(['article', articleId]);
  }
  //去日期分类页
  toDateCate(date: string) {
    const dateId = dayjs(date).format('YYYY-MM');
    this.router.navigate(['dateCate'], { fragment: dateId });
  }
}
