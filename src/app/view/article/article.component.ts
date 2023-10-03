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
import { ActivatedRoute } from '@angular/router';

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

  @ViewResize()
  smallSize = false;
  @ViewResize()
  ngOnInit() {
    this.route.params.subscribe((res) => (this.articleId = res['articleId']));
    this.articleService
      .getArticleInfo(this.articleId)
      .subscribe((res: resType<any>) => {
        if (res.code === 200) this.articleInfo = res.data;
      });
  }
  @ViewResize()
  ngAfterViewInit(): void {
    this.headerChangeHeight = this.backImg.nativeElement.offsetHeight;
  }
  @ViewResize()
  ngOnDestroy(): void {}
  open() {
    this.drawer.open();
  }
  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
  ) {}
}
