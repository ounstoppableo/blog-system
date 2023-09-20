import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements AfterViewInit {
  headerChangeHeight!: number
  @ViewChild('backImg')
  backImg!: ElementRef
  ngAfterViewInit(): void {
    this.headerChangeHeight = this.backImg.nativeElement.offsetHeight
  }
}
