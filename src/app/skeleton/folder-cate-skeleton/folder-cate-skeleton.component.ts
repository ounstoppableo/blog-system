import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-folder-cate-skeleton',
  templateUrl: './folder-cate-skeleton.component.html',
  styleUrls: ['./folder-cate-skeleton.component.scss'],
  standalone: false,
})
export class FolderCateSkeletonComponent {
  smallSize!: Observable<boolean>;
  constructor(private store: Store<{ smallSize: boolean }>) {
    this.smallSize = store.select('smallSize');
  }
}
