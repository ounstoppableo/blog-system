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
    this.close();
    const a = document.createElement('a');
    a.href = 'https://www.unstoppable840.cn:8080';
    a.click();
  }
  constructor(
    private router: Router,
    private routes: ActivatedRoute,
    private store: Store<{ smallSize: boolean }>,
  ) {
    this.smallSize = store.select('smallSize');
  }
}
