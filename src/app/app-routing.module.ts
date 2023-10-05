import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { ArticleComponent } from './view/article/article.component';
import { LoginComponent } from './view/login/login.component';
import { CustomReuseStrategt } from './customReuseStrategy/customReuseStratege';
import { DateCateComponent } from './view/date-cate/date-cate.component';
import { CategoryComponent } from './view/category/category.component';
import { TagCateComponent } from './view/tag-cate/tag-cate.component';
import { TagPageComponent } from './view/tag-page/tag-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'prefix' },
  { path: 'home', component: HomeComponent },
  { path: 'article/:articleId', component: ArticleComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dateCate', component: DateCateComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'tagCate', component: TagCateComponent },
  { path: 'tagPage', component: TagPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
  providers: [{ provide: RouteReuseStrategy, useClass: CustomReuseStrategt }],
})
export class AppRoutingModule { }
