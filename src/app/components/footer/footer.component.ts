import { SiteInfoService } from '@/app/service/siteInfo.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: false,
})
export class FooterComponent implements OnInit, OnDestroy {
  constructor(
    private routes: ActivatedRoute,
    private siteInfoService: SiteInfoService,
    private router: Router,
  ) {}
  VT = 0;
  baseInfo: any;
  serverStartTime: any;
  interval: any;
  subscriptionList: any[] = [];
  ngOnInit(): void {
    this.subscriptionList.push(
      this.siteInfoService.getVT().subscribe((res: any) => {
        if (res.code === 200) {
          this.VT = res.VT;
        }
      }),
    );
    this.subscriptionList.push(
      this.siteInfoService.getBaseInfo().subscribe((res: any) => {
        if (res.code === 200) {
          this.baseInfo = res.result;
          this.serverStartTime = res.result?.serverStartTime;
          this.interval = setInterval(this._runtimeUpdate, 1000);
        }
      }),
    );
  }
  private _runtimeUpdate = () => {
    this.baseInfo.runtime = this.generateRuntime(this.serverStartTime);
  };
  generateRuntime(serverStartTime: string) {
    const timeDiff = Math.floor(dayjs().diff(dayjs(serverStartTime)) / 1000);
    const day = Math.floor(timeDiff / 3600 / 24);
    const hour = Math.floor((timeDiff / 3600) % 24);
    const minute = Math.floor((timeDiff / 60) % 60);
    const seconds = Math.floor(timeDiff % 60);
    return `${day}天${hour > 10 ? hour : '0' + hour}时${minute >= 10 ? minute : '0' + minute}分${seconds >= 10 ? seconds : '0' + seconds}秒`;
  }
  goHome() {
    this.router.navigate(['home']);
  }
  ngOnDestroy(): void {
    clearInterval(this.interval);
    this.subscriptionList.forEach((subscripion) => {
      subscripion.unsubscribe();
    });
  }
}
