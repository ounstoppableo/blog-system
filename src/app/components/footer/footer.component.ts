import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(private routes: ActivatedRoute, private router: Router) { }
  goHome() {
    if (this.routes.routeConfig?.path === 'home') {
      location.reload();
      window.scrollTo(0, 0);
    } else {
      this.router.navigate(['/home']);
    }
  }
}
