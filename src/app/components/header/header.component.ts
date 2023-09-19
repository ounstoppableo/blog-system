import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  originScrollY = 0;
  scrollDerection = 'down';
  @ViewChild('container')
  container!: ElementRef;
  scrollTarget!: number;
  constructor(private router: Router) {}
  goHome() {
    this.router.navigate(['/home']);
  }
  ngOnInit(): void {
    //初始化滚动距离
    const root = getComputedStyle(document.querySelector(':root')!);
    this.scrollTarget =
      Number.parseInt(root.getPropertyValue('--bodyHeight')) +
      Number.parseInt(root.getPropertyValue('--headerHeigth'));
    this.onScroll();
  }
  //监控滚动事件
  onScroll() {
    window.onscroll = () => {
      this.originScrollY < window.scrollY
        ? (this.scrollDerection = 'down')
        : (this.scrollDerection = 'up');
      this.originScrollY = window.scrollY;
      if (window.scrollY >= this.scrollTarget) {
        this.container.nativeElement.classList.add('active');
        if (this.scrollDerection === 'down') {
          this.container.nativeElement.classList.add('hidden');
        } else {
          this.container.nativeElement.classList.remove('hidden');
        }
      } else {
        this.container.nativeElement.classList.remove('active');
        this.container.nativeElement.classList.remove('hidden');
      }
    };
  }
}
