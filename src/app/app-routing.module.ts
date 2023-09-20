import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { ArticleComponent } from './view/article/article.component';

const routes: Routes = [
  { path: '', redirectTo: 'article', pathMatch: 'prefix' },
  { path: 'home', component: HomeComponent },
  { path: 'article', component: ArticleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
