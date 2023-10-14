import { ArticleService } from '@/app/service/article.service';
import {
  AfterViewChecked,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import hljs from 'highlight.js';
import { marked } from 'marked';
import { DomSanitizer } from '@angular/platform-browser';

hljs.configure({
  ignoreUnescapedHTML: true,
});
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
  ) {}
  loading=true

  ngOnInit() {
    this.route.params.subscribe((res) => (this.articleId = res['articleId']));
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
        this.loading=false
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
    document.querySelectorAll('pre code').forEach((el: any) => {
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
    });
  }
}
