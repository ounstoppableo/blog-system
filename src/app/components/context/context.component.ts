import { ArticleService } from '@/app/service/article.service';
import {
  AfterViewChecked,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { marked } from 'marked';
import { DomSanitizer } from '@angular/platform-browser';
import { resType } from '@/types/response/response';

@Component({
  selector: 'app-context',
  templateUrl: './context.component.html',
  styleUrls: ['./context.component.scss'],
})
export class ContextComponent implements OnInit, AfterViewChecked {
  article = '';
  articleId = '';
  articleTitleTree: any[] = []; //文章标题树，用于构建目录
  @Input()
  smallSize!: boolean;
  @Output()
  getCatalogue = new EventEmitter();
  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private sanitized: DomSanitizer,
    private router: Router,
  ) {}
  loading = true;
  //前后文章的信息
  pre = '';
  preTitle = '';
  next = '';
  nextTitle = '';
  hljsScript: any = null;
  ngOnInit() {
    this.route.params.subscribe((res) => (this.articleId = res['articleId']));
    this.route.queryParams.subscribe((res) => {
      this.pre = res['pre'];
      this.next = res['next'];
      this.preTitle = res['preTitle'];
      this.nextTitle = res['nextTitle'];
    });
    this.getPreAndNextArticleInfo();
    this.getArticle();
  }
  //获取前一个和后一个文章
  getPreAndNextArticleInfo() {
    this.articleService
      .getPreAndNextArticleInfo(this.articleId)
      .subscribe((res: resType<any>) => {
        if (res.code === 200) {
          this.pre = res.data.pre;
          this.preTitle = res.data.preTitle;
          this.next = res.data.next;
          this.nextTitle = res.data.nextTitle;
        }
      });
  }
  //获取文章内容
  getArticle() {
    this.articleService.getArticle(this.articleId).subscribe((res) => {
      if (res.code === 200) {
        let article = marked.parse(res.data.articleContent);
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
              /[\(\-\)\$0-9\.\s\&\;]/g,
              '',
            )}">${title}<${tagEnd}`;
          },
        );
        this.article = this.sanitized.bypassSecurityTrustHtml(
          article,
        ) as string;
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
    //hljsScript按需加载
    if (!this.hljsScript) {
      const code = `
      hljs.configure({ ignoreUnescapedHTML: true});
      document.querySelectorAll('pre code').forEach((el) => {
        const languageArr = el.className.split('-');
        if (languageArr.length !== 2) { hljs.highlightElement(el); return true; };
        const language = languageArr[1].trim();
        if (hljs.getLanguage(language)) { hljs.highlightElement(el); return true; } el.className = 'language-javascript hljs';
        hljs.highlightElement(el);
      });`;
      this.hljsScript = document.createElement('script');
      this.hljsScript.src =
        'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js';
      this.hljsScript.onload = () => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        try {
          script.appendChild(document.createTextNode(code));
        } catch (e) {
          script.text = code;
        } finally {
          document.body.appendChild(script);
        }
      };
      document.head.appendChild(this.hljsScript);
    }
  }
  toArticle(articleId: string) {
    this.router.navigate(['article', articleId]);
  }
}
