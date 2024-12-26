import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-for-msg-board-page',
  templateUrl: './for-msg-board-page.component.html',
  styleUrls: ['./for-msg-board-page.component.scss'],
  standalone: false,
})
export class ForMsgBoardPageComponent {
  smallSize!: Observable<boolean>;
  isLogin: Observable<boolean>;
  @Input()
  dontShowGpuRenderComponent = false;
  constructor(private store: Store<{ smallSize: boolean; isLogin: boolean }>) {
    this.smallSize = store.select('smallSize');
    this.isLogin = store.select('isLogin');
  }
}
