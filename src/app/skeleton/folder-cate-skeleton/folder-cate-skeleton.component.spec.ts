import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderCateSkeletonComponent } from './folder-cate-skeleton.component';

describe('FolderCateSkeletonComponent', () => {
  let component: FolderCateSkeletonComponent;
  let fixture: ComponentFixture<FolderCateSkeletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FolderCateSkeletonComponent]
    });
    fixture = TestBed.createComponent(FolderCateSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
