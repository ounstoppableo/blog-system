import { CategoryService } from '@/app/service/category.service';
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
  loading = true;
  constructor(private categoryService: CategoryService) {}
  ngOnInit(): void {
    this.categoryService
      .getArticleInTagCount()
      .subscribe((res: resType<any>) => {
        this.loading = false;
        if (res.code === 200) this.tags = res.data;
      });
  }
}
