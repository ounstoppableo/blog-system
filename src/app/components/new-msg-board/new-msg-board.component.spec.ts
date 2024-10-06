import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMsgBoardComponent } from './new-msg-board.component';

describe('NewMsgBoardComponent', () => {
  let component: NewMsgBoardComponent;
  let fixture: ComponentFixture<NewMsgBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewMsgBoardComponent]
    });
    fixture = TestBed.createComponent(NewMsgBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
