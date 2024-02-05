import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-folder-cate-skeleton',
  templateUrl: './folder-cate-skeleton.component.html',
  styleUrls: ['./folder-cate-skeleton.component.scss'],
})
export class FolderCateSkeletonComponent {
  @Input()
  smallSize!: boolean;
}
