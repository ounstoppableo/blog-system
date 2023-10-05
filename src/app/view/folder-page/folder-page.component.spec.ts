import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderPageComponent } from './folder-page.component';

describe('FolderPageComponent', () => {
  let component: FolderPageComponent;
  let fixture: ComponentFixture<FolderPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FolderPageComponent]
    });
    fixture = TestBed.createComponent(FolderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
