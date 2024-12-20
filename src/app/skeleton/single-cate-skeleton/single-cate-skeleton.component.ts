import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-single-cate-skeleton',
  templateUrl: './single-cate-skeleton.component.html',
  styleUrls: ['./single-cate-skeleton.component.scss'],
  standalone: false,
})
export class SingleCateSkeletonComponent {
  smallSize!: Observable<boolean>;
  constructor(private store: Store<{ smallSize: boolean }>) {
    this.smallSize = store.select('smallSize');
  }
}
