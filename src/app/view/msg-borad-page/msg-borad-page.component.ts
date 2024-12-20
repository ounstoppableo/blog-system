import { AddArticleFormComponent } from '@/app/components/add-article-form/add-article-form.component';
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
export class MsgBoradPageComponent {
  isLogin = false;
  headerChangeHeight = 0;
  smallSize: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<{ smallSize: boolean }>,
  ) {
    this.smallSize = store.select('smallSize');
  }
}
