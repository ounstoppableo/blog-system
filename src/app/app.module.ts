import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './view/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';

import * as AllIcons from '@ant-design/icons-angular/icons';
import { ArticleComponent } from './view/article/article.component';
import { FooterComponent } from './components/footer/footer.component';
import { InfoComponent } from './components/info/info.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ContainerComponent } from './components/container/container.component';
import { ContextComponent } from './components/context/context.component';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(
  (key) => antDesignIcons[key],
);
@NgModule({
  declarations: [AppComponent, HomeComponent, HeaderComponent, ArticleComponent, FooterComponent, InfoComponent, OverviewComponent, ContainerComponent, ContextComponent],
  imports: [BrowserModule, AppRoutingModule, NzIconModule.forRoot(icons)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
