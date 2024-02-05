import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewSkeletonComponent } from './overview-skeleton.component';

describe('OverviewSkeletonComponent', () => {
  let component: OverviewSkeletonComponent;
  let fixture: ComponentFixture<OverviewSkeletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OverviewSkeletonComponent],
    });
    fixture = TestBed.createComponent(OverviewSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
