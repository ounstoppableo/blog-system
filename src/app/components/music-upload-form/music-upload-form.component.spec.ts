import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicUploadFormComponent } from './music-upload-form.component';

describe('MusicUploadFormComponent', () => {
  let component: MusicUploadFormComponent;
  let fixture: ComponentFixture<MusicUploadFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MusicUploadFormComponent],
    });
    fixture = TestBed.createComponent(MusicUploadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
