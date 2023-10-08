import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgBoradPageComponent } from './msg-borad-page.component';

describe('MsgBoradPageComponent', () => {
  let component: MsgBoradPageComponent;
  let fixture: ComponentFixture<MsgBoradPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MsgBoradPageComponent],
    });
    fixture = TestBed.createComponent(MsgBoradPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
