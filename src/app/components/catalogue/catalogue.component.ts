import { Component, Input, OnChanges } from '@angular/core';
import { MD5 } from 'crypto-js';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnChanges {
  @Input()
  catalogue: any[] = []
  ngOnChanges(changes: any): void {
    if (changes.catalogue.currentValue) {
      this.catalogue = changes.catalogue.currentValue
      this.addUrlPatam(this.catalogue)
      console.log(this.catalogue)
    }
  }

  addUrlPatam(catalogue: any) {
    catalogue.forEach((item: any) => {
      item.id = MD5(item.title).toString()
      if(!!item.children.length){
        this.addUrlPatam(item.children)
      }
    })
  }
  constructor() { }
}
