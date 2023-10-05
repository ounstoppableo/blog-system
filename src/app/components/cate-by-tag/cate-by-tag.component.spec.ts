import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CateByTagComponent } from './cate-by-tag.component';

describe('CateByTagComponent', () => {
  let component: CateByTagComponent;
  let fixture: ComponentFixture<CateByTagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CateByTagComponent],
    });
    fixture = TestBed.createComponent(CateByTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
