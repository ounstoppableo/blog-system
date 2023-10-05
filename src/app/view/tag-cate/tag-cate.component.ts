import { AddArticleFormComponent } from '@/app/components/add-article-form/add-article-form.component';
import { DrawerComponent } from '@/app/components/drawer/drawer.component';
import ViewResize from '@/app/decorators/viewResize';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tag-cate',
  templateUrl: './tag-cate.component.html',
  styleUrls: ['./tag-cate.component.scss'],
})
export class TagCateComponent {
  smallSize = false;
  headerChangeHeight = 0;
  @ViewChild('addArticleForm')
  addArticleForm!: AddArticleFormComponent;
  @ViewChild('drawer')
  drawer!: DrawerComponent;
  open() {
    this.drawer.open();
  }
  showUploadModal() {
    this.addArticleForm.showUploadModal();
  }

  @ViewResize()
  ngOnInit(): void {}
  @ViewResize()
  ngAfterViewInit(): void {}
  @ViewResize()
  ngOnDestroy(): void {}
}
