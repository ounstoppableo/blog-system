import { HomeService } from '@/app/service/home.service';
import { articleInfo } from '@/types/overview/overview';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  articleInfoList: articleInfo[] = []
  folderNum = 0
  tagsNum = 0
  constructor(private homeService: HomeService) {
  }
  ngOnInit(): void {
    this.homeService.getArticleInfo().subscribe((res: any) => {
      if (res.code === 200) this.articleInfoList = res.data.slice(0, 10)
      console.log(this.articleInfoList)
    })
    this.homeService.getFolderCategory().subscribe((res: any) => {
      if (res.code === 200) this.folderNum = res.data.length
    })
    this.homeService.getTags().subscribe((res: any) => {
      if (res.code === 200) this.tagsNum = res.data.length
    })
  }
}
