import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomArticleAndNewMsgComponent } from './random-article-and-new-msg.component';

describe('RandomArticleAndNewMsgComponent', () => {
  let component: RandomArticleAndNewMsgComponent;
  let fixture: ComponentFixture<RandomArticleAndNewMsgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RandomArticleAndNewMsgComponent]
    });
    fixture = TestBed.createComponent(RandomArticleAndNewMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
