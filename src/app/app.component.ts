import { loadScript } from '@/utils/loadScript';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  Injector,
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
  implements OnInit, AfterViewChecked, AfterViewInit
{
  title = 'my-blog';
  darkMode = false;
  isArticle = false;
  firstLoad = true;
  imgLazyLoadMap = new Map();
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
      this.loadCss(`./assets/darkMode.scss`, 'dark').finally(() => {
        document.getElementById('dark')?.remove();
        this.firstLoad = false;
      });
    }
    //图片懒加载
    window.addEventListener('scroll', this.imgLazyLoad.bind(this));
  }
  //四季控制板工厂创建
  @ViewChild('vc', { read: ViewContainerRef }) vc!: ViewContainerRef;
  seasonFactory = this.r.resolveComponentFactory(CircleMenuComponent);
  componentRef = this.seasonFactory.create(this.injector);
  ngAfterViewInit(): void {
    //看板娘加载
    loadScript(
      'https://cdn.jsdelivr.net/gh/ounstoppableo/custom-live2d@v4.1.1/autoload.js',
      function () {
        function showWaifu() {
          if (innerWidth > 1024) {
            document.getElementById('waifu')?document.getElementById('waifu')!.style.display = '':null;
          } else {
            document.getElementById('waifu')?document.getElementById('waifu')!.style.display = 'none':null;
          }
        }
        const observer = new MutationObserver((mutationsList, observer) => {
          if (
            mutationsList.findIndex(
              (item) => (item.target as any).id === 'waifu-tool',
            ) !== -1
          ) {
            showWaifu();
            observer.disconnect();
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });
        window.addEventListener('resize', showWaifu);
      },
    );
    //四季飘落效果加载
    loadScript(
      'https://cdn.jsdelivr.net/gh/ounstoppableo/season_float_animation@vlatest/jquery.min.js',
      () => {
        loadScript(
          'https://cdn.jsdelivr.net/gh/ounstoppableo/season_float_animation@v3.0.1/snowfall.jquery.js',
          () => {
            this.vc.insert(this.componentRef.hostView);
          },
        );
      },
    );
  }
  imgLazyLoad() {
    const imgs = document.querySelectorAll('img');
    imgs.forEach((item) => {
      if (item.getBoundingClientRect().y <= innerHeight) {
        const betaSrc = item.getAttribute('betaSrc');
        const identification = item.getAttribute('identification');
        if (betaSrc) {
          if (!this.imgLazyLoadMap.has(identification)) {
            const img = new Image();
            img.src = betaSrc;
            img.onload = () => (item.src = betaSrc);
            this.imgLazyLoadMap.set(identification, 1);
          }
        }
      }
    });
  }
  //暗黑模式
  changeDarkMode() {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      document.documentElement.style.setProperty(
        '--defaultBackgroundColor',
        '#000000',
      );
      document.documentElement.style.setProperty('--cardColor', '#101414');
      document.documentElement.style.setProperty('--fontColor', '#d1d5db');
      document.documentElement.style.setProperty(
        '--userNameFontColor',
        '#d1d5db',
      );
      document.documentElement.style.setProperty('--footerBkColor', '#000');
      this.loadCss(`./assets/darkMode.scss`, 'dark').finally(() => {
        document.documentElement.classList.add('dark');
      });
    } else {
      document.documentElement.style.setProperty(
        '--defaultBackgroundColor',
        '#f5f5f5',
      );
      document.documentElement.style.setProperty('--cardColor', '#fff');
      document.documentElement.style.setProperty('--fontColor', '#4b5563');
      document.documentElement.style.setProperty('--userNameFontColor', '#000');
      document.documentElement.style.setProperty('--footerBkColor', '#e5e5e5');
      const removedThemeStyle = document.getElementById('dark');
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
  ngAfterViewChecked(): void {
    //给图片预加载
    const imgs = document.querySelectorAll('img');
    imgs.forEach((item, index) => {
      if (item.classList.value !== 'snowfall-flakes') {
        const betaSrc = item.getAttribute('betaSrc');
        if (!betaSrc) {
          const tempSrc = item.src.split('/').slice(3).join('/');
          item.src = '/assets/loading.gif';
          item.setAttribute('betaSrc', tempSrc);
          item.setAttribute('identification', Date.now() + index + '');
        }
        if (item.getBoundingClientRect().y <= innerHeight) {
          const identification = item.getAttribute('identification');
          if (betaSrc) {
            if (!this.imgLazyLoadMap.has(identification)) {
              const img = new Image();
              img.src = betaSrc;
              img.onload = () => (item.src = betaSrc);
              this.imgLazyLoadMap.set(identification, 1);
            }
          }
        }
      }
    });
  }
}
