import { SiteInfoService } from '@/app/service/siteInfo.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(
    private routes: ActivatedRoute,
    private siteInfoService: SiteInfoService,
    private router: Router,
  ) {}
  VT = 0;
  ngOnInit(): void {
    this.siteInfoService.getVT().subscribe((res) => {
      if (res.code === 200) {
        this.VT = res.VT;
      }
    });
  }
  goHome() {
    this.router.navigate(['home']);
  }
}
