import { CategoryService } from '@/app/service/category.service';
import { articleInFolderCount } from '@/types/category/category';
import { resType } from '@/types/response/response';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-folder-cate',
  templateUrl: './folder-cate.component.html',
  styleUrls: ['./folder-cate.component.scss'],
  standalone: false,
})
export class FolderCateComponent implements OnInit {
  smallSize!: Observable<boolean>;
  @Input()
  isLogin = false;
  @Input()
  showMsgAndArticle = true;
  folders: articleInFolderCount[] = [];
  loading = true;
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private store: Store<{ smallSize: boolean }>,
  ) {
    this.smallSize = store.select('smallSize');
  }
  ngOnInit(): void {
    this.categoryService
      .getArticleInFolderCount()
      .subscribe((res: resType<any>) => {
        this.loading = false;
        if (res.code === 200) this.folders = res.data as articleInFolderCount[];
      });
  }
  toSingleFolderCate(folderId: number) {
    this.router.navigate(['folderPage', folderId]);
  }
}
