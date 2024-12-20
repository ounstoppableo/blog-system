import { Component, Input, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss'],
  standalone: false,
})
export class CatalogueComponent implements OnChanges {
  @Input()
  catalogue: any[] = [];
  smallSize: Observable<boolean>;
  url = '';
  ngOnChanges(changes: any): void {
    if (changes.catalogue.currentValue) {
      this.catalogue = changes.catalogue.currentValue;
      this.addUrlPatam(this.catalogue);
    }
  }

  addUrlPatam(catalogue: any) {
    catalogue.forEach((item: any) => {
      item.id = item.title.replace(/[\(\-\)\$0-9\.\s\&\@\;]/g, '');
    });
  }

  constructor(
    private route: ActivatedRoute,
    private store: Store<{ smallSize: boolean }>,
  ) {
    this.smallSize = store.select('smallSize');
  }
}
