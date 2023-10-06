import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { ArticleComponent } from './view/article/article.component';
import { LoginComponent } from './view/login/login.component';
import { CustomReuseStrategt } from './customReuseStrategy/customReuseStratege';
import { CategoryComponent } from './view/category/category.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'prefix' },
  { path: 'home', component: HomeComponent },
  { path: 'article/:articleId', component: ArticleComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dateCate', component: CategoryComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'tagCate', component: CategoryComponent },
  { path: 'tagPage/:tagName', component: CategoryComponent },
  { path: 'folderPage/:folderId', component: CategoryComponent },
  { path: 'search', component: CategoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
  providers: [{ provide: RouteReuseStrategy, useClass: CustomReuseStrategt }],
})
export class AppRoutingModule {}
