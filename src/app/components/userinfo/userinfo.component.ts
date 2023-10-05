import { HomeService } from '@/app/service/home.service';
import { folderItem, tag } from '@/types/home/home';
import { articleInfo } from '@/types/overview/overview';
import { resType } from '@/types/response/response';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  isSmall!: boolean;
  constructor(private homeService: HomeService,private router:Router) {}
  ngOnInit(): void {
    this.homeService
      .getArticleInfo()
      .subscribe((res: resType<articleInfo[]>) => {
        if (res.code === 200) this.articleInfoList = res.data as articleInfo[];
      });
    this.homeService
      .getFolderCategory()
      .subscribe((res: resType<folderItem[]>) => {
        if (res.code === 200) this.folderNum = res.data!.length;
      });
    this.homeService.getTags().subscribe((res: resType<tag[]>) => {
      if (res.code === 200) this.tagsNum = res.data!.length;
    });
  }
  toDateCate(){
    this.router.navigate(['/dateCate'])
  }
  tofolderCate(){
    this.router.navigate(['/category'])
  }
  toTagsCate(){
    this.router.navigate(['/tagCate'])
  }
}
