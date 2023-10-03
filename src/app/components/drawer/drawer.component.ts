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
    if (this.routes.routeConfig?.path === 'home') {
      location.reload();
      window.scrollTo(0, 0);
    } else {
      this.router.navigate(['/home']);
    }
  }
  open() {
    this.drawerVisible = true;
  }
  close() {
    this.drawerVisible = false;
  }
  constructor(
    private router: Router,
    private routes: ActivatedRoute,
  ) {}
}
