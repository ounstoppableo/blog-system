import { HomeService } from '@/app/service/home.service';
import { LoginService } from '@/app/service/login';
import { articleInfo } from '@/types/overview/overview';
import { resType } from '@/types/response/response';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { AddArticleFormComponent } from '../add-article-form/add-article-form.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger,
} from '@angular/animations';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  animations: [
    trigger('toShow', [
      transition('*=>*', [
        query(
          '.card',
          [
            style({ opacity: 0 }),
            stagger(300, [animate('0.5s', style({ opacity: 1 }))]),
          ],
          { optional: true },
        ),
      ]),
    ]),
  ],
})
export class OverviewComponent implements OnInit, OnChanges {
  isLogin = false;
  @Input()
  articleInfoList: articleInfo[] = [];
  articleInfoLazyList: articleInfo[] = [];
  lazyLoadIndex = 0;
  @Input()
  smallSize!: boolean;
  //模态框组件
  @Input()
  updateArticleModal!: AddArticleFormComponent;
  @Input()
  page = 1;
  @Input()
  limit = 5;
  @Input()
  total = 0;
  @Output()
  nextPage = new EventEmitter();
  @ViewChild('cardContainerLeft')
  cardContainerLeft!: any;

  constructor(
    private homeService: HomeService,
    private router: Router,
    private loginService: LoginService,
    private message: NzMessageService,
  ) {}
  ngOnChanges(): void {
    this.lazyLoadGetItem();
  }
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.loginService.getUserInfo().subscribe((res) => {
        if (res.code === 200) this.isLogin = true;
        else this.isLogin = false;
      });
    }
    //懒加载
    // window.addEventListener('scroll', this.lazyLoad.bind(this));
  }
  lazyLoad() {
    if (this.cardContainerLeft) {
      const elems =
        this.cardContainerLeft.nativeElement.querySelectorAll('.card');
      if (
        innerHeight - elems[elems.length - 1].getBoundingClientRect().y >
          elems[elems.length - 1].offsetHeight &&
        this.lazyLoadIndex < this.articleInfoList.length
      ) {
        this.lazyLoadGetItem();
      }
    }
  }
  lazyLoadGetItem() {
    // if (this.articleInfoList.length !== 0 && this.lazyLoadIndex <= this.articleInfoList.length) {
    //   this.articleInfoLazyList = [
    //     ...this.articleInfoLazyList,
    //     ...this.articleInfoList.slice(this.lazyLoadIndex, this.lazyLoadIndex + 3 > this.articleInfoList.length ? this.articleInfoList.length : this.lazyLoadIndex + 3)
    //   ];
    //   this.lazyLoadIndex += 3;
    // }
  }
  toArticle(articleId: string) {
    this.router.navigate(['article', articleId]);
  }
  //更新文章
  editArticle(item: articleInfo) {
    const listOfTagOptions = item.tags.map((tag) => tag.tagName);
    this.updateArticleModal.showUploadModal({ ...item, listOfTagOptions });
  }
  //删除文章
  delArticle(articleId: string) {
    this.homeService.delArticle(articleId).subscribe((res: resType<any>) => {
      if (res.code === 200) this.message.success('删除成功!');
    });
  }
  pageIndexChange(page: number) {
    this.nextPage.emit(page);
    this.lazyLoadIndex = 0;
  }
  //去日期分类页
  toDateCate() {
    this.router.navigate(['dateCate']);
  }
  //去文件分类页
  toFolderCate() {
    this.router.navigate(['category']);
  }
}
