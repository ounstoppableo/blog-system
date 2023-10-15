import { NgModule } from '@angular/core';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';

import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';

@NgModule({
  declarations: [],
  imports: [
    NzDrawerModule,
    NzMessageModule,
    NzButtonModule,
    NzModalModule,
    NzUploadModule,
    NzInputModule,
    NzSelectModule,
    NzFormModule,
    NzIconModule,
    NzPopconfirmModule,
    NzPaginationModule,
    NzAnchorModule,
  ],
  exports: [
    NzAnchorModule,
    NzPaginationModule,
    NzPopconfirmModule,
    NzDrawerModule,
    NzMessageModule,
    NzButtonModule,
    NzModalModule,
    NzUploadModule,
    NzInputModule,
    NzSelectModule,
    NzFormModule,
    NzIconModule,
  ],
})
export class NzDesignModule {
  constructor(private nzIconService: NzIconService) {
    this.nzIconService.changeAssetsSource('/icons');
  }
}
