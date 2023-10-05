import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagCateComponent } from './tag-cate.component';

describe('TagCateComponent', () => {
  let component: TagCateComponent;
  let fixture: ComponentFixture<TagCateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TagCateComponent],
    });
    fixture = TestBed.createComponent(TagCateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
