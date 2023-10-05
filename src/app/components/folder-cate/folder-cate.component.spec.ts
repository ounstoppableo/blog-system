import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderCateComponent } from './folder-cate.component';

describe('FolderCateComponent', () => {
  let component: FolderCateComponent;
  let fixture: ComponentFixture<FolderCateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FolderCateComponent]
    });
    fixture = TestBed.createComponent(FolderCateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
