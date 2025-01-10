import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '@/app/service/login';
import { NzMessageService } from 'ng-zorro-antd/message';
import sha256 from 'sha256';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setIsLogin } from '@/app/store/isLoginStore/isLoginStore.action';
import * as jose from 'jose';

const publicKeyPem = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwTU0AgRwfWD/dQ544RI0
YJb9Vm8mPeZtZKCZu6mScynuRtrrBKW2q5Fl49SOnlS2YL+zdR2E/x2nfGvb2Bsp
NkKQyyVWI9FsCitglp2i4JOKGuC9W3jryBEEib//C65RrYEgX/hlvGccLkvo8Se0
r+YxvgcCBFBLVKMD6sz7pXjq+8a6sUyz8Lt/jiGwOfqoyYDoc4Q/JzCkBVUgd6Jl
ijWCUeHKabLXB6M0FWaZeFbzTUfTVJAZN1i44Kz/XbX6/3USHD8gM202u8Kxrx24
pCZIS3Kki5CWt4bTIStJdRvKIgak5iNUtks/WUqn2ToVFXyxcxkQjXursEVyHbNT
kwIDAQAB
-----END PUBLIC KEY-----`;
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
  async submit() {
    if (!this.loginInfo.valid)
      return this.message.warning('请正确填写用户名和密码!');
    const publicKey = await jose.importSPKI(publicKeyPem, 'RSA-OAEP');
    const code = await new jose.EncryptJWT(this.loginInfo.value)
      .setProtectedHeader({ alg: 'RSA-OAEP', enc: 'A256GCM' })
      .encrypt(publicKey);
    this.ls.login(code).subscribe((res: any) => {
      if (res.code !== 200) return this.message.warning(res.msg);
      localStorage.setItem('token', res.token);
      this.store.dispatch(setIsLogin({ flag: true }));
      return this.location.back();
    });
  }
}
