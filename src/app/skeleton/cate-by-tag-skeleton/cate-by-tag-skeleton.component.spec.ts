import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CateByTagSkeletonComponent } from './cate-by-tag-skeleton.component';

describe('CateByTagSkeletonComponent', () => {
  let component: CateByTagSkeletonComponent;
  let fixture: ComponentFixture<CateByTagSkeletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CateByTagSkeletonComponent],
    });
    fixture = TestBed.createComponent(CateByTagSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
