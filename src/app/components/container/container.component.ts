import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddArticleFormComponent } from '../add-article-form/add-article-form.component';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent {
  @Input()
  showInfo!: boolean;
  @Input()
  smallSize!: boolean;
  @Input()
  updateArticleModal!: AddArticleFormComponent;
  @Input()
  dateCate = false
  @Input()
  isHome = false;
  @Input()
  isArticle = false
  @Input()
  folderCate = false
  @Input()
  tagCate = false
  @Input()
  tagPage = false

  constructor(private routes: ActivatedRoute) { }

}
