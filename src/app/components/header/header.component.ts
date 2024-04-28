import { LoginService } from '@/app/service/login';
import { resType } from '@/types/response/response';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MusicUploadFormComponent } from '../music-upload-form/music-upload-form.component';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy, AfterViewInit, OnInit {
  originScrollY = 0;
  scrollDerection = 'down';
  isLogin = false;
  @Input()
  defaultShow = false;
  @ViewChild('container')
  container!: ElementRef;
  @Input()
  scrollTarget!: number;
  @Input()
  showFolderIcon!: boolean; //是否显示folder图标
  @Output()
  upload = new EventEmitter();
  @Output()
  drawerOpen = new EventEmitter();

  constructor(
    private router: Router,
    private ls: LoginService,
    private ms: NzModalService,
    private message: NzMessageService,
  ) {}
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.ls.getUserInfo().subscribe((res: resType<any>) => {
        if (res.code === 200) this.isLogin = true;
      });
    }
  }
  goHome() {
    this.router.navigate(['home']);
  }
  goMsgBoard() {
    this.router.navigate(['msgboard']);
  }
  login() {
    this.router.navigate(['/login']);
  }
  ngAfterViewInit(): void {
    this.fixedBtnShowControl();
    window.addEventListener('scroll', this.onScroll);
    if (this.defaultShow) {
      this.container.nativeElement.classList.add('active');
      this.container.nativeElement.classList.remove('hidden');
    }
  }
  //去搜索页面
  goSearch() {
    this.router.navigate(['search']);
  }
  //页面定位按钮的显示隐藏控制
  fixedBtnShowControl() {
    if (window.scrollY >= this.scrollTarget) {
      document.getElementById('operate')!.style.opacity = '1';
    } else {
      document.getElementById('operate')!.style.opacity = '0';
    }
  }
  //监控滚动事件
  onScroll = () => {
    this.originScrollY < window.scrollY
      ? (this.scrollDerection = 'down')
      : (this.scrollDerection = 'up');
    this.originScrollY = window.scrollY;
    if (window.scrollY >= this.scrollTarget) {
      this.container.nativeElement.classList.add('active');
      if (this.scrollDerection === 'down') {
        this.container.nativeElement.classList.add('hidden');
      } else {
        this.container.nativeElement.classList.remove('hidden');
      }
    } else {
      this.container.nativeElement.classList.remove('active');
      this.container.nativeElement.classList.remove('hidden');
    }
    this.fixedBtnShowControl();
  };
  //组件销毁同时清除滚动事件
  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll);
  }
  //folder展开
  folderShow() {
    this.drawerOpen.emit();
  }
  goDateCate() {
    this.router.navigate(['dateCate']);
  }
  goFolderCate() {
    this.router.navigate(['category']);
  }
  goTagCate() {
    this.router.navigate(['tagCate']);
  }
  liOnMouseOver(listRef: any) {
    listRef.classList.add('listActive');
  }
  liOnMouseLeave(listRef: any) {
    listRef.classList.remove('listActive');
  }
  goChatPlatform() {
    const a = document.createElement('a');
    a.href = 'https://www.unstoppable840.cn:8080';
    a.click();
  }

  //添加音乐
  addMusic() {
    const msRef = this.ms.create({
      nzTitle: '上传音乐',
      nzContent: MusicUploadFormComponent,
      nzOnOk: async () => {
        const state = msRef.componentInstance?.submitForm();
        if (state === 'incorrectParam') return false;
      },
      nzOnCancel: () => {
        msRef.componentInstance?.close();
      },
    });
  }
}
