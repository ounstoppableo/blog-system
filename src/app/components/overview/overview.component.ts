import { HomeService } from '@/app/service/home.service';
import { LoginService } from '@/app/service/login';
import { articleInfo } from '@/types/overview/overview';
import { resType } from '@/types/response/response';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  OnDestroy,
  AfterViewInit,
  OnChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { AddArticleFormComponent } from '../add-article-form/add-article-form.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import dayjs from 'dayjs';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  standalone: false,
})
export class OverviewComponent
  implements OnInit, AfterViewInit, OnChanges, OnDestroy
{
  isLogin: Observable<boolean>;
  @Input()
  toTopOverview = false;
  @Input()
  articleInfoList: articleInfo[] = [];
  smallSize!: Observable<boolean>;
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
  private _cardShowWhileScroll = () => {
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
          item.getBoundingClientRect().y < innerHeight + item.offsetHeight / 2
        ) {
          item.style.transform = 'scale(1)';
          item.style.transition = `all 1s ease,box-shadow 0.3s ease-in-out`;
          if (item.querySelector('img')) {
            item.querySelector('img').style.filter = 'blur(0)';
          }
        } else if (item.getBoundingClientRect().y < -item.offsetHeight) {
          item.style.transform = 'scale(.8)';
          item.style.transition = `all 1s ease,box-shadow 0.3s ease-in-out`;
          if (item.querySelector('img'))
            item.querySelector('img').style.filter = 'blur(10px)';
        } else if (item.getBoundingClientRect().y > innerHeight) {
          item.style.transform = 'scale(.8)';
          item.style.transition = `all 1s ease,box-shadow 0.3s ease-in-out`;
          if (item.querySelector('img'))
            item.querySelector('img').style.filter = 'blur(10px)';
        }
      });
      clearTimeout(this._timer);
      this._timer = null;
    };
    this._timer = setTimeout(_callback, 100);
  };
  private _loadedEventCb = () => {
    this._cardShowWhileScroll();
  };

  constructor(
    private homeService: HomeService,
    private router: Router,
    private message: NzMessageService,
    private store: Store<{ smallSize: boolean; isLogin: boolean }>,
  ) {
    this.smallSize = store.select('smallSize');
    this.isLogin = store.select('isLogin');
  }

  ngOnInit(): void {
    if (this.isHome && this.toTopOverview) {
      this.homeService.getTopArticleInfo().subscribe((res) => {
        if (res.code === 200) this.articleInfoList = res.data;
      });
    }
  }
  ngOnChanges(changes: any) {
    if (
      changes['articleInfoList'] &&
      changes['articleInfoList'].currentValue.length !== 0
    ) {
      requestAnimationFrame(() => {
        this._cardShowWhileScroll();
        window.removeEventListener('load', this._loadedEventCb);
        window.addEventListener('load', this._loadedEventCb);
      });
    }
  }
  ngAfterViewInit(): void {
    window.addEventListener('scroll', this._cardShowWhileScroll);
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
