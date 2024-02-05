import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueSkeletonComponent } from './catalogue-skeleton.component';

describe('CatalogueSkeletonComponent', () => {
  let component: CatalogueSkeletonComponent;
  let fixture: ComponentFixture<CatalogueSkeletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogueSkeletonComponent]
    });
    fixture = TestBed.createComponent(CatalogueSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
