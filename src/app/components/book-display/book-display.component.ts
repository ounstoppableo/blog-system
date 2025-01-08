import { BookService } from '@/app/service/book.service';
import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-display',
  templateUrl: './book-display.component.html',
  styleUrls: ['./book-display.component.scss'],
  standalone: false,
})
export class BookDisplayComponent implements AfterViewInit, OnDestroy {
  limit = 4;
  booksRaw: any[] = [];
  books: any[] = [];
  isLogin: Observable<boolean>;
  smallSize: Observable<boolean>;
  @ViewChild('card')
  card!: any;
  constructor(
    private bookService: BookService,
    private message: NzMessageService,
    private store: Store<{ smallSize: boolean; isLogin: boolean }>,
  ) {
    this.smallSize = store.select('smallSize');
    this.isLogin = store.select('isLogin');
  }
  resizeCb = () => {
    const bookWidth = Number.parseFloat(
      getComputedStyle(this.card.nativeElement).getPropertyValue('--bookWidth'),
    );
    const count = Math.floor(
      Number.parseFloat(getComputedStyle(this.card.nativeElement).width) /
        (bookWidth + 80),
    );
    this.books = this.booksRaw.slice(0, count);
  };
  ngAfterViewInit(): void {
    this.getBooks().then(() => {
      this.resizeCb();
      window.addEventListener('load', this.resizeCb);
      window.addEventListener('resize', this.resizeCb);
    });
  }
  getBooks() {
    return new Promise((resolve) => {
      this.bookService.getBooks(this.limit).subscribe((res) => {
        if (res.code === 200) {
          this.booksRaw = res.data;
        }
        resolve(1);
      });
    });
  }
  deleteBook(e: any, bookUrl: string) {
    this.bookService.deleteBook(bookUrl).subscribe((res) => {
      if (res.code === 200) {
        this.message.success('删除成功！');
        this.getBooks();
      } else {
        this.message.error('删除失败！');
      }
    });
  }
  ngOnDestroy(): void {
    window.removeEventListener('load', this.resizeCb);
    window.removeEventListener('resize', this.resizeCb);
  }
}
