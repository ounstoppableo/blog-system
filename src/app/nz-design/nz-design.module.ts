import { NgModule } from '@angular/core';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(
  (key) => antDesignIcons[key],
);
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
    NzIconModule.forRoot(icons),
    NzPopconfirmModule,
    NzPaginationModule,
    NzAnchorModule
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
export class NzDesignModule {}
