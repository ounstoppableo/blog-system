import { HomeService } from '@/app/service/home.service';
import { tag } from '@/types/home/home';
import { resType } from '@/types/response/response';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cate-by-tag',
  templateUrl: './cate-by-tag.component.html',
  styleUrls: ['./cate-by-tag.component.scss'],
})
export class CateByTagComponent implements OnInit {
  @Input()
  smallSize!: boolean;
  tags: tag[] = [];
  constructor(private homeService: HomeService) {}
  ngOnInit(): void {
    this.homeService.getTags().subscribe((res: resType<any>) => {
      if (res.code === 200) this.tags = res.data;
    });
  }
}
