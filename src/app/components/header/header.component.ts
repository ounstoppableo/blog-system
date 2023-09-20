import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy, AfterViewInit {
  originScrollY = 0;
  scrollDerection = 'down';
  @ViewChild('container')
  container!: ElementRef;
  @Input()
  scrollTarget!: number;
  constructor(
    private router: Router,
    private routes: ActivatedRoute,
  ) { }
  goHome() {
    if (this.routes.routeConfig?.path === 'home') {
      location.reload();
      window.scrollTo(0, 0);
    } else {
      this.router.navigate(['/home']);
    }
  }
  ngAfterViewInit(): void {
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
  //组件销毁同时清除滚动事件
  ngOnDestroy(): void {
    window.onscroll = null;
  }
}
