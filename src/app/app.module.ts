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
import { CateByDateComponent } from './components/cate-by-date/cate-by-date.component';
import { FolderCateComponent } from './components/folder-cate/folder-cate.component';
import { CategoryComponent } from './view/category/category.component';
import { CateByTagComponent } from './components/cate-by-tag/cate-by-tag.component';
import { SingleTagCateComponent } from './components/single-tag-cate/single-tag-cate.component';
import { SingleFolderCateComponent } from './components/single-folder-cate/single-folder-cate.component';
import { SearchComponent } from './components/search/search.component';
import { MsgBoardComponent } from './components/msg-board/msg-board.component';
import { CommentAreaComponent } from './components/comment-area/comment-area.component';
import { CommentItemComponent } from './components/comment-item/comment-item.component';
import { AddMsgFormComponent } from './components/add-msg-form/add-msg-form.component';
import { MsgBoradPageComponent } from './view/msg-borad-page/msg-borad-page.component';
import { ForMsgBoardPageComponent } from './components/for-msg-board-page/for-msg-board-page.component';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { LoadingComponent } from './components/loading/loading.component';
import { CircleMenuComponent } from './components/circle-menu/circle-menu.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { monthToEnglishPipe } from './pipe/monthToEnglish';
import { MusicPlayerComponent } from './components/music-player/music-player.component';
import { MusicUploadFormComponent } from './components/music-upload-form/music-upload-form.component';
import { CateByDateSkeletonComponent } from './skeleton/cate-by-date-skeleton/cate-by-date-skeleton.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CateByTagSkeletonComponent } from './skeleton/cate-by-tag-skeleton/cate-by-tag-skeleton.component';
import { CommentAreaSkeletonComponent } from './skeleton/comment-area-skeleton/comment-area-skeleton.component';
import { ArticleContentSkeletonComponent } from './skeleton/article-content-skeleton/article-content-skeleton.component';
import { FolderCateSkeletonComponent } from './skeleton/folder-cate-skeleton/folder-cate-skeleton.component';
import { InfoSkeletonComponent } from './skeleton/info-skeleton/info-skeleton.component';
import { OverviewSkeletonComponent } from './skeleton/overview-skeleton/overview-skeleton.component';
import { SingleCateSkeletonComponent } from './skeleton/single-cate-skeleton/single-cate-skeleton.component';
import { CatalogueSkeletonComponent } from './skeleton/catalogue-skeleton/catalogue-skeleton.component';

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
    monthToEnglishPipe,
    DrawerComponent,
    AddArticleFormComponent,
    NoneComponent,
    CateByDateComponent,
    FolderCateComponent,
    CategoryComponent,
    CateByTagComponent,
    SingleTagCateComponent,
    SingleFolderCateComponent,
    SearchComponent,
    MsgBoardComponent,
    CommentAreaComponent,
    CommentItemComponent,
    AddMsgFormComponent,
    MsgBoradPageComponent,
    ForMsgBoardPageComponent,
    CatalogueComponent,
    LoadingComponent,
    CircleMenuComponent,
    NewsListComponent,
    MusicPlayerComponent,
    MusicUploadFormComponent,
    CateByDateSkeletonComponent,
    CateByTagSkeletonComponent,
    CommentAreaSkeletonComponent,
    ArticleContentSkeletonComponent,
    FolderCateSkeletonComponent,
    InfoSkeletonComponent,
    OverviewSkeletonComponent,
    SingleCateSkeletonComponent,
    CatalogueSkeletonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NzDesignModule,
    BrowserAnimationsModule,
    NgxSkeletonLoaderModule.forRoot({ theme: {extendsFromRoot: true,margin:0,padding:0}})
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
