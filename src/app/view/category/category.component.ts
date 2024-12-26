import { AddArticleFormComponent } from '@/app/components/add-article-form/add-article-form.component';
import { DrawerComponent } from '@/app/components/drawer/drawer.component';
import ViewResize from '@/app/decorators/viewResize';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  standalone: false,
})
export class CategoryComponent implements OnInit {
  isLogin: Observable<boolean>;
  isLeave = false;
  headerChangeHeight = 0;
  dateCate = false;
  folderPage = false;
  tagCate = false;
  tagPage = false;
  category = false;
  search = false;
  smallSize: Observable<boolean>;
  setIsLeaveTimeout: any;
  constructor(
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller,
    private store: Store<{ smallSize: boolean; isLogin: boolean }>,
  ) {
    this.smallSize = store.select('smallSize');
    this.isLogin = store.select('isLogin');
  }
  ngOnInit(): void {
    this.route.url.subscribe((pathRes: any) => {
      type path =
        | 'dateCate'
        | 'folderPage'
        | 'tagCate'
        | 'tagPage'
        | 'category'
        | 'search';
      this[pathRes[0].path as path] = true;
    });
    this.toSetIsLeaveToFalse();
  }

  toSetIsLeaveToFalse = () => {
    this.route.url.subscribe((res: any) => {
      if (this.setIsLeaveTimeout) clearTimeout(this.setIsLeaveTimeout);
      setTimeout(() => {
        this.isLeave = false;
      }, 1000);
    });
  };

  scrollToAnchor() {
    this.route.fragment.subscribe((fragment: any) => {
      if (fragment) {
        this.viewportScroller.scrollToAnchor(fragment);
      }
    });
  }
}
