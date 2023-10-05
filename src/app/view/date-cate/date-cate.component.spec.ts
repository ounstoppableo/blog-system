import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateCateComponent } from './date-cate.component';

describe('DateCateComponent', () => {
  let component: DateCateComponent;
  let fixture: ComponentFixture<DateCateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DateCateComponent]
    });
    fixture = TestBed.createComponent(DateCateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
