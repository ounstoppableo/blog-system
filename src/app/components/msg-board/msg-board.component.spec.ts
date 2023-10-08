import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgBoardComponent } from './msg-board.component';

describe('MsgBoardComponent', () => {
  let component: MsgBoardComponent;
  let fixture: ComponentFixture<MsgBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MsgBoardComponent],
    });
    fixture = TestBed.createComponent(MsgBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
