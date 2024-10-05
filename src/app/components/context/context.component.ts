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
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { marked } from 'marked';
import { resType } from '@/types/response/response';
import addHighLight from '@/utils/addHighLight';
import addMathJax from '@/utils/addMathJax';
import { NzImageService } from 'ng-zorro-antd/image';

@Component({
  selector: 'app-context',
  templateUrl: './context.component.html',
  styleUrls: ['./context.component.scss'],
})
export class ContextComponent
  implements OnInit, AfterViewChecked, AfterContentInit, OnDestroy
{
  article = '';
  articleId = '';
  showPayCode = false;
  location = window.location;
  articleTitleTree: any[] = []; //文章标题树，用于构建目录
  @Input()
  isLogin = false;
  @Input()
  smallSize!: boolean;
  @Output()
  getCatalogue = new EventEmitter();
  @Output()
  getWordsCountAndReadTime = new EventEmitter();
  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router,
    private nzImageService: NzImageService,
  ) {}
  loading = true;
  //前后文章的信息
  preInfo = {} as { pre: string; preTitle: string; prebackImgUrl: string };
  nextInfo = {} as { next: string; nextTitle: string; nextbackImgUrl: string };
  hljsScript: any = null;

  write: any = null;
  ngOnInit() {
    this.route.params.subscribe((res) => (this.articleId = res['articleId']));
    this.getPreAndNextArticleInfo();
    this.getArticle();
  }
  //获取前一个和后一个文章
  getPreAndNextArticleInfo() {
    this.articleService
      .getPreAndNextArticleInfo(this.articleId)
      .subscribe((res: resType<any>) => {
        if (res.code === 200) {
          this.preInfo = res.data;
          this.nextInfo = res.data;
        }
      });
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
    this.articleService.getArticle(this.articleId).subscribe((res) => {
      if (res.code === 200) {
        this.getWordsCountAndReadTime.emit({
          wordsCount: res.data.words,
          readTime: res.data.text,
        });
        let article = marked.parse(res.data.articleContent) as string;
        const articleTitleList = article.match(
          /<h[1-6]{1}>.*?<\/h[1-6]{1}>/g,
        ) as any[];
        this.articleTitleTree = this.articleTitleListToTree(
          articleTitleList,
          true,
        );
        this.getCatalogue.emit(this.articleTitleTree);
        article = article.replace(
          /<h[1-6]{1}>.*?<\/h[1-6]{1}>/g,
          (match: string) => {
            const temp = match.split('<');
            const tagEnd = temp[2];
            const temp2 = temp[1].split('>');
            const tagStart = temp2[0];
            const title = temp2[1];
            return `<${tagStart} id="${title.replace(
              /[\(\-\)\$0-9\.\s\&\@\;]/g,
              '',
            )}">${title}<${tagEnd}`;
          },
        );
        this.article = article;
        this.loading = false;
      }
    });
  }
  //根据文章标题列表获取文章标题树
  articleTitleListToTree(articleTitleList: string[], flag = false) {
    const tree: any[] = [];
    let firstSon: any = null;
    let stopFlag = false;
    articleTitleList.forEach((item, index) => {
      if (!stopFlag) {
        const temp = this.tagSplit(item);
        if (!tree.length || temp.tagLevel === tree[tree.length - 1].tagLevel) {
          tree.push({ ...temp, children: [] });
          firstSon = null;
        } else if (temp.tagLevel < tree[tree.length - 1].tagLevel) {
          if (flag) {
            tree.push({ ...temp, children: [] });
            firstSon = null;
          }
          if (!flag) return (stopFlag = true);
        } else if (temp.tagLevel > tree[tree.length - 1].tagLevel) {
          if (!firstSon) {
            firstSon = temp;
          }
          if (firstSon === temp) {
            tree[tree.length - 1].children = this.articleTitleListToTree(
              articleTitleList.slice(index),
            );
          }
        }
      }
    });
    return tree;
  }
  //标题标签拆解器
  tagSplit(tagString: string) {
    const temp = tagString.split('<')[1].split('>');
    const title = temp[1];
    const tagLevel = +temp[0].split('h')[1];
    return {
      title,
      tagLevel,
    };
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
  ngOnDestroy() {
    document.removeEventListener('click', this._scrollToAnchor);
    this.write.removeEventListener('click', this._replaceImgToNzImg);
  }
}
