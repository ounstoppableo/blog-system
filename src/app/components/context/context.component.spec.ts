import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextComponent } from './context.component';

describe('ContextComponent', () => {
  let component: ContextComponent;
  let fixture: ComponentFixture<ContextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContextComponent],
    });
    fixture = TestBed.createComponent(ContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
