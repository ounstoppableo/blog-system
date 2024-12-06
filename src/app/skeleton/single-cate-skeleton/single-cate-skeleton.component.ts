import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-single-cate-skeleton',
    templateUrl: './single-cate-skeleton.component.html',
    styleUrls: ['./single-cate-skeleton.component.scss'],
    standalone: false
})
export class SingleCateSkeletonComponent {
  @Input()
  smallSize!: boolean;
}
