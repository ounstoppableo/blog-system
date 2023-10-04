import { ArticleService } from '@/app/service/article.service';
import { AfterViewChecked, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import hljs from 'highlight.js';

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
  @Input()
  smallSize!: boolean;
  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((res) => (this.articleId = res['articleId']));
    this.articleService.getArticle(this.articleId).subscribe((res) => {
      if (res.code === 200) this.article = res.data.articleContent;
    });
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
