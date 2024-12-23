import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '@/app/service/login';
import { NzMessageService } from 'ng-zorro-antd/message';
import sha256 from 'sha256';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setIsLogin } from '@/app/store/isLoginStore/isLoginStore.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent {
  isLogin: Observable<boolean>;
  constructor(
    private ls: LoginService,
    private message: NzMessageService,
    private location: Location,
    private store: Store<{ isLogin: boolean }>,
  ) {
    this.isLogin = store.select('isLogin');
  }
  loginInfo = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  get username() {
    return this.loginInfo.get('username');
  }
  get password() {
    return this.loginInfo.get('password');
  }
  //聚焦逻辑
  focus(labelEle: any) {
    labelEle.classList.add('focusInput');
  }
  //失焦逻辑
  blur(labelEle: any) {
    if (labelEle.htmlFor === 'username') {
      this.loginInfo.value.username
        ? null
        : labelEle.classList.remove('focusInput');
    } else {
      this.loginInfo.value.password
        ? null
        : labelEle.classList.remove('focusInput');
    }
  }
  //提交逻辑
  submit() {
    if (!this.loginInfo.valid)
      return this.message.warning('请正确填写用户名和密码!');
    this.ls
      .login(
        sha256(this.loginInfo.value.username as string),
        sha256(this.loginInfo.value.password as string),
      )
      .subscribe((res: any) => {
        if (res.code !== 200) return this.message.warning(res.msg);
        localStorage.setItem('token', res.token);
        this.store.dispatch(setIsLogin({ flag: true }));
        return this.location.back();
      });
  }
}
