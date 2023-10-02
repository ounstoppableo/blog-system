import { HomeService } from "@/app/service/home.service";
import { articleInfo } from "@/types/overview/overview";
import { Component, Input, OnInit } from "@angular/core";
@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss'],
})
export class UserinfoComponent implements OnInit {
  articleInfoList: articleInfo[] = []; //文章列表
  folderNum = 0; //分类数
  tagsNum = 0; //tag数
  @Input()
  isSmall!:boolean
  constructor(private homeService: HomeService) { }
  ngOnInit(): void {
    this.homeService.getArticleInfo().subscribe((res: any) => {
      if (res.code === 200) this.articleInfoList = res.data;
    });
    this.homeService.getFolderCategory().subscribe((res: any) => {
      if (res.code === 200) this.folderNum = res.data.length;
    });
    this.homeService.getTags().subscribe((res: any) => {
      if (res.code === 200) this.tagsNum = res.data.length;
    });
  }
}
