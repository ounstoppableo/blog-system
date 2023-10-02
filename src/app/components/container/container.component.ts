import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
  isHome!: boolean;
  @Input()
  showInfo!: boolean;
  @Input()
  smallSize!: boolean;
  constructor(private routes: ActivatedRoute) {}
  ngOnInit(): void {
    this.isHome = this.routes.routeConfig?.path?.includes('home') || false;
  }
}
