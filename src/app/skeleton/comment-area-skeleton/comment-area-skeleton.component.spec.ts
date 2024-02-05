import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentAreaSkeletonComponent } from './comment-area-skeleton.component';

describe('CommentAreaSkeletonComponent', () => {
  let component: CommentAreaSkeletonComponent;
  let fixture: ComponentFixture<CommentAreaSkeletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentAreaSkeletonComponent],
    });
    fixture = TestBed.createComponent(CommentAreaSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
