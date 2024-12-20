import { BookService } from '@/app/service/book.service';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-display',
  templateUrl: './book-display.component.html',
  styleUrls: ['./book-display.component.scss'],
  standalone: false,
})
export class BookDisplayComponent implements OnInit {
  limit = 4;
  books: any[] = [];
  @Input()
  isLogin = false;
  smallSize: Observable<boolean>;
  constructor(
    private bookService: BookService,
    private message: NzMessageService,
    private store: Store<{ smallSize: boolean }>,
  ) {
    this.smallSize = store.select('smallSize');
  }
  ngOnInit(): void {
    this.getBooks();
  }
  getBooks() {
    this.bookService.getBooks(this.limit).subscribe((res) => {
      if (res.code === 200) {
        this.books = res.data;
      }
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
}
