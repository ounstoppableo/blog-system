import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent {
  drawerVisible = false;
  goHome() {
    this.router.navigate(['home']);
  }
  open() {
    this.drawerVisible = true;
  }
  close() {
    this.drawerVisible = false;
  }
  goSearch() {
    this.router.navigate(['search']);
  }
  goMsgBoard() {
    this.router.navigate(['msgboard']);
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
  //展开菜单
  show(listEle: any, iconEle: any) {
    Array.from(listEle.classList).includes('active')
      ? listEle.classList.remove('active')
      : listEle.classList.add('active');
    Array.from(iconEle.classList).includes('active')
      ? iconEle.classList.remove('active')
      : iconEle.classList.add('active');
  }
  goChatPlatform(){
    const a = document.createElement('a');
    a.href = 'https://www.unstoppable840.cn:8080';
    a.click();
  }
  constructor(
    private router: Router,
    private routes: ActivatedRoute,
  ) {}
}
