import { AddArticleFormComponent } from '@/app/components/add-article-form/add-article-form.component';
import { DrawerComponent } from '@/app/components/drawer/drawer.component';
import ViewResize from '@/app/decorators/viewResize';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-msg-borad-page',
  templateUrl: './msg-borad-page.component.html',
  styleUrls: ['./msg-borad-page.component.scss']
})
export class MsgBoradPageComponent {
  smallSize = false;
  headerChangeHeight = 0;
  @ViewChild('addArticleForm')
  addArticleForm!: AddArticleFormComponent;
  @ViewChild('drawer')
  drawer!: DrawerComponent;

  constructor(private route: ActivatedRoute) { }
  open() {
    this.drawer.open();
  }
  showUploadModal() {
    this.addArticleForm.showUploadModal();
  }

  @ViewResize()
  ngOnInit(): void { }
  @ViewResize()
  ngAfterViewInit(): void { }
  @ViewResize()
  ngOnDestroy(): void { }
}
