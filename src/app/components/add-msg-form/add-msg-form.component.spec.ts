import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMsgFormComponent } from './add-msg-form.component';

describe('AddMsgFormComponent', () => {
  let component: AddMsgFormComponent;
  let fixture: ComponentFixture<AddMsgFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMsgFormComponent],
    });
    fixture = TestBed.createComponent(AddMsgFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
