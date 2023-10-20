import { ArticleService } from '@/app/service/article.service';
import {
  AfterViewChecked,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { marked } from 'marked';
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
    private router: Router,
  ) {}
  loading = true;
  //前后文章的信息
  pre = '';
  preTitle = '';
  next = '';
  nextTitle = '';
  hljsScript: any = null;

  write: any = null;
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
    //监控路由变化
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.url.includes('article')) {
          document.getElementById('hljs')?.remove();
          document.getElementById('hljsExec')?.remove();
        }
      }
    });
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
  //插入文章内容并渲染高亮
  insertArticle() {
    this.write.innerHTML = this.article;
    const code = `
    hljs.configure({ ignoreUnescapedHTML: true });
    document.querySelectorAll('pre code').forEach((el) => {
      const languageArr = el.className.split('-');
      if (languageArr.length !== 2) {
        hljs.highlightElement(el);
        return true;
      }
      const language = languageArr[1].trim();
      if (hljs.getLanguage(language)) {
        hljs.highlightElement(el);
        return true;
      }
      el.className = 'language-javascript hljs';
      hljs.highlightElement(el);
    });`;
    const hljsScript = document.createElement('script');
    hljsScript.id = 'hljs';
    hljsScript.src =
      'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js';
    document.body.append(hljsScript);
    hljsScript.onload = () => {
      const script = document.createElement('script');
      script.id = 'hljsExec';
      try {
        script.appendChild(document.createTextNode(code));
      } catch (e) {
        script.text = code;
      } finally {
        document.body.append(script);
      }
    };
  }
  //获取文章内容
  getArticle() {
    this.loading = true;
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
}
