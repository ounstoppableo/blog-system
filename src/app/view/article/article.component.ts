import { watchComponentDeactivate } from '@/app/customReuseStrategy/guard/watchComponentRouteState';
import ViewResize from '@/app/decorators/viewResize';
import { ArticleService } from '@/app/service/article.service';
import { articleInfo } from '@/types/overview/overview';
import { resType } from '@/types/response/response';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewChecked,
  OnDestroy, AfterViewInit,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, retry } from 'rxjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  standalone: false,
})
export class ArticleComponent
  implements OnInit, AfterViewChecked, watchComponentDeactivate, OnDestroy, AfterViewInit
{
  isLeave: boolean = false;
  isLogin: Observable<boolean>;
  articleId!: string;
  articleInfo: articleInfo = {} as articleInfo;
  headerChangeHeight = 0;
  @ViewChild('backImg')
  backImg!: ElementRef;
  smallSize!: Observable<boolean>;
  setIsLeaveTimeout: any;
  subscriptionList: any[] = [];

  ngOnInit() {
    this.subscriptionList.push(
      this.route.params.subscribe(
        (res: any) => (this.articleId = res['articleId']),
      ),
    );
    this.toSetIsLeaveToFalse();
    this.subscriptionList.push(
      this.articleService
        .getArticleInfo(this.articleId)
        .subscribe((res: resType<articleInfo>) => {
          if (res.code === 200)
            this.articleInfo = {
              ...this.articleInfo,
              ...res.data,
            } as articleInfo;
        }),
    );
  }

  toSetIsLeaveToFalse = () => {
    this.subscriptionList.push(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          if (this.isLeave && this.setIsLeaveTimeout)
            clearTimeout(this.setIsLeaveTimeout);
        }
      }),
    );
    this.subscriptionList.push(
      this.route.url.subscribe((res: any) => {
        if (this.setIsLeaveTimeout) clearTimeout(this.setIsLeaveTimeout);
        this.setIsLeaveTimeout = setTimeout(() => {
          this.isLeave = false;
        }, 1000);
      }),
    );
  };

  ngAfterViewChecked(): void {
    this.headerChangeHeight =
      Number.parseFloat(this.backImg.nativeElement.offsetHeight) -
      Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          '--headerHeigth',
        ),
      );
  }

  // 从文章详情页获取文章字数和阅读时长
  getWordsCountAndReadTime(e: any) {
    this.articleInfo = { ...this.articleInfo, ...e };
  }

  ngAfterViewInit(): void {
    window.scrollTo(0, 0);
  }
  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<{ smallSize: boolean; isLogin: boolean }>,
  ) {
    this.smallSize = store.select('smallSize');
    this.isLogin = store.select('isLogin');
  }
  toBelongFile(folderId: string) {
    this.router.navigate(['folderPage', folderId]);
  }
  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscripion) => {
      subscripion.unsubscribe();
    });
  }
}
