import { AddArticleFormComponent } from '@/app/components/add-article-form/add-article-form.component';
import { watchComponentDeactivate } from '@/app/customReuseStrategy/guard/watchComponentRouteState';
import ViewResize from '@/app/decorators/viewResize';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-msg-borad-page',
  templateUrl: './msg-borad-page.component.html',
  styleUrls: ['./msg-borad-page.component.scss'],
  standalone: false,
})
export class MsgBoradPageComponent implements watchComponentDeactivate {
  isLeave = false;
  isLogin: Observable<boolean>;
  headerChangeHeight = 0;
  smallSize: Observable<boolean>;
  setIsLeaveTimeout: any;

  constructor(
    private route: ActivatedRoute,
    private store: Store<{ smallSize: boolean; isLogin: boolean }>,
  ) {
    this.smallSize = store.select('smallSize');
    this.isLogin = store.select('isLogin');
  }
  ngOnInit(): void {
    this.toSetIsLeaveToFalse();
  }

  toSetIsLeaveToFalse = () => {
    this.route.url.subscribe((res: any) => {
      if (this.setIsLeaveTimeout) clearTimeout(this.setIsLeaveTimeout);
      setTimeout(() => {
        this.isLeave = false;
      }, 1000);
    });
  };
}
