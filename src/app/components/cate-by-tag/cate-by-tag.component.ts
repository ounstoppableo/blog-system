import { CategoryService } from '@/app/service/category.service';
import { tag } from '@/types/home/home';
import { resType } from '@/types/response/response';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cate-by-tag',
  templateUrl: './cate-by-tag.component.html',
  styleUrls: ['./cate-by-tag.component.scss'],
  standalone: false,
})
export class CateByTagComponent implements OnInit {
  smallSize: Observable<boolean>;
  @Input()
  isLogin = false;
  @Input()
  showMsgAndArticle = true;
  tags: tag[] = [];
  loading = true;
  constructor(
    private categoryService: CategoryService,
    private store: Store<{ smallSize: boolean }>,
  ) {
    this.smallSize = store.select('smallSize');
  }
  ngOnInit(): void {
    this.categoryService
      .getArticleInTagCount()
      .subscribe((res: resType<any>) => {
        this.loading = false;
        if (res.code === 200) this.tags = res.data;
      });
  }
}
