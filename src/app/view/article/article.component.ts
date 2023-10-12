import ViewResize from '@/app/decorators/viewResize';
import { ArticleService } from '@/app/service/article.service';
import { articleInfo } from '@/types/overview/overview';
import { resType } from '@/types/response/response';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements AfterViewInit, OnInit, OnDestroy {
  articleId!: string;
  articleInfo: articleInfo = {} as articleInfo;
  headerChangeHeight!: number;
  @ViewChild('backImg')
  backImg!: ElementRef;

  @ViewChild('drawer')
  drawer!: any;

  //上传文章相关
  @ViewChild('addArticleForm')
  addArticleForm!: any;

  @ViewResize()
  smallSize = false;
  @ViewResize()
  ngOnInit() {
    this.route.params.subscribe((res) => (this.articleId = res['articleId']));
    this.articleService
      .getArticleInfo(this.articleId)
      .subscribe((res: resType<articleInfo>) => {
        if (res.code === 200) this.articleInfo = res.data as articleInfo;
      });
  }
  @ViewResize()
  ngAfterViewInit(): void {
    this.headerChangeHeight = this.backImg.nativeElement.offsetHeight;
  }
  @ViewResize()
  ngOnDestroy(): void { }
  //打开抽屉
  open() {
    this.drawer.open();
  }
  //显示上传文章模态框
  showUploadModal() {
    this.addArticleForm.showUploadModal();
  }
  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }
  toBelongFile(folderId: string) {
    this.router.navigate(['folderPage', folderId]);
  }
}
