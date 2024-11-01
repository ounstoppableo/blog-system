import { loadScript } from '@/utils/loadScript';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  Injector,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { CircleMenuComponent } from './components/circle-menu/circle-menu.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
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
  smallSize = false;
  catalogue: any[] = [];
  private _modelInstance: any;
  private _darkModeLock = false;
  @ViewChild('operate')
  operate!: ElementRef;
  @ViewChild('catalogueTemp')
  catalogueTemp!: TemplateRef<any>;
  constructor(
    private router: Router,
    private r: ComponentFactoryResolver,
    private injector: Injector,
    private modal: NzModalService,
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

  pageControl = () => {
    if (window.innerWidth < 1024) {
      this.smallSize = true;
    } else {
      this.smallSize = false;
    }
  };

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
            if ((item as any).getAttribute('noLazyLoad') === 'true') return;
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

    window.addEventListener('resize', this.pageControl);
    this.pageControl();
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
    if (this._darkModeLock) return;
    this._darkModeLock = true;
    this.darkMode = !this.darkMode;
    localStorage.setItem('darkMode', this.darkMode);
    window.location.reload();
    const _cb = () => {
      this.implementDarkMode();
      this._darkModeLock = false;
      window.removeEventListener('load', _cb);
    };
    window.addEventListener('load', _cb);
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
        'rgba(16, 20, 20,0.7)',
      );
      document.documentElement.style.setProperty('--copyrightColor', '#cccccc');
      document.documentElement.style.setProperty('--fontColor', '#d1d5db');
      document.documentElement.style.setProperty(
        '--userNameFontColor',
        '#d1d5db',
      );
      document.documentElement.style.setProperty('--copyrightBg', '#363636');
      document.documentElement.style.setProperty('--footerBkColor', '#000');
      document.documentElement.style.setProperty('--metaColor', '#444444');
      document.documentElement.style.setProperty('--readDoneColor', '#aaaaaa');
      document.documentElement.style.setProperty(
        '--articleMesh',
        'linear-gradient(90deg, rgba(205, 255, 255, 0.07) 3%, transparent 0),linear-gradient(1turn, rgba(205, 255, 255, 0.07) 3%, transparent 0)',
      );
      document.documentElement.style.setProperty('--c-gray', '#666');
      this.loadCss(
        `https://cdn.jsdelivr.net/gh/ounstoppableo/cdn@vlatest/darkMode.css`,
        'darkMode',
      ).finally(() => {
        document.documentElement.classList.add('dark');
      });
    } else {
      document.documentElement.style.setProperty(
        '--defaultBackgroundColor',
        '#fdfdfd',
      );
      document.documentElement.style.setProperty('--cardColor', '#fdfdfd');
      document.documentElement.style.setProperty('--fontColor', '#4b5563');
      document.documentElement.style.setProperty(
        '--musicPlayerBgColor',
        'rgba(238, 243, 247, 0.7)',
      );
      document.documentElement.style.setProperty('--copyrightColor', '#66666');
      document.documentElement.style.setProperty('--userNameFontColor', '#000');
      document.documentElement.style.setProperty('--footerBkColor', '#e5e5e5');
      document.documentElement.style.setProperty('--copyrightBg', '#f7f7f7');
      document.documentElement.style.setProperty('--metaColor', '#eff2f3');
      document.documentElement.style.setProperty('--readDoneColor', '#999999');
      document.documentElement.style.setProperty(
        '--articleMesh',
        'linear-gradient(90deg, rgba(50, 0, 0, 0.07) 3%, transparent 0),linear-gradient(1turn, rgba(50, 0, 0, 0.07) 3%, transparent 0)',
      );
      document.documentElement.style.setProperty('--c-gray', '#ccc');
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
  //订阅
  subscribe() {
    this.modal.create({
      nzTitle: undefined,
      nzContent: SubscribeComponent,
      nzWidth: 'fit-content',
      nzClassName: 'customModal',
      nzStyle: { top: '30%' },
      nzFooter: null,
      nzClosable: false,
    });
  }

  //到评论区
  toCommentArea() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  //打开目录
  openCatalogue() {
    this.catalogue = JSON.parse(localStorage.getItem('catalogue') as any);
    requestAnimationFrame(() => {
      this._modelInstance = this.modal.create({
        nzTitle: undefined,
        nzContent: this.catalogueTemp,
        nzWidth: 'fit-content',
        nzClassName: 'customModal_catalogue',
        nzStyle: { top: '20%' },
        nzFooter: null,
        nzClosable: false,
      });
    });
  }

  handleCatalogueClick(e: any) {
    this._modelInstance.close();
    setTimeout(() => {
      document
        .getElementById(e.replace(/[\(\-\)\$0-9\.\s\&\@\;#]/g, ''))
        ?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  }

  ngAfterViewChecked(): void {}
  ngOnDestroy(): void {
    this.observer?.disconnect();
    window.removeEventListener('resize', this._showWaifu);
    window.removeEventListener('scroll', this.imgLazyLoad);
    window.removeEventListener('resize', this.pageControl);
  }
}
