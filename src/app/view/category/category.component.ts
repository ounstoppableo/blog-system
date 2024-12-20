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

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  standalone: false,
})
export class CategoryComponent implements OnInit, AfterViewInit, OnDestroy {
  smallSize = false;
  isLogin = false;
  headerChangeHeight = 0;
  @ViewChild('addArticleForm')
  addArticleForm!: AddArticleFormComponent;
  @ViewChild('drawer')
  drawer!: DrawerComponent;
  dateCate = false;
  folderPage = false;
  tagCate = false;
  tagPage = false;
  category = false;
  search = false;
  constructor(
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller,
  ) {}
  open() {
    this.drawer.open();
  }
  showUploadModal() {
    this.addArticleForm.showUploadModal();
  }

  @ViewResize()
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
  }
  @ViewResize()
  ngAfterViewInit(): void {}
  @ViewResize()
  ngOnDestroy(): void {}

  scrollToAnchor() {
    this.route.fragment.subscribe((fragment: any) => {
      if (fragment) {
        this.viewportScroller.scrollToAnchor(fragment);
      }
    });
  }
  loginCheck() {
    this.isLogin = true;
  }
}
