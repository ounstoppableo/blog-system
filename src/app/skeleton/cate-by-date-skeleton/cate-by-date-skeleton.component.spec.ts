import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CateByDateSkeletonComponent } from './cate-by-date-skeleton.component';

describe('CateByDateSkeletonComponent', () => {
  let component: CateByDateSkeletonComponent;
  let fixture: ComponentFixture<CateByDateSkeletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CateByDateSkeletonComponent],
    });
    fixture = TestBed.createComponent(CateByDateSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
