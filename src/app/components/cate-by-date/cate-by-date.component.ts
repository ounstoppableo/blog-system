import { CategoryService } from '@/app/service/category.service';
import { dateCaterory } from '@/types/category/category';
import { articleInfo } from '@/types/overview/overview';
import { resType } from '@/types/response/response';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cate-by-date',
  templateUrl: './cate-by-date.component.html',
  styleUrls: ['./cate-by-date.component.scss'],
})
export class CateByDateComponent implements OnInit {
  @Input()
  smallSize = false;
  dateCategory: dateCaterory[] = []
  constructor(private catecogyService: CategoryService, private router: Router) { }
  ngOnInit(): void {
    this.getDateCategoty()
  }
  getDateCategoty() {
    this.catecogyService.getAllArticleInfo().subscribe((res: resType<articleInfo[]>) => {
      if (res.code === 200) {
        const dateCate = Array.from(new Set((res.data as articleInfo[]).map((item: articleInfo) => {
          return item.lastModifyTime.slice(0, 7)
        })))
        dateCate.forEach(dateCateItem => {
          this.dateCategory.push({
            dateCate: dateCateItem,
            articleInfos: (res.data as articleInfo[]).filter(item => item.lastModifyTime.includes(dateCateItem))
          })
        })
      }
    })
  }
  toArticle(articleId: string) {
    this.router.navigate(['article', articleId])
  }
}
