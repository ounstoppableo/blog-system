import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgAndArticleBoardSkeletonComponent } from './msg-and-article-board-skeleton.component';

describe('MsgAndArticleBoardSkeletonComponent', () => {
  let component: MsgAndArticleBoardSkeletonComponent;
  let fixture: ComponentFixture<MsgAndArticleBoardSkeletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MsgAndArticleBoardSkeletonComponent]
    });
    fixture = TestBed.createComponent(MsgAndArticleBoardSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
