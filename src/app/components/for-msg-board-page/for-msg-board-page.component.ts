import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-for-msg-board-page',
    templateUrl: './for-msg-board-page.component.html',
    styleUrls: ['./for-msg-board-page.component.scss'],
    standalone: false
})
export class ForMsgBoardPageComponent {
  @Input()
  smallSize!: boolean;
  @Input()
  isLogin = false;
}
