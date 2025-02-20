import { FriendService } from '@/app/service/friend.service';
import {
  Component,
  ViewChild,
  OnInit,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import dayjs from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import { NzMessageService } from 'ng-zorro-antd/message';
dayjs.extend(quarterOfYear);

type friend = {
  cover: string;
  name: string;
  brief: string;
  date: string;
  website: string;
  audit?: number;
};

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrl: './friend.component.scss',
  standalone: false,
})
export class FriendComponent implements OnInit, AfterViewInit, OnDestroy {
  friendList: friend[] = [];
  smallSizeSubscribe: any;
  limit = 0;
  page = 0;
  total = 9999;
  hadLoaded = false;
  smallSize;
  isLogin;
  envelopeWidth = 400;
  envelopeInnerWidth = this.envelopeWidth - 20;
  envelopeHeight = this.envelopeWidth / 1.67;
  relativeMove = (this.envelopeHeight * 4) / 7;
  headerChangeHeight = 0;
  timer: any = null;
  shouldLoad = false;
  @ViewChild('envelope')
  envelope!: any;
  @ViewChild('contain')
  contain!: any;
  @ViewChild('card')
  card!: any;
  friendInfoForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    brief: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
    cover: new FormControl('', [
      Validators.required,
      Validators.maxLength(200),
    ]),
    website: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
  });
  get name() {
    return this.friendInfoForm.get('name');
  }
  get brief() {
    return this.friendInfoForm.get('brief');
  }
  get cover() {
    return this.friendInfoForm.get('cover');
  }
  get website() {
    return this.friendInfoForm.get('website');
  }
  subscriptionList: any[] = [];
  constructor(
    private friendService: FriendService,
    private message: NzMessageService,
    private store: Store<{ smallSize: boolean; isLogin: boolean }>,
  ) {
    this.smallSize = store.select('smallSize');
    this.isLogin = store.select('isLogin');
  }
  envelopeExcludeClickCb = (e: any) => {
    if (!e.target.closest('.envelope')) {
      this.expandenvelope(null, false);
      this.clearValidationErrors(this.friendInfoForm);
    }
  };
  clearValidationErrors(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      if (control instanceof FormControl) {
        control.setErrors(null);
        control.markAsPristine();
        control.markAsUntouched();
        control.updateValueAndValidity();
      } else if (control instanceof FormGroup) {
        this.clearValidationErrors(control);
      }
    });
  }
  expandenvelope(e: any, flag: boolean) {
    if (flag) {
      const containHeight = this.contain.nativeElement.offsetHeight;
      this.contain.nativeElement.style.top = 0;
      this.envelope.nativeElement.style.height =
        this.envelopeHeight + containHeight - this.relativeMove + 'px';
    } else {
      this.contain.nativeElement.style.top = this.relativeMove + 20 + 'px';
      this.envelope.nativeElement.style.height =
        this.envelopeHeight + this.relativeMove + 'px';
    }
  }
  getSeason() {
    const quarter = dayjs(new Date()).quarter();
    switch (quarter) {
      case 1:
        return '🌸';
      case 2:
        return '🍀';
      case 3:
        return '🍁';
      case 4:
        return '❄️';
    }
  }
  submit() {
    if (this.friendInfoForm.valid) {
      Object.keys(this.friendInfoForm.value).forEach((key) => {
        if (typeof this.friendInfoForm.value[key] === 'string') {
          this.friendInfoForm.value[key] =
            this.friendInfoForm.value[key].trim();
        }
      });
      this.subscriptionList.push(
        this.friendService
          .addFriend(this.friendInfoForm.value)
          .subscribe((res) => {
            if (res.code === 200) {
              this.message.success(res.msg as string);
              this.friendInfoForm.reset();
            }
          }),
      );
    } else {
      Object.values(this.friendInfoForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      this.message.warning('请正确填写信息');
    }
  }
  getFriendList() {
    const lineCount = innerWidth > 1024 ? 4 : 2;
    this.limit = lineCount * 2;
    if (this.total > this.page * this.limit) {
      this.page = this.page + 1;
    } else {
      return (this.hadLoaded = true);
    }

    this.subscriptionList.push(
      this.friendService
        .getFriendList(this.limit, this.page)
        .subscribe((res) => {
          if (res.code === 200) {
            this.friendList = [...this.friendList, ...res.data];
            this.total = (res as any).total;
            this.timer = null;
            if (this.shouldLoad) {
              this.getFriendList();
              this.shouldLoad = false;
            }
          }
        }),
    );
  }
  reloadFriendList() {
    this.limit = 0;
    this.page = 0;
    this.total = 99999;
    this.friendList = [];
    this.hadLoaded = false;
    this.getFriendList();
  }
  scollCb = () => {
    if (
      innerHeight - this.card.nativeElement.getBoundingClientRect().bottom >=
        0 &&
      !this.timer
    ) {
      this.timer = setTimeout(() => {
        this.getFriendList();
      }, 0);
    }
    if (
      innerHeight - this.card.nativeElement.getBoundingClientRect().bottom >=
        0 &&
      this.timer
    ) {
      this.shouldLoad = true;
    }
  };
  auditFriend = (website: string) => {
    this.subscriptionList.push(
      this.friendService.auditFriend(website).subscribe((res) => {
        if (res.code === 200) {
          this.message.success(res.msg as string);
          this.reloadFriendList();
        }
      }),
    );
  };
  deleteFriend = (website: string) => {
    this.subscriptionList.push(
      this.friendService.deleteFriend(website).subscribe((res) => {
        if (res.code === 200) {
          this.message.success(res.msg as string);
          this.reloadFriendList();
        }
      }),
    );
  };
  ngOnInit(): void {
    this.smallSizeSubscribe = this.store.subscribe((state) => {
      if (state.smallSize) {
        this.envelopeWidth = 300;
        this.envelopeInnerWidth = this.envelopeWidth - 20;
        this.envelopeHeight = this.envelopeWidth / 1.67;
        this.relativeMove = (this.envelopeHeight * 4) / 7;
      } else {
        this.envelopeWidth = 400;
        this.envelopeInnerWidth = this.envelopeWidth - 20;
        this.envelopeHeight = this.envelopeWidth / 1.67;
        this.relativeMove = (this.envelopeHeight * 4) / 7;
      }
    });
    this.getFriendList();
  }
  ngAfterViewInit(): void {
    window.addEventListener('click', this.envelopeExcludeClickCb);
    window.addEventListener('scroll', this.scollCb);
    window.addEventListener('resize', this.scollCb);
    window.scrollTo(0, 0);
  }
  ngOnDestroy(): void {
    if (this.smallSizeSubscribe) {
      this.smallSizeSubscribe.unsubscribe();
    }
    this.subscriptionList.forEach((subscripion) => {
      subscripion.unsubscribe();
    });
    window.removeEventListener('click', this.envelopeExcludeClickCb);
    window.removeEventListener('scroll', this.scollCb);
    window.removeEventListener('resize', this.scollCb);
  }
}
