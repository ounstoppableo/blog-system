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
  OnChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { AddArticleFormComponent } from '../add-article-form/add-article-form.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import dayjs from 'dayjs';
@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
    standalone: false
})
export class OverviewComponent
  implements OnInit, AfterViewChecked, OnChanges, OnDestroy
{
  isLogin = false;
  @Input()
  toTopOverview = false;
  @Input()
  articleInfoList: articleInfo[] = [];
  @Input()
  smallSize!: boolean;
  @Input()
  isHome = false;
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
  @ViewChild('articleListRef')
  articleListRef!: any;
  isInit = false;
  noToTop = '1970-01-01 08:00:01';
  private _timer: any = null;
  private _cardShowWhileScroll: any;
  private _loadedEventCb: any;

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
    if (this.isHome && this.toTopOverview) {
      this.homeService.getTopArticleInfo().subscribe((res) => {
        if (res.code === 200) this.articleInfoList = res.data;
      });
    }
  }
  toArticle(articleId: string) {
    this.router.navigate(['article', articleId]);
  }

  ngOnChanges(changes: any) {
    if (
      changes['articleInfoList'] &&
      changes['articleInfoList'].currentValue.length !== 0
    ) {
      requestAnimationFrame(() => {
        this._cardShowWhileScroll();
        window.removeEventListener('load', this._loadedEventCb);
        this._loadedEventCb = () => {
          this._cardShowWhileScroll();
        };
        window.addEventListener('load', this._loadedEventCb);
      });
    }
  }

  ngAfterViewChecked(): void {
    //设置懒加载效果
    if (!this.isInit && this.articleInfoList.length !== 0) {
      window.removeEventListener('scroll', this._cardShowWhileScroll);
      this._cardShowWhileScroll = () => {
        if (this._timer) {
          return;
        }
        const _callback = () => {
          const cardArr =
            this.cardContainerLeft.nativeElement.querySelectorAll('.card');
          cardArr.forEach((item: any) => {
            if (
              item.getBoundingClientRect().y >
                -item.offsetHeight - item.offsetHeight / 2 &&
              item.getBoundingClientRect().y <
                innerHeight + item.offsetHeight / 2
            ) {
              item.style.transform = 'scale(1)';
              item.style.transition = `all 1s ease,box-shadow 0.5s ease`;
              if (item.querySelector('img')) {
                item.querySelector('img').style.filter = 'blur(0)';
              }
            } else if (item.getBoundingClientRect().y < -item.offsetHeight) {
              item.style.transform = 'scale(.8)';
              item.style.transition = `all 1s ease,box-shadow 0.5s ease`;
              if (item.querySelector('img'))
                item.querySelector('img').style.filter = 'blur(10px)';
            } else if (item.getBoundingClientRect().y > innerHeight) {
              item.style.transform = 'scale(.8)';
              item.style.transition = `all 1s ease,box-shadow 0.5s ease`;
              if (item.querySelector('img'))
                item.querySelector('img').style.filter = 'blur(10px)';
            }
          });
          clearTimeout(this._timer);
          this._timer = null;
        };
        this._timer = setTimeout(_callback, 100);
      };
      const cardArr =
        this.cardContainerLeft.nativeElement.querySelectorAll('.card');
      if (cardArr[cardArr.length - 1].querySelector('img')) {
        window.addEventListener('scroll', this._cardShowWhileScroll);
        this._cardShowWhileScroll();
        this.isInit = true;
      }
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
    new Promise((resolve) => {
      this.nextPage.emit({ page, resolve });
    }).then(() => {
      requestAnimationFrame(() => {
        this.articleListRef?.nativeElement.scrollIntoView({
          behavior: 'smooth',
        });
        this.resetAnimation();
      });
    });
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
  toTopArticle(info: articleInfo) {
    if (info.toTop === this.noToTop) {
      this.homeService.toTopArticle(info.articleId).subscribe((res) => {
        if (res.code === 200) this.message.success('置顶成功');
      });
    } else {
      this.homeService.cancelTopArticle(info.articleId).subscribe((res) => {
        if (res.code === 200) this.message.success('取消置顶成功');
      });
    }
  }
  //重置动画
  resetAnimation() {
    this.isInit = false;
  }
  ngOnDestroy(): void {
    window.removeEventListener('scroll', this._cardShowWhileScroll);
  }
}
