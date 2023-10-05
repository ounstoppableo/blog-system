import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CateByDateComponent } from './cate-by-date.component';

describe('CateByDateComponent', () => {
  let component: CateByDateComponent;
  let fixture: ComponentFixture<CateByDateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CateByDateComponent],
    });
    fixture = TestBed.createComponent(CateByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
