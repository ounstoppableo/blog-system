import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-single-folder-cate',
  templateUrl: './single-folder-cate.component.html',
  styleUrls: ['./single-folder-cate.component.scss']
})
export class SingleFolderCateComponent {
  @Input()
  smallSize!: boolean
}
