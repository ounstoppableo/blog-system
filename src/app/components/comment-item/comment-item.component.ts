import { msgItem } from '@/types/msgBorad/msgBorad';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger,
} from '@angular/animations';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
  animations: [
    trigger('toShow', [
      transition('*=>*', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-50%)' }),
            stagger(100, [
              animate(
                '0.5s',
                style({ opacity: 1, transform: 'translateY(0)' }),
              ),
            ]),
          ],
          { optional: true },
        ),
      ]),
    ]),
  ],
})
export class CommentItemComponent {
  @Input()
  msgItem: msgItem = {} as msgItem;
  @Output()
  reloadData = new EventEmitter();
  showForm = false;
  showChirdren = false;
  showComponent = false;

  toShowForm() {
    this.showForm = !this.showForm;
  }
  toReloadData() {
    this.reloadData.emit();
  }
  toShowChildren() {
    this.showChirdren = !this.showChirdren;
  }
}
