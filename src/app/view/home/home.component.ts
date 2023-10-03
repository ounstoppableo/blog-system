import { DrawerComponent } from '@/app/components/drawer/drawer.component';
import ViewResize from '@/app/decorators/viewResize';
import { HomeService } from '@/app/service/home.service';
import { addArticle, folderItem, tag } from '@/types/home/home';
import { resType } from '@/types/response/response';
import {
  AfterViewInit,
  Component,
  ComponentRef,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  //控制打字机效果的数据
  word = '';
  words = [
    'Hi~，我是一枚程序员',
    'Hi~，我喜欢探索新事物',
    '欢迎来到我的博客🎉',
  ];
  folderCategory: any;
  index = 0;
  headerChangeHeight!: number;
  @ViewChild('wordSpan')
  wordSpan!: ElementRef;
  @ViewChild('root')
  root!: ElementRef;

  //上传文章相关参数
  listOfOption: tag[] = []; //已有的标签选项
  ImgUploadLoading = false; //文章图片上传加载状态
  uploadLoading = false; //文章上传加载状态
  uploadFlag = false;
  formContent = new FormGroup<addArticle>({
    articleId: new FormControl(''),
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
    folderId: new FormControl('', [Validators.required]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(20),
      Validators.maxLength(100),
    ]),
    backImgUrl: new FormControl('', [Validators.required]),
    articleUrl: new FormControl('', [Validators.required]),
    listOfTagOptions: new FormControl([], [Validators.required]),
  });
  get title() {
    return this.formContent.get('title');
  }
  get folderId() {
    return this.formContent.get('folderId');
  }
  get description() {
    return this.formContent.get('description');
  }
  get backImgUrl() {
    return this.formContent.get('backImgUrl');
  }
  get articleUrl() {
    return this.formContent.get('articleUrl');
  }
  get listOfTagOptions() {
    return this.formContent.get('listOfTagOptions');
  }

  //抽屉相关
  @ViewChild('drawer')
  drawer!: any

  //页面大小变化的控制
  @ViewResize()
  smallSize = false //处于小尺寸窗口的判断

  constructor(
    private routes: ActivatedRoute,
    private router: Router,
    private homeService: HomeService,
    private message: NzMessageService,
  ) { }
  @ViewResize()
  ngOnInit(): void {
    this.homeService
      .getFolderCategory()
      .subscribe((res: resType<folderItem[]>) => {
        if (res.code === 200) this.folderCategory = res.data;
      });
  }
  @ViewResize()
  ngAfterViewInit(): void {
    //打字机效果控制
    const timer = setInterval(() => {
      if (this.index > this.word.length - 1) {
        if (this.words.length === 0) {
          clearInterval(timer);
        } else {
          const temp = this.word;
          this.word = this.words.shift() as string;
          const index = compareStr(temp, this.word);
          this.index = index > 0 ? index : 0;
          this.wordSpan.nativeElement.innerText = this.word.slice(
            0,
            this.index,
          );
        }
      }
      if (this.word[this.index]) {
        this.wordSpan.nativeElement.innerText =
          this.wordSpan.nativeElement.innerText + this.word[this.index];
        this.index++;
      }
    }, 300);
    //获取头部样式变化的高度
    this.headerChangeHeight = this.root.nativeElement.offsetHeight;
  }
  //滑动到内容区域
  toContainer() {
    const scrollTo = this.root.nativeElement.offsetHeight;
    window.scroll({
      top: scrollTo,
      left: 0,
      behavior: 'smooth',
    });
  }
  goHome() {
    if (this.routes.routeConfig?.path === 'home') {
      location.reload();
      window.scrollTo(0, 0);
    } else {
      this.router.navigate(['/home']);
    }
  }
  //显示上传模态框
  showUploadModal() {
    this.uploadFlag = true;
    this.homeService.getTags().subscribe((res: resType<tag[]>) => {
      if (res.code === 200) this.listOfOption = res.data as tag[];
    });
  }
  //上传图片前的钩子
  beforeUploadImg = (file: NzUploadFile) => {
    const maxSize = 5 * 1024 * 1024;
    if (file.size! > maxSize) {
      this.message.error('文件大小超出限制，请控制在5MB以内！');
      return false;
    }
    if (!file.type?.includes('image')) {
      this.message.error('只能上传图片！');
      return false;
    }
    return true;
  };
  //监测上传图片的进度
  handleUploadImgChange(e: any) {
    if (e.type === 'start') this.ImgUploadLoading = true;
    if (e.type === 'success') {
      this.ImgUploadLoading = false;
      if (e.file.response.code === 200) this.formContent.get('backImgUrl')!.setValue('/api' + e.file.response.data);
    }
  }
  //上传文件的回调
  handleUploadFileChange(e: any) {
    if (e.type === 'start') this.uploadLoading = true;
    if (e.type === 'success') {
      if (e.file.response.code === 200) {
        this.uploadLoading = false;
        this.articleUrl!.setValue(e.file.response.data);
      }
    }
  }
  //删除文件的回调
  removeFile = (file: any) => {
    this.uploadLoading = false;
    this.articleUrl!.setValue('');
    this.homeService
      .delFile(file.response.data)
      .subscribe((res: resType<any>) => {
        if (res.code === 200) return this.message.success('删除成功');
      });
    return true;
  };
  //取消的回调
  handleCancel() {
    this.uploadFlag = false;
  }
  //确认的回调
  handleOk() {
    if (this.formContent.valid) {
      this.homeService
        .uploadArticle(this.formContent.value)
        .subscribe((res: resType<any>) => {
          if (res.code === 200) {
            this.message.success('添加成功');
            this.uploadFlag = false;
            this.formContent.reset();
          }
        });
    } else {
      Object.values(this.formContent.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      if (this.backImgUrl?.invalid) this.message.error('请上传图片');
      if (this.articleUrl?.invalid) this.message.error('请上传文章');
    }
  }
  //抽屉相关方法
  open() {
    this.drawer.open()
  }
  @ViewResize()
  ngOnDestroy() {
    window.onresize = null;
  }
}
//字符串相同字段对比，返回最终相同下标
function compareStr(str1: string, str2: string): number {
  let index = 0;
  for (let i = 0; i < str1.length; i++) {
    if (str1[i] === str2[i]) index++;
    else break;
  }
  return index - 2;
}
