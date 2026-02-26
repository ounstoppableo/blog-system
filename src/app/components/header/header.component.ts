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
  OnChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MusicUploadFormComponent } from '../music-upload-form/music-upload-form.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BookUploadFormComponentComponent } from '../book-upload-form-component/book-upload-form-component.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { setIsLogin } from '@/app/store/isLoginStore/isLoginStore.action';
import {
  handleSendMsg,
  iframeCommunicationProcessor,
  serverListener,
} from '@/utils/iframeCommunication/server';
import { appOpenMethodRequestParams } from '@/utils/iframeCommunication/type';
import { environment } from '@/environments/environment';
import { setAppOpenMethod } from '@/app/store/appOpenMethod/appOpenMethod.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
})
export class HeaderComponent
  implements OnDestroy, AfterViewInit, OnInit, OnChanges
{
  originScrollY = 0;
  scrollDerection = 'down';
  isLogin: Observable<boolean>;
  appOpenMethod: Observable<string>;
  @Input()
  defaultShow = false;
  @ViewChild('container')
  container!: ElementRef;
  @Input()
  scrollTarget: number = 0;
  @Input()
  smallSize!: Observable<boolean>; //是否显示folder图标
  @Output()
  upload = new EventEmitter();
  @Output()
  drawerOpen = new EventEmitter();
  subscriptionList: any[] = [];

  constructor(
    private router: Router,
    private ls: LoginService,
    private ms: NzModalService,
    private message: NzMessageService,
    private store: Store<{
      smallSize: boolean;
      isLogin: boolean;
      appOpenMethod: string;
    }>,
  ) {
    this.smallSize = store.select('smallSize');
    this.isLogin = store.select('isLogin');
    this.appOpenMethod = store.select('appOpenMethod');
  }
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.subscriptionList.push(
        this.ls.getUserInfo().subscribe((res: resType<any>) => {
          if (res.code === 200) {
            this.store.dispatch(setIsLogin({ flag: true }));
          }
        }),
      );
    }
  }
  ngOnChanges(changes: any): void {
    if (changes['defaultShow']) {
      if (this.defaultShow) {
        this.container.nativeElement.classList.add('active');
        this.container.nativeElement.classList.remove('hidden');
      }
    }
    if (changes['scrollTarget']) {
      this.onScroll();
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
    this.onScroll();
    window.addEventListener('scroll', this.onScroll);
    iframeCommunicationProcessor['appOpenMethodrocessor'] = {
      tag: 'appOpenMethod',
      cb: (res: appOpenMethodRequestParams) => {
        this.store.dispatch(setAppOpenMethod({ data: res.appOpenMethod }));
      },
    };
  }
  //去搜索页面
  goSearch() {
    this.router.navigate(['search']);
  }
  //页面定位按钮的显示隐藏控制
  fixedBtnShowControl() {
    const operate = document.getElementById('operate');
    if (window.scrollY >= this.scrollTarget) {
      operate!.style.display = 'flex';
      operate!.style.opacity = '1';
    } else {
      operate!.style.opacity = '0';
      const timer = setTimeout(() => {
        if (operate!.style.opacity === '0') {
          operate!.style.display = 'none';
        }
        clearTimeout(timer);
      }, 300);
    }
  }
  //监控滚动事件
  onScroll = () => {
    if (!this.container) return;
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
      if (window.scrollY >= 0) {
        this.container.nativeElement.classList.remove('active');
        this.container.nativeElement.classList.remove('hidden');
      }
    }
    if (window.scrollY <= 0) {
      this.container.nativeElement.classList.remove('hidden');
    }
    this.fixedBtnShowControl();
  };
  //组件销毁同时清除滚动事件
  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll);
    this.subscriptionList.forEach((subscripion) => {
      subscripion.unsubscribe();
    });
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
    this.appOpenMethod.subscribe((value) => {
      if (value === 'outer') {
        window.open(environment.CHATPLATFORM);
      } else {
        handleSendMsg({
          type: 'openApp',
          data: {
            appId: 'ChatPlatform',
          },
        });
      }
    });
  }
  goFriend() {
    this.router.navigate(['friend']);
  }
  goComponentStore() {
    this.appOpenMethod.subscribe((value) => {
      const token =
        !localStorage.getItem('token') ||
        localStorage.getItem('token') === 'undefined' ||
        localStorage.getItem('token') === 'null'
          ? ''
          : localStorage.getItem('token');
      if (value === 'outer') {
        window.open(
          environment.COMPONENTLIBRARY + (token ? `?token=${token}` : ''),
        );
      } else {
        handleSendMsg({
          type: 'openApp',
          data: {
            appId: 'ComponentLibrary',
          },
        });
      }
    });
  }
  goMediaLibrary() {
    this.appOpenMethod.subscribe((value) => {
      const token =
        !localStorage.getItem('token') ||
        localStorage.getItem('token') === 'undefined' ||
        localStorage.getItem('token') === 'null'
          ? ''
          : localStorage.getItem('token');
      if (value === 'outer') {
        window.open(
          environment.MEDIALIBRARY + (token ? `?token=${token}` : ''),
        );
      } else {
        handleSendMsg({
          type: 'openApp',
          data: {
            appId: 'MediaLibrary',
          },
        });
      }
    });
  }
  goNavigation() {
    this.appOpenMethod.subscribe((value) => {
      const token =
        !localStorage.getItem('token') ||
        localStorage.getItem('token') === 'undefined' ||
        localStorage.getItem('token') === 'null'
          ? ''
          : localStorage.getItem('token');
      if (value === 'outer') {
        window.open(environment.NAVIGATION + (token ? `?token=${token}` : ''));
      } else {
        handleSendMsg({
          type: 'openApp',
          data: {
            appId: 'Navigation',
          },
        });
      }
    });
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
  addBook() {
    const msRef = this.ms.create({
      nzTitle: '上传音乐',
      nzContent: BookUploadFormComponentComponent,
      nzOnOk: async () => {
        const state = msRef.componentInstance?.submitForm();
        if (state === 'incorrectParam') return false;
      },
    });
  }
}
