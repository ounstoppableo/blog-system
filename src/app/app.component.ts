import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'my-blog';
  darkMode = false;
  isArticle = false;
  firstLoad = true
  @ViewChild('operate')
  operate!: ElementRef;
  constructor(private router: Router) { }
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd)
        this.isArticle = event.url.includes('article');
    });
    if (this.firstLoad) {
      this.loadCss(`./assets/darkMode.scss`, 'dark').finally(() => {
        document.getElementById('dark')?.remove()
        this.firstLoad = false
      })
    }
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
        document.documentElement.classList.add('dark')
      })
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
      style.onload = resolve
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
}
