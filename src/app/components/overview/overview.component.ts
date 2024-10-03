import { HomeService } from '@/app/service/home.service';
import { LoginService } from '@/app/service/login';
import { articleInfo } from '@/types/overview/overview';
import { resType } from '@/types/response/response';
import {
  AfterViewChecked,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { AddArticleFormComponent } from '../add-article-form/add-article-form.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import dayjs from 'dayjs';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit, AfterViewChecked, OnDestroy {
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
  @ViewChild('cardContainerLeft')
  cardContainerLeft!: any;
  isInit = false;
  private _cardShowWhileScroll: any;

  constructor(
    private homeService: HomeService,
    private router: Router,
    private loginService: LoginService,
    private message: NzMessageService,
  ) {}

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
  ngAfterViewChecked(): void {
    //设置懒加载效果
    if (!this.isInit && this.articleInfoList.length !== 0 && !this.smallSize) {
      const cardArr =
        this.cardContainerLeft.nativeElement.querySelectorAll('.card');
      this._cardShowWhileScroll = () => {
        cardArr.forEach((item: any) => {
          if (
            item.getBoundingClientRect().y >
              -item.offsetHeight - item.offsetHeight / 2 &&
            item.getBoundingClientRect().y < innerHeight + item.offsetHeight / 2
          ) {
            item.style.opacity = 1;
            item.style.transform = 'translateY(0)';
          } else if (item.getBoundingClientRect().y < -item.offsetHeight) {
            item.style.opacity = 0;
            item.style.transform = 'translateY(-50%)';
          } else if (item.getBoundingClientRect().y > innerHeight) {
            item.style.opacity = 0;
            item.style.transform = 'translateY(50%)';
          }
        });
      };
      window.addEventListener('scroll', this._cardShowWhileScroll);
      //初始化状态
      cardArr.forEach((item: any) => {
        if (
          item.getBoundingClientRect().y > -item.offsetHeight &&
          item.getBoundingClientRect().y < innerHeight
        ) {
          item.style.opacity = 1;
          item.style.transform = 'translateY(0)';
        }
      });
      this.isInit = true;
    }
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
    this.isInit = false;
    this.articleInfoList = [];
  }
  //去日期分类页
  toDateCate(date: string) {
    const dateId = dayjs(date).format('YYYY-MM');
    this.router.navigate(['dateCate'], { fragment: dateId });
  }
  //去文件分类页
  toFolderCate(folderId: string) {
    this.router.navigate(['folderPage', folderId]);
  }
  ngOnDestroy(): void {
    window.removeEventListener('scroll', this._cardShowWhileScroll);
  }
}
