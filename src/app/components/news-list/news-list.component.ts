import { NewsService } from '@/app/service/news.service';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import dayjs from 'dayjs';

@Component({
    selector: 'app-news-list',
    templateUrl: './news-list.component.html',
    styleUrls: ['./news-list.component.scss'],
    standalone: false
})
export class NewsListComponent implements OnInit, AfterViewInit {
  constructor(private newsService: NewsService) {}
  newsList!: any[];
  currentNews: any;
  page: any;
  total: any;
  @Output() newsShowControl = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.newsService.getNews().subscribe((res: any) => {
      if (res.code === 200) {
        if (res.result.newslist && res.result.newslist.length !== 0) {
          this.newsShowControl.emit(true);
          this.newsList = res.result.newslist;
          this.page = 0;
          this.total = this.newsList.length;
          this.currentNews = res.result.newslist[this.page];
        } else {
          this.newsShowControl.emit(false);
        }
      } else {
        this.newsShowControl.emit(false);
      }
    });
  }
  dealNewsDescription(description: string) {
    return description.endsWith('[阅读更多]')
      ? description.slice(0, description.length - 6)
      : description;
  }
  getNumberArray(count: number) {
    return Array.from({ length: count }, (_, index) => index);
  }
  getYear(time: any) {
    return dayjs(time).year();
  }
  getDay(time: any) {
    return dayjs(time).date();
  }
  getMonth(time: any) {
    return dayjs(time).month();
  }
  ngAfterViewInit(): void {}
  nextPage() {
    if (this.page === this.total - 1) {
      this.page = 0;
      this.currentNews = this.newsList[this.page];
    } else {
      this.currentNews = this.newsList[++this.page];
    }
  }
  prevPage() {
    if (this.page === 0) {
      this.page = this.total - 1;
      this.currentNews = this.newsList[this.page];
    } else {
      this.currentNews = this.newsList[--this.page];
    }
  }
  togglePage(e: any) {
    if (e.target.nodeName === 'LI') {
      if (!e.target.className.includes('active')) {
        e.target.parentElement
          .querySelector('.active')
          .classList.remove('active');
        e.target.classList.add('active');
        this.page = +e.target.dataset.index;
        this.currentNews = this.newsList[this.page];
      }
    }
  }
}
