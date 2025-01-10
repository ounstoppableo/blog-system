import asyncCheckAppLoad from '@/utils/checkAppLoad';
import { closedFloat, judgeSeason, seasonSelect } from '@/utils/seasonFloat';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import $ from 'jquery';

@Component({
  selector: 'app-circle-menu',
  templateUrl: './circle-menu.component.html',
  styleUrls: ['./circle-menu.component.scss'],
  standalone: false,
})
export class CircleMenuComponent implements AfterViewInit, OnDestroy {
  showMenu = false;
  currentSeason: 'Spring' | 'Summer' | 'Winter' | 'Autumn' =
    (localStorage.getItem('seasonType') as
      | 'Spring'
      | 'Summer'
      | 'Winter'
      | 'Autumn') || judgeSeason();
  @Input() flag = JSON.parse(localStorage.getItem('seasonFloat') || 'false');
  timeout: any = null;
  @ViewChild('menu')
  menu!: ElementRef;

  @ViewChild('menu_wrapper')
  menu_wrapper!: ElementRef;

  observer: any = new MutationObserver(() => {
    const appHeight = document.getElementById('approot')!.offsetHeight;
    if (this.appHeight !== appHeight) {
      this.appHeight = appHeight;
      this.seasonResizeCallback();
    }
  });
  appHeight = 0;
  rippleClickCb = () => {
    document.getElementById('menu-btn')!.classList.toggle('clicked');
    this.menu.nativeElement.classList.toggle('open');
    this.showMenu = !this.showMenu;
    if (this.showMenu) {
      this.menu.nativeElement
        .querySelectorAll('a')
        .forEach((item: any, index: number) => {
          const _cb = (e: any) => {
            e.preventDefault();
            (
              this.menu.nativeElement.querySelectorAll(
                '.menuitem-wrapper',
              ) as any
            )[index].classList.add('spin');
            const timer = setTimeout(() => {
              (
                this.menu.nativeElement.querySelectorAll(
                  '.menuitem-wrapper',
                ) as any
              )[index].classList.remove('spin');
              document.getElementById('menu-btn')!.classList.remove('clicked');
              this.menu.nativeElement.classList.remove('open');
              requestAnimationFrame(() => {
                this.showMenu = false;
              });
              clearTimeout(timer);
            }, 800);
          };
          item.removeEventListener('click', this.menuItemClickCbArr[index]);
          this.menuItemClickCbArr[index] = _cb;
          item.addEventListener('click', _cb);
        });
    }
  };

  menuItemClickCbArr: any[] = [];

  constructor(private router: Router) {}

  seasonResizeCallback = () => {
    closedFloat();
    //使用防抖
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.changeSeason(this.currentSeason);
      clearTimeout(this.timeout);
    }, 500);
  };

  ngAfterViewInit(): void {
    //面板样式控制
    document
      .querySelector('[has-ripple="true"]')
      ?.addEventListener('click', this.rippleClickCb);

    if (this.flag) {
      this.seasonResizeCallback();
      window.addEventListener('resize', this.seasonResizeCallback);
      this.observer.observe(document.getElementById('approot'), {
        childList: true,
        subtree: true,
        attributes: true,
      });
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          closedFloat();
        }
      });
    }
  }

  changeSeason(type: 'Spring' | 'Summer' | 'Winter' | 'Autumn') {
    this.flag = true;
    localStorage.setItem('seasonFloat', 'true');
    this.currentSeason = type;
    localStorage.setItem('seasonType', this.currentSeason);
    asyncCheckAppLoad(() => seasonSelect(this.currentSeason));
  }
  handleChangeSeason(type: 'Spring' | 'Summer' | 'Winter' | 'Autumn') {
    const timer = setTimeout(() => {
      localStorage.setItem('seasonFloat', 'true');
      localStorage.setItem('seasonType', type);
      location.reload();
      clearTimeout(timer);
    }, 1000);
  }

  toggleFloat() {
    const timer = setTimeout(() => {
      this.currentSeason = judgeSeason();
      if (this.flag) {
        localStorage.setItem('seasonFloat', 'false');
        localStorage.setItem('seasonType', this.currentSeason);
      } else {
        localStorage.setItem('seasonFloat', 'true');
        localStorage.setItem('seasonType', this.currentSeason);
      }
      clearTimeout(timer);
      location.reload();
    }, 1000);
  }

  //模拟鼠标按压移动
  onTouchmove(e: any) {
    const firstTouch = e.touches[0];
    if (firstTouch) {
      e.preventDefault();
      this.menu_wrapper.nativeElement.style.top =
        firstTouch.clientY -
        this.menu_wrapper.nativeElement.offsetHeight / 2 +
        'px';
      this.menu_wrapper.nativeElement.style.left =
        firstTouch.clientX -
        this.menu_wrapper.nativeElement.offsetWidth / 2 +
        'px';
    }
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
    window.removeEventListener('resize', this.seasonResizeCallback);
    document
      .querySelector('[has-ripple="true"]')
      ?.removeEventListener('click', this.rippleClickCb);
  }
}
