import { environment } from '@/environments/environment';
import { handleSendMsg } from '@/utils/iframeCommunication/server';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  standalone: false,
})
export class DrawerComponent {
  drawerVisible = false;
  smallSize!: Observable<boolean>;
  appOpenMethod!: Observable<string>;

  open() {
    this.drawerVisible = true;
  }
  close() {
    this.drawerVisible = false;
  }
  goHome() {
    this.router.navigate(['home']);
    this.close();
  }
  goSearch() {
    this.router.navigate(['search']);
    this.close();
  }
  goMsgBoard() {
    this.router.navigate(['msgboard']);
    this.close();
  }
  goDateCate() {
    this.router.navigate(['dateCate']);
    this.close();
  }
  goFolderCate() {
    this.router.navigate(['category']);
    this.close();
  }
  goTagCate() {
    this.router.navigate(['tagCate']);
    this.close();
  }
  goFriend() {
    this.router.navigate(['friend']);
    this.close();
  }
  //展开菜单
  show(listEle: any, iconEle: any) {
    Array.from(listEle.classList).includes('active')
      ? listEle.classList.remove('active')
      : listEle.classList.add('active');
    Array.from(iconEle.classList).includes('active')
      ? iconEle.classList.remove('active')
      : iconEle.classList.add('active');
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
  constructor(
    private router: Router,
    private routes: ActivatedRoute,
    private store: Store<{ smallSize: boolean; appOpenMethod: string }>,
  ) {
    this.smallSize = store.select('smallSize');
    this.appOpenMethod = store.select('appOpenMethod');
  }
}
