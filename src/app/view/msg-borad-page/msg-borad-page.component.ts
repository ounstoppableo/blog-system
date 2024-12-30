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
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-msg-borad-page',
  templateUrl: './msg-borad-page.component.html',
  styleUrls: ['./msg-borad-page.component.scss'],
  standalone: false,
})
export class MsgBoradPageComponent implements watchComponentDeactivate, OnInit {
  isLeave = false;
  isLogin: Observable<boolean>;
  headerChangeHeight = 0;
  smallSize: Observable<boolean>;
  setIsLeaveTimeout: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<{ smallSize: boolean; isLogin: boolean }>,
  ) {
    this.smallSize = store.select('smallSize');
    this.isLogin = store.select('isLogin');
  }
  ngOnInit(): void {
    this.toSetIsLeaveToFalse();
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
}
