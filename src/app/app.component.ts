import { loadScript } from '@/utils/loadScript';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { CircleMenuComponent } from './components/circle-menu/circle-menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent
  implements OnInit, AfterViewChecked, AfterViewInit, OnDestroy
{
  title = 'my-blog';
  darkMode = JSON.parse(localStorage.getItem('darkMode') || 'false');
  isArticle = false;
  firstLoad = true;
  imgLazyLoadMap = new Map();
  observer: any;
  @ViewChild('operate')
  operate!: ElementRef;
  constructor(
    private router: Router,
    private r: ComponentFactoryResolver,
    private injector: Injector,
  ) {}
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd)
        this.isArticle = event.url.includes('article');
    });
    if (this.firstLoad) {
      this.loadCss(
        `https://cdn.jsdelivr.net/gh/ounstoppableo/cdn@vlatest/darkMode.css`,
        'dark',
      ).finally(() => {
        document.getElementById('dark')?.remove();
        this.firstLoad = false;
      });
    }
  }
  //四季控制板工厂创建
  @ViewChild('vc', { read: ViewContainerRef }) vc!: ViewContainerRef;
  seasonFactory = this.r.resolveComponentFactory(CircleMenuComponent);
  componentRef = this.seasonFactory.create(this.injector);
  ngAfterViewInit(): void {
    //看板娘加载
    loadScript(
      'https://cdn.jsdelivr.net/gh/ounstoppableo/custom-live2d@v1.1.1/autoload.js',
      () => {
        const observer = new MutationObserver((mutationsList, observer) => {
          if (
            mutationsList.findIndex(
              (item) => (item.target as any).id === 'waifu-tool',
            ) !== -1
          ) {
            this._showWaifu();
            observer.disconnect();
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });
        window.addEventListener('resize', this._showWaifu);
      },
    );
    //四季飘落效果加载
    loadScript(
      'https://cdn.jsdelivr.net/gh/ounstoppableo/season_float_animation@v3.0.2/snowfall.jquery.js',
      () => {
        this.vc.insert(this.componentRef.hostView);
      },
    );
    this.implementDarkMode();
    //图片懒加载
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes) {
          const imgs = document
            .getElementById('approot')!
            .querySelectorAll('img');
          imgs.forEach((item, index) => {
            const identification = item.getAttribute('identification');
            if (!this.imgLazyLoadMap.has(identification)) {
              const betaSrc = item.getAttribute('betaSrc');
              if (!betaSrc) {
                let tempSrc;
                if (
                  item.src.startsWith('http') &&
                  item.src.startsWith('https')
                ) {
                  tempSrc = item.src;
                } else {
                  tempSrc = item.src.split('/').slice(3).join('/');
                }
                if (tempSrc) {
                  item.src = '/assets/loading.gif';
                  item.setAttribute('betaSrc', tempSrc);
                  item.setAttribute('identification', Date.now() + index + '');
                }
              }
              const rect = item.getBoundingClientRect();
              if (
                item.offsetHeight !== 0 &&
                rect.y >= -rect.height &&
                item.getBoundingClientRect().y <= innerHeight
              ) {
                if (betaSrc) {
                  const img = new Image();
                  img.src = betaSrc;
                  img.onload = () => {
                    item.src = betaSrc;
                  };
                  this.imgLazyLoadMap.set(identification, 1);
                }
              }
            }
          });
        }
      });
      //给图片预加载
    });
    this.observer.observe(document.getElementById('approot')!, {
      childList: true,
      subtree: true,
    });
    window.addEventListener('scroll', this.imgLazyLoad);
  }
  private _showWaifu() {
    if (innerWidth > 1024) {
      document.getElementById('waifu')
        ? (document.getElementById('waifu')!.style.display = '')
        : null;
      document.getElementById('waifu-toggle')
        ? (document.getElementById('waifu-toggle')!.style.display = '')
        : null;
    } else {
      document.getElementById('waifu')
        ? (document.getElementById('waifu')!.style.display = 'none')
        : null;
      document.getElementById('waifu-toggle')
        ? (document.getElementById('waifu-toggle')!.style.display = 'none')
        : null;
    }
  }
  imgLazyLoad = () => {
    const imgs = document.getElementById('approot')!.querySelectorAll('img');
    imgs.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const identification = item.getAttribute('identification');
      if (!this.imgLazyLoadMap.has(identification)) {
        if (
          item.offsetHeight !== 0 &&
          rect.y >= -rect.height &&
          item.getBoundingClientRect().y <= innerHeight
        ) {
          const betaSrc = item.getAttribute('betaSrc');

          if (betaSrc) {
            const img = new Image();
            img.src = betaSrc;
            img.onload = () => (item.src = betaSrc);
            this.imgLazyLoadMap.set(identification, 1);
          }
        }
      }
    });
  };
  //暗黑模式
  changeDarkMode() {
    this.darkMode = !this.darkMode;
    localStorage.setItem('darkMode', this.darkMode);
    this.implementDarkMode();
  }
  implementDarkMode() {
    if (this.darkMode) {
      document.documentElement.style.setProperty(
        '--defaultBackgroundColor',
        '#000000',
      );
      document.documentElement.style.setProperty('--cardColor', '#101414');
      document.documentElement.style.setProperty(
        '--musicPlayerBgColor',
        '#101414',
      );
      document.documentElement.style.setProperty('--fontColor', '#d1d5db');
      document.documentElement.style.setProperty(
        '--userNameFontColor',
        '#d1d5db',
      );
      document.documentElement.style.setProperty('--footerBkColor', '#000');
      this.loadCss(
        `https://cdn.jsdelivr.net/gh/ounstoppableo/cdn@vlatest/darkMode.css`,
        'darkMode',
      ).finally(() => {
        document.documentElement.classList.add('dark');
      });
    } else {
      document.documentElement.style.setProperty(
        '--defaultBackgroundColor',
        '#f5f5f5',
      );
      document.documentElement.style.setProperty('--cardColor', '#fff');
      document.documentElement.style.setProperty('--fontColor', '#4b5563');
      document.documentElement.style.setProperty(
        '--musicPlayerBgColor',
        '#eef3f7',
      );
      document.documentElement.style.setProperty('--userNameFontColor', '#000');
      document.documentElement.style.setProperty('--footerBkColor', '#e5e5e5');
      const removedThemeStyle = document.getElementById('darkMode');
      if (removedThemeStyle) {
        document.head.removeChild(removedThemeStyle);
      }
      document.documentElement.classList.remove('dark');
    }
  }

  //加载css
  private loadCss(href: string, id: string): Promise<Event> {
    return new Promise((resolve, reject) => {
      const style = document.createElement('link');
      style.rel = 'stylesheet';
      style.href = href;
      style.id = id;
      style.onload = resolve;
      style.onerror = reject;
      document.head.append(style);
    });
  }
  //回到顶部
  toTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  //到评论区
  toCommentArea() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }
  ngAfterViewChecked(): void {}
  ngOnDestroy(): void {
    this.observer?.disconnect();
    window.removeEventListener('resize', this._showWaifu);
    window.removeEventListener('scroll', this.imgLazyLoad);
  }
}
