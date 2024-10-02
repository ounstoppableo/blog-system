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
    this.route.params.subscribe(
      (res: any) => (this.articleId = res['articleId']),
    );
    this.articleService
      .getArticleInfo(this.articleId)
      .subscribe((res: resType<articleInfo>) => {
        if (res.code === 200)
          this.articleInfo = {
            ...this.articleInfo,
            ...res.data,
          } as articleInfo;
      });
  }
  @ViewResize()
  ngAfterViewInit(): void {
    this.headerChangeHeight = Number.parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue(
        '--articleBkImgHeight',
      ),
    );
  }
  @ViewResize()
  ngOnDestroy(): void {}
  //打开抽屉
  open() {
    this.drawer.open();
  }
  //显示上传文章模态框
  showUploadModal() {
    this.addArticleForm.showUploadModal();
  }

  // 从文章详情页获取文章字数和阅读时长
  getWordsCountAndReadTime(e: any) {
    this.articleInfo = { ...this.articleInfo, ...e };
  }

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}
  toBelongFile(folderId: string) {
    this.router.navigate(['folderPage', folderId]);
  }
}
