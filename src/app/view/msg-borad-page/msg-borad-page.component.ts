import { AddArticleFormComponent } from '@/app/components/add-article-form/add-article-form.component';
import { watchComponentDeactivate } from '@/app/customReuseStrategy/guard/watchComponentRouteState';
import ViewResize from '@/app/decorators/viewResize';
import { TreeHoleService } from '@/app/service/treeHole.service';
import asyncCheckAppLoad from '@/utils/checkAppLoad';
import checkAppLoad from '@/utils/checkAppLoad';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
type bulletState = {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
};
@Component({
  selector: 'app-msg-borad-page',
  templateUrl: './msg-borad-page.component.html',
  styleUrls: ['./msg-borad-page.component.scss'],
  standalone: false,
})
export class MsgBoradPageComponent
  implements watchComponentDeactivate, OnInit, AfterViewInit, OnDestroy
{
  isLeave = false;
  isLogin: Observable<boolean>;
  headerChangeHeight = 0;
  smallSize: Observable<boolean>;
  setIsLeaveTimeout: any;
  treeHoleMsg = '';
  timer: any = null;
  interval: any = null;
  treeHoleMsgs: any[] = [];
  @ViewChildren('bullets')
  bullets!: any[];
  myTreeHoleMsgs: any[] = JSON.parse(
    localStorage.getItem('myTreeHoleMsgs') || '[]',
  );
  bulletsState: bulletState[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private message: NzMessageService,
    private treeHoleService: TreeHoleService,
    private store: Store<{ smallSize: boolean; isLogin: boolean }>,
  ) {
    this.smallSize = store.select('smallSize');
    this.isLogin = store.select('isLogin');
  }
  ngOnInit(): void {
    this.toSetIsLeaveToFalse();
    this.getTreeHoleMsgs();
  }
  ngAfterViewInit(): void {
    this.setBulletInterval();
  }

  checkIsMyTreeHoleMsg = (msgId: any) => {
    return this.myTreeHoleMsgs.includes(msgId);
  };

  setBulletInterval = () => {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        clearInterval(this.interval);
        if (event.url === '/msgboard')
          this.interval = setInterval(this.bulletAnimationUnit, 16);
      }
    });
    asyncCheckAppLoad(
      () => (this.interval = setInterval(this.bulletAnimationUnit, 16)),
    );
    window.addEventListener('resize', this.resetBulletY);
  };

  resetBulletY = () => {
    this.bullets.forEach((bullet, index) => {
      if (!bullet) return;
      if (!this.bulletsState[index]) return;
      const headerHeight = Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          '--headerHeigth',
        ),
      );
      this.bulletsState[index].y = Math.floor(
        Math.random() * (0.9 * innerHeight - 2 * headerHeight) +
          2 * headerHeight,
      );
    });
  };

  bulletAnimationUnit = () => {
    this.bullets.forEach((bullet, index) => {
      if (!bullet) return;
      if (!this.bulletsState[index]) {
        this.bulletsState[index] = this.bulletStateReset(bullet.nativeElement);
        bullet.nativeElement.style.transform = `translate(${this.bulletsState[index].x}px,${this.bulletsState[index].y}px)`;
      } else {
        this.bulletsState[index].x -= this.bulletsState[index].speed;
        if (
          this.bulletsState[index].x <
          -innerWidth - this.bulletsState[index].width
        ) {
          this.bulletsState[index] = this.bulletStateReset(
            bullet.nativeElement,
          );
        }
        bullet.nativeElement.style.transform = `translate(${this.bulletsState[index].x}px,${this.bulletsState[index].y}px)`;
      }
    });
  };
  bulletStateReset(bullet: any) {
    const bulletWidth = bullet.offsetWidth;
    const bulletHeight = bullet.offsetHeight;
    const headerHeight = Number.parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue(
        '--headerHeigth',
      ),
    );
    return {
      x: bulletWidth,
      y: Math.floor(
        Math.random() * (0.9 * innerHeight - 2 * headerHeight) +
          2 * headerHeight,
      ),
      width: bulletWidth,
      height: bulletHeight,
      speed: Math.random() * (5 - 1) + 1,
    };
  }

  toSetIsLeaveToFalse = () => {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (this.isLeave && this.setIsLeaveTimeout)
          clearTimeout(this.setIsLeaveTimeout);
      }
    });
    this.route.url.subscribe((res: any) => {
      if (this.setIsLeaveTimeout) clearTimeout(this.setIsLeaveTimeout);
      this.setIsLeaveTimeout = setTimeout(() => {
        this.isLeave = false;
      }, 1000);
    });
  };

  sendMsgToTreeHole = () => {
    if (this.timer) return this.message.warning('请不要频繁发送o~~');
    this.timer = setTimeout(() => {
      this.timer = null;
    }, 3000);
    this.treeHoleService.sendMsg(this.treeHoleMsg).subscribe((res) => {
      if (res.code === 200) {
        this.treeHoleMsg = '';
        this.message.success('Shoot~~');
        this.getTreeHoleMsgs();
        this.setTreeHoleMsgToLocal(res.data.msgId);
      }
    });
  };

  setTreeHoleMsgToLocal = (msgId: number) => {
    const temp = JSON.parse(localStorage.getItem('myTreeHoleMsgs') || '[]');
    this.myTreeHoleMsgs.push(msgId);
    temp.push(msgId);
    localStorage.setItem('myTreeHoleMsgs', JSON.stringify(temp));
  };

  getTreeHoleMsgs = () => {
    this.treeHoleService.getMsgs().subscribe((res) => {
      if (res.code === 200) {
        this.treeHoleMsgs = res.data;
      }
    });
  };
  ngOnDestroy(): void {
    clearInterval(this.interval);
    window.removeEventListener('resize', this.resetBulletY);
  }
}
