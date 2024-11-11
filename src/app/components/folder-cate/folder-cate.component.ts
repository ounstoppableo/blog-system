import { CategoryService } from '@/app/service/category.service';
import { articleInFolderCount } from '@/types/category/category';
import { resType } from '@/types/response/response';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-folder-cate',
  templateUrl: './folder-cate.component.html',
  styleUrls: ['./folder-cate.component.scss'],
})
export class FolderCateComponent implements OnInit {
  @Input()
  smallSize!: boolean;
  @Input()
  showMsgAndArticle = true;
  folders: articleInFolderCount[] = [];
  loading = true;
  constructor(
    private categoryService: CategoryService,
    private router: Router,
  ) {}
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
