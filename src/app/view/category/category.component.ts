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

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, AfterViewInit, OnDestroy {
  smallSize = false;
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
  constructor(private route: ActivatedRoute) {}
  open() {
    this.drawer.open();
  }
  showUploadModal() {
    this.addArticleForm.showUploadModal();
  }

  @ViewResize()
  ngOnInit(): void {
    this.route.url.subscribe((pathRes) => {
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
}
