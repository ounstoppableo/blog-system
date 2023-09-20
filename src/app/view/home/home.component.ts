import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  word = '';
  words = [
    'Hi~，我是一枚程序员',
    'Hi~，我喜欢探索新事物',
    '欢迎来到我的博客🎉',
  ];
  index = 0;
  headerChangeHeight!: number
  @ViewChild('wordSpan')
  wordSpan!: ElementRef;
  @ViewChild('root')
  root!: ElementRef;
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
    this.headerChangeHeight = this.root.nativeElement.offsetHeight
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
    if (this.routes.routeConfig?.path === 'home') {
      location.reload();
      window.scrollTo(0, 0);
    } else {
      this.router.navigate(['/home']);
    }
  }
  constructor(
    private routes: ActivatedRoute,
    private router: Router,
  ) { }
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
