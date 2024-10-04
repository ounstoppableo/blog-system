import { NgModule } from '@angular/core';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';

import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

@NgModule({
  declarations: [],
  imports: [
    NzPopoverModule,
    NzDrawerModule,
    NzMessageModule,
    NzButtonModule,
    NzModalModule,
    NzUploadModule,
    NzInputModule,
    NzSelectModule,
    NzFormModule,
    NzPopconfirmModule,
    NzPaginationModule,
    NzAnchorModule,
    NzImageModule,
  ],
  exports: [
    NzPopoverModule,
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
    NzImageModule,
  ],
})
export class NzDesignModule {}
