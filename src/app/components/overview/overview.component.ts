import { HomeService } from '@/app/service/home.service';
import { articleInfo } from '@/types/overview/overview';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  articleInfoList: articleInfo[] = [];
  @Input()
  smallSize!:boolean
  constructor(private homeService: HomeService) {}
  ngOnInit(): void {
    this.homeService.getArticleInfo().subscribe((res: any) => {
      if (res.code === 200) this.articleInfoList = res.data;
    });
  }
}
