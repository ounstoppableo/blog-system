import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './view/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { NzDesignModule } from './nz-design/nz-design.module';
import { ArticleComponent } from './view/article/article.component';
import { FooterComponent } from './components/footer/footer.component';
import { InfoComponent } from './components/info/info.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ContainerComponent } from './components/container/container.component';
import { ContextComponent } from './components/context/context.component';
import { LoginComponent } from './view/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './interceptor/interceptorProvider';
import { UserinfoComponent } from './components/userinfo/userinfo.component';
import { TagComponent } from './components/tag/tag.component';
import { MarkedPipe } from './pipe/marked.pipe';
import { DrawerComponent } from './components/drawer/drawer.component';
import { AddArticleFormComponent } from './components/add-article-form/add-article-form.component';
import { NoneComponent } from './components/none/none.component';
import { DateCateComponent } from './view/date-cate/date-cate.component';
import { CateByDateComponent } from './components/cate-by-date/cate-by-date.component';
import { FolderCateComponent } from './components/folder-cate/folder-cate.component';
import { CategoryComponent } from './view/category/category.component';
import { TagCateComponent } from './view/tag-cate/tag-cate.component';
import { CateByTagComponent } from './components/cate-by-tag/cate-by-tag.component';
import { TagPageComponent } from './view/tag-page/tag-page.component';
import { SingleTagCateComponent } from './components/single-tag-cate/single-tag-cate.component';
import { FolderPageComponent } from './view/folder-page/folder-page.component';
import { SingleFolderCateComponent } from './components/single-folder-cate/single-folder-cate.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ArticleComponent,
    FooterComponent,
    InfoComponent,
    OverviewComponent,
    ContainerComponent,
    ContextComponent,
    LoginComponent,
    UserinfoComponent,
    TagComponent,
    MarkedPipe,
    DrawerComponent,
    AddArticleFormComponent,
    NoneComponent,
    DateCateComponent,
    CateByDateComponent,
    FolderCateComponent,
    CategoryComponent,
    TagCateComponent,
    CateByTagComponent,
    TagPageComponent,
    SingleTagCateComponent,
    FolderPageComponent,
    SingleFolderCateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NzDesignModule,
    BrowserAnimationsModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
