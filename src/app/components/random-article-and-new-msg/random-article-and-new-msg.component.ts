import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-random-article-and-new-msg',
    templateUrl: './random-article-and-new-msg.component.html',
    styleUrls: ['./random-article-and-new-msg.component.scss'],
    standalone: false
})
export class RandomArticleAndNewMsgComponent {
  @Input()
  limit = 10;
}
