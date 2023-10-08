import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent implements OnChanges {
  @Input()
  tagList!: any[];
  @Input()
  gap = 5;
  ngOnChanges(): void {
    if (this.tagList) {
      this.tagList.forEach((item) => {
        item.showWord = '';
        if (item.count !== undefined) {
          item.showWord = item.tagName + `(${item.count})`;
        }
      });
    }
  }
  toSingleTag(tagName: string) {
    this.router.navigate(['tagPage', tagName]);
  }
  constructor(private router: Router) { }
}
