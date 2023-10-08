import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForMsgBoardPageComponent } from './for-msg-board-page.component';

describe('ForMsgBoardPageComponent', () => {
  let component: ForMsgBoardPageComponent;
  let fixture: ComponentFixture<ForMsgBoardPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForMsgBoardPageComponent],
    });
    fixture = TestBed.createComponent(ForMsgBoardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
