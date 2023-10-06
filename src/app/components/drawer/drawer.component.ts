import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent {
  drawerVisible = false;
  goHome() {
    this.router.navigate(['home']);
  }
  open() {
    this.drawerVisible = true;
  }
  close() {
    this.drawerVisible = false;
  }
  goSearch(){
    this.router.navigate(['search'])
  }
  constructor(
    private router: Router,
    private routes: ActivatedRoute,
  ) {}
}
