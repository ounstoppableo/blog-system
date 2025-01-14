import { ArticleService } from '@/app/service/article.service';
import {
  AfterViewChecked,
  AfterContentInit,
  OnDestroy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { marked } from 'marked';
import { resType } from '@/types/response/response';
import addHighLight from '@/utils/addHighLight';
import addMathJax from '@/utils/addMathJax';
import { NzImageService } from 'ng-zorro-antd/image';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { setCatalogue } from '@/app/store/catalogueStore/catalogueStore.action';
import { setShowCatalogue } from '@/app/store/showCatalogueStore/catalogueStore.action';
import { clone, cloneDeep } from 'lodash';
import {
  articleTitleListToTree,
  articleGenerateTitleList,
  articleGenerateId,
} from '@/utils/articleFunction';
@Component({
  selector: 'app-context',
  templateUrl: './context.component.html',
  styleUrls: ['./context.component.scss'],
  standalone: false,
})
export class ContextComponent
  implements
    OnInit,
    AfterViewChecked,
    AfterContentInit,
    OnDestroy,
    AfterViewInit
{
  article = '';
  articleId = '';
  showPayCode = false;
  location = window.location;
  articleTitleTree: any[] = []; //文章标题树，用于构建目录
  isLogin: Observable<boolean>;
  showCatalogue: Observable<boolean>;
  smallSize: Observable<boolean>;
  subscriptionList: any[] = [];
  @Output()
  getWordsCountAndReadTime = new EventEmitter();
  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router,
    private nzImageService: NzImageService,
    private store: Store<{
      smallSize: boolean;
      isLogin: boolean;
      showCatalogue: boolean;
    }>,
  ) {
    this.smallSize = store.select('smallSize');
    this.isLogin = store.select('isLogin');
    this.showCatalogue = store.select('showCatalogue');
  }
  loading = true;
  //前后文章的信息
  preInfo = {} as { pre: string; preTitle: string; prebackImgUrl: string };
  nextInfo = {} as { next: string; nextTitle: string; nextbackImgUrl: string };
  hljsScript: any = null;

  write: any = null;
  ngOnInit() {
    this.subscriptionList.push(
      this.route.params.subscribe((res) => {
        this.articleId = res['articleId'];
      }),
    );
    this.subscriptionList.push(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          if (event.url.includes(this.articleId)) {
            this.store.dispatch(
              setCatalogue({
                data: cloneDeep(this.articleTitleTree),
              }),
            );
          }
        }
      }),
    );
    this.getPreAndNextArticleInfo();
    this.getArticle();
  }
  //获取前一个和后一个文章
  getPreAndNextArticleInfo() {
    this.subscriptionList.push(
      this.articleService
        .getPreAndNextArticleInfo(this.articleId)
        .subscribe((res: resType<any>) => {
          if (res.code === 200) {
            this.preInfo = res.data;
            this.nextInfo = res.data;
          }
        }),
    );
  }
  //插入文章内容并渲染高亮以及数学处理
  insertArticle() {
    this.write.innerHTML = this.article;
    addHighLight();
    addMathJax();
    this.write.addEventListener('click', this._replaceImgToNzImg);
  }
  //获取文章内容
  getArticle() {
    this.loading = true;
    this.subscriptionList.push(
      this.articleService.getArticle(this.articleId).subscribe((res) => {
        if (res.code === 200) {
          this.getWordsCountAndReadTime.emit({
            wordsCount: res.data.words,
            readTime: res.data.text,
          });

          let article = marked.parse(
            res.data.articleContent.replace(
              /\$\$([\s\S]+?)\$\$/g,
              (match: any, math: any) => {
                math = math.replace(/\\\\/g, '@@line_break@@');
                return `$$${math}$$`;
              },
            ),
          ) as string;
          article = article.replace(/@@line_break@@/g, '\\\\');
          const articleTitleList = articleGenerateTitleList(article);
          this.articleTitleTree = articleTitleListToTree(
            articleTitleList,
            true,
          );
          this.store.dispatch(
            setCatalogue({
              data: cloneDeep(this.articleTitleTree),
            }),
          );
          article = articleGenerateId(article);
          this.article = article;
          this.loading = false;
        }
      }),
    );
  }
  ngAfterViewChecked(): void {
    if (!this.write) {
      this.write = document.getElementById('write');
      if (!this.article) {
        this.write = null;
      }
      if (this.write) {
        this.insertArticle();
      }
    }
  }
  toArticle(articleId: string) {
    this.router.navigate(['article', articleId]);
  }
  handleShowPayCode() {
    this.showPayCode = !this.showPayCode;
  }
  ngAfterContentInit() {
    document.addEventListener('click', this._scrollToAnchor);
  }
  private _scrollToAnchor(e: any) {
    if (
      (e.target as any)?.nodeName === 'A' &&
      (e.target as any).href.includes('#')
    ) {
      e.preventDefault();
      const anchor = (e.target as any).href.split('#')[1];
      const element = document.getElementById(anchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
  private _replaceImgToNzImg = (e: any) => {
    if ((e.target as any)?.nodeName === 'IMG') {
      const imgInfo = {
        src: (e.target as any).src,
        alt: 'ng-zorro',
      };
      this.nzImageService.preview([imgInfo], { nzZoom: 1, nzRotate: 0 });
    }
  };
  closeCatalogueClickCb = (e: any) => {
    e.stopPropagation();
    if (
      !e.target.closest('.customDialogForCatalogue') &&
      !e.target.closest('.showCatalogueBtn')
    )
      this.closeCatalogue();
  };

  ngAfterViewInit(): void {
    window.addEventListener('click', this.closeCatalogueClickCb);
  }
  closeCatalogue = (e?: any) => {
    this.store.dispatch(setShowCatalogue({ flag: false }));
  };

  ngOnDestroy() {
    document.removeEventListener('click', this._scrollToAnchor);
    this.write.removeEventListener('click', this._replaceImgToNzImg);
    this.subscriptionList.forEach((subscripion) => {
      subscripion.unsubscribe();
    });
    window.removeEventListener('click', this.closeCatalogueClickCb);
  }
}
