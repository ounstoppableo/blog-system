import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './view/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';

import * as AllIcons from '@ant-design/icons-angular/icons';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(
  (key) => antDesignIcons[key],
);
@NgModule({
  declarations: [AppComponent, HomeComponent, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule, NzIconModule.forRoot(icons)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
