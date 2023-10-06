import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleFolderCateComponent } from './single-folder-cate.component';

describe('SingleFolderCateComponent', () => {
  let component: SingleFolderCateComponent;
  let fixture: ComponentFixture<SingleFolderCateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleFolderCateComponent],
    });
    fixture = TestBed.createComponent(SingleFolderCateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
