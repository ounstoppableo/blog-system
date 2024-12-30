import { HomeService } from '@/app/service/home.service';
import { folderItem, tag } from '@/types/home/home';
import { articleInfo } from '@/types/overview/overview';
import { resType } from '@/types/response/response';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss'],
  standalone: false,
})
export class UserinfoComponent implements OnInit {
  articleInfoList: articleInfo[] = []; //文章列表
  folderNum = 0; //分类数
  tagsNum = 0; //tag数
  @Input()
  smallSize!: boolean;
  @Output()
  closeDrawer = new EventEmitter();
  constructor(
    private homeService: HomeService,
    private router: Router,
    private message: NzMessageService,
  ) {}
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
  toDateCate() {
    this.router.navigate(['/dateCate']);
    this.closeDrawer.emit();
  }
  tofolderCate() {
    this.router.navigate(['/category']);
    this.closeDrawer.emit();
  }
  toTagsCate() {
    this.router.navigate(['/tagCate']);
    this.closeDrawer.emit();
  }
  //复制邮箱
  copyMail() {
    navigator.clipboard.writeText('unstoppable840@gmail.com').then(
      () => {
        this.message.success('复制邮箱成功');
      },
      () => {
        this.message.error('复制邮箱失败');
      },
    );
  }
  //去github
  toGitHub() {
    const a = document.createElement('a');
    a.href = 'https://github.com/ounstoppableo';
    a.id = 'toGitHub';
    document.body.append(a);
    const toGitHub = document.getElementById('toGitHub');
    toGitHub?.click();
    toGitHub?.remove();
  }
  //去telegram
  toTelegram() {
    const a = document.createElement('a');
    a.href = 'https://t.me/Niubi666wodebaobei';
    a.id = 'toGitHub';
    document.body.append(a);
    const toGitHub = document.getElementById('toGitHub');
    toGitHub?.click();
    toGitHub?.remove();
  }
}
