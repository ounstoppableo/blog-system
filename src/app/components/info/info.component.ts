import { HomeService } from '@/app/service/home.service';
import { articleInfo } from '@/types/overview/overview';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  @Input()
  showInfo!:boolean
  articleInfoList: articleInfo[] = []; //文章列表
  constructor(private homeService: HomeService) { }
  ngOnInit(): void {
    this.homeService.getArticleInfo().subscribe((res: any) => {
      if (res.code === 200) this.articleInfoList = res.data;
    });
  }
}
