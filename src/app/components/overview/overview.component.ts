import { HomeService } from '@/app/service/home.service';
import { LoginService } from '@/app/service/login';
import { articleInfo } from '@/types/overview/overview';
import { resType } from '@/types/response/response';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AddArticleFormComponent } from '../add-article-form/add-article-form.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger,
} from '@angular/animations';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  animations: [
    trigger('toShow', [
      transition('*=>*', [
        query(
          ':enter',
          [
            style({ opacity: 0 }),
            stagger(200, [animate('0.5s', style({ opacity: 1 }))]),
          ],
          { optional: true },
        ),
      ]),
    ]),
  ],
})
export class OverviewComponent implements OnInit {
  isLogin = false;
  @Input()
  articleInfoList: articleInfo[] = [];
  @Input()
  smallSize!: boolean;
  //模态框组件
  @Input()
  updateArticleModal!: AddArticleFormComponent;
  @Input()
  page = 1;
  @Input()
  limit = 5;
  @Input()
  total = 0;
  @Output()
  nextPage = new EventEmitter();

  constructor(
    private homeService: HomeService,
    private router: Router,
    private loginService: LoginService,
    private message: NzMessageService,
  ) { }
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.loginService.getUserInfo().subscribe((res) => {
        if (res.code === 200) this.isLogin = true;
        else this.isLogin = false;
      });
    }
  }
  toArticle(articleId: string) {
    this.router.navigate(['article', articleId]);
  }
  //更新文章
  editArticle(item: articleInfo) {
    const listOfTagOptions = item.tags.map((tag) => tag.tagName);
    this.updateArticleModal.showUploadModal({ ...item, listOfTagOptions });
  }
  //删除文章
  delArticle(articleId: string) {
    this.homeService.delArticle(articleId).subscribe((res: resType<any>) => {
      if (res.code === 200) this.message.success('删除成功!');
    });
  }
  pageIndexChange(page: number) {
    this.nextPage.emit(page);
  }
  //去日期分类页
  toDateCate() {
    this.router.navigate(['dateCate'])
  }
  //去文件分类页
  toFolderCate() {
    this.router.navigate(['category']);
  }
}
