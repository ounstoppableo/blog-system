import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent {
  @Input()
  tagList!: any[];
  @Input()
  gap = 5;
  ngOnChanges(): void {
    this.tagList.forEach(item => {
      item.showWord = ''
      if (item.count !== undefined) {
        item.showWord = item.tagName + `(${item.count})`
      }
    })
  }
  toSingleTag(tagName: string) {
    this.router.navigate(['tagPage', tagName])
  }
  constructor(private router: Router) { }
}
