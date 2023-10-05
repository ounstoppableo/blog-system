import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-single-tag-cate',
  templateUrl: './single-tag-cate.component.html',
  styleUrls: ['./single-tag-cate.component.scss'],
})
export class SingleTagCateComponent {
  @Input()
  smallSize!: boolean;
}
