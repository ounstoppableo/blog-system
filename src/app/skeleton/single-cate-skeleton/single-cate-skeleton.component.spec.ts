import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleFolderSkeletonComponent } from './single-folder-skeleton.component';

describe('SingleFolderSkeletonComponent', () => {
  let component: SingleFolderSkeletonComponent;
  let fixture: ComponentFixture<SingleFolderSkeletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleFolderSkeletonComponent],
    });
    fixture = TestBed.createComponent(SingleFolderSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
