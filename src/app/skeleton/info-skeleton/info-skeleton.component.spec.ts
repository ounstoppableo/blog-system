import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSkeletonComponent } from './info-skeleton.component';

describe('InfoSkeletonComponent', () => {
  let component: InfoSkeletonComponent;
  let fixture: ComponentFixture<InfoSkeletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoSkeletonComponent],
    });
    fixture = TestBed.createComponent(InfoSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
