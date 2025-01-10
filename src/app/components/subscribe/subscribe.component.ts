import { HomeService } from '@/app/service/home.service';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss'],
  standalone: false,
})
export class SubscribeComponent implements OnDestroy {
  constructor(
    private message: NzMessageService,
    private homeService: HomeService,
  ) {}
  mail = new FormControl('', [Validators.required, Validators.email]);
  subscriptionList: any[] = [];
  submit() {
    if (!this.mail.valid) this.message.warning('请输入正确的邮箱！');
    const mail = this.mail.value as string;
    this.subscriptionList.push(
      this.homeService.subscribe(mail).subscribe((res) => {
        if (res.code === 200) {
          this.message.success(res.msg as string);
        } else if (res.code === 201) {
          this.message.warning(res.msg as string);
        }
      }),
    );
  }
  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscripion) => {
      subscripion.unsubscribe();
    });
  }
}
