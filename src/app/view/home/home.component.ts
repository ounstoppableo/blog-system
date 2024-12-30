import { watchComponentDeactivate } from '@/app/customReuseStrategy/guard/watchComponentRouteState';
import ViewResize from '@/app/decorators/viewResize';
import { HomeService } from '@/app/service/home.service';
import { folderItem } from '@/types/home/home';
import { resType } from '@/types/response/response';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomeComponent
  implements OnInit, AfterViewInit, OnDestroy, watchComponentDeactivate
{
  isLeave = false;
  //控制打字机效果的数据
  word = '';
  words = [
    'Hi~，我是一枚程序员',
    'Hi~，我喜欢探索新事物',
    '欢迎来到我的博客🎉',
  ];
  folderCategory: any;
  index = 0;
  headerChangeHeight!: number;
  @ViewChild('wordSpan')
  wordSpan!: ElementRef;
  @ViewChild('root')
  root!: ElementRef;
  isLogin: Observable<boolean>;
  smallSize!: Observable<boolean>;
  setIsLeaveTimeout: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private homeService: HomeService,
    private store: Store<{ smallSize: boolean; isLogin: boolean }>,
  ) {
    this.smallSize = store.select('smallSize');
    this.isLogin = store.select('isLogin');
  }
  ngOnInit(): void {
    this.homeService
      .getFolderCategory()
      .subscribe((res: resType<folderItem[]>) => {
        if (res.code === 200) this.folderCategory = res.data;
      });
    document.documentElement.style.setProperty(
      '--bodyHeightForInvariant',
      innerHeight + 'px',
    );
    this.toSetIsLeaveToFalse();
  }

  toSetIsLeaveToFalse = () => {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (this.isLeave && this.setIsLeaveTimeout)
          clearTimeout(this.setIsLeaveTimeout);
      }
    });
    this.route.url.subscribe((res: any) => {
      if (this.setIsLeaveTimeout) clearTimeout(this.setIsLeaveTimeout);
      this.setIsLeaveTimeout = setTimeout(() => {
        this.isLeave = false;
      }, 1000);
    });
  };

  ngAfterViewInit(): void {
    //打字机效果控制
    const timer = setInterval(() => {
      if (this.index > this.word.length - 1) {
        if (this.words.length === 0) {
          clearInterval(timer);
        } else {
          const temp = this.word;
          this.word = this.words.shift() as string;
          const index = compareStr(temp, this.word);
          this.index = index > 0 ? index : 0;
          this.wordSpan.nativeElement.innerText = this.word.slice(
            0,
            this.index,
          );
        }
      }
      if (this.word[this.index]) {
        this.wordSpan.nativeElement.innerText =
          this.wordSpan.nativeElement.innerText + this.word[this.index];
        this.index++;
      }
    }, 300);
    //获取头部样式变化的高度
    this.headerChangeHeight =
      innerHeight -
      Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          '--headerHeigth',
        ),
      );
  }
  //滑动到内容区域
  toContainer() {
    const scrollTo = this.root.nativeElement.offsetHeight;
    window.scroll({
      top: scrollTo,
      left: 0,
      behavior: 'smooth',
    });
  }
  goHome() {
    this.router.navigate(['home']);
  }
  //去单文件夹页
  goSingleFolder(folderId: number) {
    this.router.navigate(['folderPage', folderId]);
  }
  ngOnDestroy() {
    window.onresize = null;
  }
}
//字符串相同字段对比，返回最终相同下标
function compareStr(str1: string, str2: string): number {
  let index = 0;
  for (let i = 0; i < str1.length; i++) {
    if (str1[i] === str2[i]) index++;
    else break;
  }
  return index - 2;
}
