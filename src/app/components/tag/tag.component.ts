import asyncCheckAppLoad from '@/utils/checkAppLoad';
import checkAppLoad from '@/utils/checkAppLoad';
import {
  Component,
  Input,
  OnChanges,
  ViewChild,
  ViewChildren,
  OnInit,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { cloneDeep } from 'lodash-es';
const tagCloudConfigInit = {
  dtr: Math.PI / 180,
  d: 300,
  mcList: [] as any[],
  active: false,
  lasta: 1,
  lastb: 1,
  distr: true,
  size: 250,
  mouseX: 0,
  mouseY: 0,
  howElliptical: 1,
  sa: 0,
  ca: 0,
  sb: 0,
  cb: 0,
  sc: 0,
  cc: 0,
};
@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  standalone: false,
})
export class TagComponent
  implements OnChanges, OnInit, AfterViewInit, AfterViewChecked, OnDestroy
{
  @Input()
  showTagsCloud = false;
  @Input()
  tagList!: any[];
  @Input()
  gap = 5;
  @ViewChildren('tags')
  tags: any = [];
  @ViewChild('tagSpace')
  tagSpace!: any;
  tagCloudConfig: any = cloneDeep(tagCloudConfigInit);
  smallSize;
  tagSpaceLeft = 0;
  tagSpaceTop = 0;
  interval: any = null;
  init = false;
  smallSizeSubscribe: any = null;
  ngOnChanges(): void {
    if (this.tagList) {
      this.tagList.forEach((item) => {
        item.showWord = '';
        if (item.count !== undefined) {
          item.showWord = item.tagName + `(${item.count})`;
        }
      });
    }
  }
  ngOnInit(): void {
    this.smallSizeSubscribe = this.store.subscribe((state) => {
      if (state.smallSize) {
        this.setTagCloudConfig({ radius: 120, tspeed: 5 });
      } else {
        this.setTagCloudConfig({ radius: 150, tspeed: 5 });
      }
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.url === '/search') {
        requestAnimationFrame(() => {
          this.resetTagCloud();
        });
      }
    });
  }
  ngAfterViewInit(): void {
    asyncCheckAppLoad(this.setTagSpaceInfo);
    window.addEventListener('resize', this.resetTagCloud);
  }
  ngAfterViewChecked(): void {
    if (this.showTagsCloud && !this.init && this.tagList.length > 0) {
      this.onReady();
      this.init = true;
    }
  }

  setTagSpaceInfo = () => {
    this.tagSpaceLeft = this.tagSpace.nativeElement.offsetWidth / 2;
    this.tagSpaceTop = this.tagSpace.nativeElement.offsetHeight / 2;
  };
  setTagCloudConfig = (param: any) => {
    this.tagCloudConfig = Object.assign(this.tagCloudConfig, param);
  };
  resetTagCloud = () => {
    if (this.showTagsCloud && this.tagList.length > 0) {
      this.tagCloudConfig = Object.assign(
        this.tagCloudConfig,
        cloneDeep(tagCloudConfigInit),
      );
      this.setTagSpaceInfo();
      this.onReady();
    }
  };
  toSingleTag(tagName: string) {
    this.router.navigate(['tagPage', tagName]);
  }
  constructor(
    private router: Router,
    private store: Store<{ smallSize: boolean; isLogin: boolean }>,
  ) {
    this.smallSize = this.store.select('smallSize');
  }

  // 三角函数角度计算
  sineCosine = (a: number, b: number, c: number) => {
    this.tagCloudConfig.sa = Math.sin(a * this.tagCloudConfig.dtr);
    this.tagCloudConfig.ca = Math.cos(a * this.tagCloudConfig.dtr);
    this.tagCloudConfig.sb = Math.sin(b * this.tagCloudConfig.dtr);
    this.tagCloudConfig.cb = Math.cos(b * this.tagCloudConfig.dtr);
    this.tagCloudConfig.sc = Math.sin(c * this.tagCloudConfig.dtr);
    this.tagCloudConfig.cc = Math.cos(c * this.tagCloudConfig.dtr);
  };
  // 设置初始定位
  positionAll = () => {
    let phi = 0;
    let theta = 0;
    const max = this.tagCloudConfig.mcList.length;

    for (let i = 1; i < max + 1; i++) {
      if (this.tagCloudConfig.distr) {
        phi = Math.acos(-1 + (2 * i - 1) / max);
        theta = Math.sqrt(max * Math.PI) * phi;
      } else {
        phi = Math.random() * Math.PI;
        theta = Math.random() * (2 * Math.PI);
      }
      // 坐标变换
      this.tagCloudConfig.mcList[i - 1].cx =
        this.tagCloudConfig.radius * Math.cos(theta) * Math.sin(phi);
      this.tagCloudConfig.mcList[i - 1].cy =
        this.tagCloudConfig.radius * Math.sin(theta) * Math.sin(phi);
      this.tagCloudConfig.mcList[i - 1].cz =
        this.tagCloudConfig.radius * Math.cos(phi);

      this.tags.toArray()[i - 1].nativeElement.style.transform = `
          translate(${
            this.tagCloudConfig.mcList[i - 1].cx +
            this.tagSpace.nativeElement.offsetWidth / 2 -
            this.tagCloudConfig.mcList[i - 1].offsetWidth / 2
          }px , ${
            this.tagCloudConfig.mcList[i - 1].cy +
            this.tagSpace.nativeElement.offsetHeight / 2 -
            this.tagCloudConfig.mcList[i - 1].offsetHeight / 2
          }px)
        `;
    }
  };
  // 坐标更新 让标签动起来
  update = () => {
    let a;
    let b;
    if (this.tagCloudConfig.active) {
      a =
        (-Math.min(
          Math.max(-this.tagCloudConfig.mouseY, -this.tagCloudConfig.size),
          this.tagCloudConfig.size,
        ) /
          this.tagCloudConfig.radius) *
        this.tagCloudConfig.tspeed;
      b =
        (Math.min(
          Math.max(-this.tagCloudConfig.mouseX, -this.tagCloudConfig.size),
          this.tagCloudConfig.size,
        ) /
          this.tagCloudConfig.radius) *
        this.tagCloudConfig.tspeed;
    } else {
      a = this.tagCloudConfig.lasta * 0.98;
      b = this.tagCloudConfig.lastb * 0.98;
    }
    this.tagCloudConfig.lasta = a;
    this.tagCloudConfig.lastb = b;
    if (Math.abs(a) <= 0.01 && Math.abs(b) <= 0.01) {
      return;
    }
    const c = 0;
    this.sineCosine(a, b, c);
    for (let j = 0; j < this.tagCloudConfig.mcList.length; j++) {
      const rx1 = this.tagCloudConfig.mcList[j].cx;
      const ry1 =
        this.tagCloudConfig.mcList[j].cy * this.tagCloudConfig.ca +
        this.tagCloudConfig.mcList[j].cz * -this.tagCloudConfig.sa;
      const rz1 =
        this.tagCloudConfig.mcList[j].cy * this.tagCloudConfig.sa +
        this.tagCloudConfig.mcList[j].cz * this.tagCloudConfig.ca;
      const rx2 = rx1 * this.tagCloudConfig.cb + rz1 * this.tagCloudConfig.sb;
      const ry2 = ry1;
      const rz2 = rx1 * -this.tagCloudConfig.sb + rz1 * this.tagCloudConfig.cb;
      const rx3 = rx2 * this.tagCloudConfig.cc + ry2 * -this.tagCloudConfig.sc;
      const ry3 = rx2 * this.tagCloudConfig.sc + ry2 * this.tagCloudConfig.cc;
      const rz3 = rz2;
      this.tagCloudConfig.mcList[j].cx = rx3;
      this.tagCloudConfig.mcList[j].cy = ry3;
      this.tagCloudConfig.mcList[j].cz = rz3;
      const per = this.tagCloudConfig.d / (this.tagCloudConfig.d + rz3);
      this.tagCloudConfig.mcList[j].x =
        this.tagCloudConfig.howElliptical * rx3 * per -
        this.tagCloudConfig.howElliptical * 2;
      this.tagCloudConfig.mcList[j].y = ry3 * per;
      this.tagCloudConfig.mcList[j].scale = per;
      this.tagCloudConfig.mcList[j].alpha = per;
      this.tagCloudConfig.mcList[j].alpha =
        (this.tagCloudConfig.mcList[j].alpha - 0.6) * (10 / 6);
    }
    this.doPosition();
  };
  doPosition = () => {
    const left = this.tagSpaceLeft - this.tagCloudConfig.radius / 2;
    const top = this.tagSpaceTop - 30;
    for (let i = 0; i < this.tagCloudConfig.mcList.length; i++) {
      this.tags.toArray()[i].nativeElement.style.transform = `translate(${
        this.tagCloudConfig.mcList[i].cx + left
      }px,${this.tagCloudConfig.mcList[i].cy + top}px)`;
      this.tags.toArray()[i].nativeElement.style.fontSize =
        Math.ceil((12 * this.tagCloudConfig.mcList[i].scale) / 2) + 8 + 'px';
      this.tags.toArray()[i].nativeElement.style.opacity =
        this.tagCloudConfig.mcList[i].alpha;
    }
  };
  // 生成标签云
  onReady = () => {
    this.tags.forEach((tag: any) => {
      const oTag: any = {};
      oTag.offsetWidth = tag.nativeElement.offsetWidth;
      oTag.offsetHeight = tag.nativeElement.offsetHeight;
      this.tagCloudConfig.mcList.push(oTag);
    });
    this.sineCosine(0, 0, 0);
    this.positionAll();
    this.clearEventListener();
    this.tagSpace.nativeElement.addEventListener(
      'mouseover',
      this.tagSpaceMouseOverCb,
    );
    this.tagSpace.nativeElement.addEventListener(
      'mouseout',
      this.tagSpaceMouseOutCb,
    );
    this.tagSpace.nativeElement.addEventListener(
      'mousemove',
      this.tagSpaceMouseMoveCb,
    );
    this.setTagCloudInterval();
  };

  setTagCloudInterval = () => {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.update();
    }, 50);
  };

  tagSpaceMouseOverCb = () => {
    this.tagCloudConfig.active = true;
  };
  tagSpaceMouseOutCb = () => {
    this.tagCloudConfig.active = false;
  };
  tagSpaceMouseMoveCb = (e: any) => {
    this.tagCloudConfig.mouseX =
      e.clientX -
      (this.tagSpace.nativeElement.offsetLeft +
        this.tagSpace.nativeElement.offsetWidth / 2);
    this.tagCloudConfig.mouseY =
      e.clientY -
      (this.tagSpace.nativeElement.offsetTop +
        this.tagSpace.nativeElement.offsetHeight / 2);
    this.tagCloudConfig.mouseX /= 5;
    this.tagCloudConfig.mouseY /= 5;
  };
  clearEventListener = () => {
    this.tagSpace.nativeElement.removeEventListener(
      'mouseover',
      this.tagSpaceMouseOverCb,
    );
    this.tagSpace.nativeElement.removeEventListener(
      'mouseout',
      this.tagSpaceMouseOutCb,
    );
    this.tagSpace.nativeElement.removeEventListener(
      'mousemove',
      this.tagSpaceMouseMoveCb,
    );
  };
  ngOnDestroy(): void {
    this.clearEventListener();
    window.removeEventListener('resize', this.setTagSpaceInfo);
    if (this.smallSizeSubscribe) {
      this.smallSizeSubscribe.unsubscribe();
    }
    clearInterval(this.interval);
  }
}
