import { HomeService } from '@/app/service/home.service';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent {
  constructor(
    private message: NzMessageService,
    private homeService: HomeService
  ) { }
  mail = new FormControl('', [Validators.required, Validators.email])
  submit() {
    if (!this.mail.valid) this.message.warning('请输入正确的邮箱！');
    const mail = this.mail.value as string
    this.homeService.subscribe(mail).subscribe(res => {
      if (res.code === 200) {
        this.message.success(res.msg as string);
      } else if (res.code === 201) {
        this.message.warning(res.msg as string);
      }
    })
  }
}
