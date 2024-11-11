import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomArticleBoardComponent } from './random-article-board.component';

describe('RandomArticleBoardComponent', () => {
  let component: RandomArticleBoardComponent;
  let fixture: ComponentFixture<RandomArticleBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RandomArticleBoardComponent]
    });
    fixture = TestBed.createComponent(RandomArticleBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
