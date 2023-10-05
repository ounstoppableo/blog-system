import { HomeService } from '@/app/service/home.service';
import { folderItem } from '@/types/home/home';
import { resType } from '@/types/response/response';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-folder-cate',
  templateUrl: './folder-cate.component.html',
  styleUrls: ['./folder-cate.component.scss'],
})
export class FolderCateComponent implements OnInit {
  @Input()
  smallSize!: boolean;
  folders: folderItem[] = [];
  constructor(private homeSevice: HomeService) {}
  ngOnInit(): void {
    this.homeSevice.getFolderCategory().subscribe((res: resType<any>) => {
      if (res.code === 200) this.folders = res.data as folderItem[];
    });
  }
}
