import { CategoryService } from '@/app/service/category.service';
import { dateCaterory } from '@/types/category/category';
import { articleInfo } from '@/types/overview/overview';
import { resType } from '@/types/response/response';
import { Component, Input, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger,
} from '@angular/animations';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-cate-by-date',
  templateUrl: './cate-by-date.component.html',
  styleUrls: ['./cate-by-date.component.scss'],
  animations: [
    trigger('toShow', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-50%)' }),
            stagger(100, [
              animate(
                '0.5s',
                style({ opacity: 1, transform: 'translateY(0)' }),
              ),
            ]),
          ],
          { optional: true },
        ),
      ]),
    ]),
  ],
  standalone: false,
})
export class CateByDateComponent implements OnInit, OnDestroy {
  smallSize: Observable<boolean>;
  dateCategory: dateCaterory[] = [];
  loading = true;
  constructor(
    private catecogyService: CategoryService,
    private router: Router,
    private store: Store<{ smallSize: boolean; isLogin: boolean }>,
  ) {
    this.smallSize = store.select('smallSize');
    this.isLogin = store.select('isLogin');
  }
  subscriptionList: any[] = [];
  isLogin: Observable<boolean>;
  @Output()
  scrollToAnchor = new EventEmitter();
  ngOnInit(): void {
    this.getDateCategoty();
  }
  getDateCategoty() {
    this.subscriptionList.push(
      this.catecogyService
        .getAllArticleInfo()
        .subscribe((res: resType<articleInfo[]>) => {
          this.loading = false;
          if (res.code === 200) {
            const dateCate = Array.from(
              new Set(
                (res.data as articleInfo[]).map((item: articleInfo) => {
                  return item.lastModifyTime.slice(0, 7);
                }),
              ),
            );
            dateCate.forEach((dateCateItem) => {
              this.dateCategory.push({
                dateCate: dateCateItem,
                articleInfos: (res.data as articleInfo[]).filter((item) =>
                  item.lastModifyTime.includes(dateCateItem),
                ),
              });
            });
            setTimeout(() => {
              this.scrollToAnchor.emit();
            }, 0);
          }
        }),
    );
  }
  toArticle(articleId: string) {
    this.router.navigate(['article', articleId]);
  }
  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscripion) => {
      subscripion.unsubscribe();
    });
  }
}
