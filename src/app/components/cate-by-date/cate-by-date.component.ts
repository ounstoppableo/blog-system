import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cate-by-date',
  templateUrl: './cate-by-date.component.html',
  styleUrls: ['./cate-by-date.component.scss']
})
export class CateByDateComponent {
  @Input()
  smallSize = false
}
