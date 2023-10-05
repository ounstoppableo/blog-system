import { AddArticleFormComponent } from '@/app/components/add-article-form/add-article-form.component';
import { DrawerComponent } from '@/app/components/drawer/drawer.component';
import ViewResize from '@/app/decorators/viewResize';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-date-cate',
  templateUrl: './date-cate.component.html',
  styleUrls: ['./date-cate.component.scss']
})
export class DateCateComponent implements OnInit, AfterViewInit, OnDestroy {
  smallSize = false
  headerChangeHeight = 0
  @ViewChild('addArticleForm')
  addArticleForm!: AddArticleFormComponent
  @ViewChild('drawer')
  drawer!: DrawerComponent
  open() {
    this.drawer.open()
  }
  showUploadModal() {
    this.addArticleForm.showUploadModal()
  }

  @ViewResize()
  ngOnInit(): void { }
  @ViewResize()
  ngAfterViewInit(): void { }
  @ViewResize()
  ngOnDestroy(): void {
  }
}
