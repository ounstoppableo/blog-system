import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleContentSkeletonComponent } from './article-content-skeleton.component';

describe('ArticleContentSkeletonComponent', () => {
  let component: ArticleContentSkeletonComponent;
  let fixture: ComponentFixture<ArticleContentSkeletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleContentSkeletonComponent],
    });
    fixture = TestBed.createComponent(ArticleContentSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
