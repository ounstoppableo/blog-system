import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTagCateComponent } from './single-tag-cate.component';

describe('SingleTagCateComponent', () => {
  let component: SingleTagCateComponent;
  let fixture: ComponentFixture<SingleTagCateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleTagCateComponent]
    });
    fixture = TestBed.createComponent(SingleTagCateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
