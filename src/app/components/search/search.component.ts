import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input()
  smallSize!: boolean;
  constructor(private router: Router) {}
  ngOnInit(): void {}
  goHome() {
    this.router.navigate(['home']);
  }
}
