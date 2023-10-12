import { Component, Input, OnChanges } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {pinyin} from 'pinyin-pro'
@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss'],
})
export class CatalogueComponent implements OnChanges {
  @Input()
  catalogue: any[] = [];
  url = ''
  ngOnChanges(changes: any): void {
    if (changes.catalogue.currentValue) {
      this.catalogue = changes.catalogue.currentValue;
      this.addUrlPatam(this.catalogue);
    }
  }

  addUrlPatam(catalogue: any) {
    catalogue.forEach((item: any) => {
      item.id = item.title.replace(/[\(\-\)]/g,'')
      if (item.children.length !== 0) {
        this.addUrlPatam(item.children);
      }
    });
  }
  constructor(private route: ActivatedRoute) { }
}
