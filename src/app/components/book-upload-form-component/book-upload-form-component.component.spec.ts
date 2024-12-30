import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookUploadFormComponentComponent } from './book-upload-form-component.component';

describe('BookUploadFormComponentComponent', () => {
  let component: BookUploadFormComponentComponent;
  let fixture: ComponentFixture<BookUploadFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookUploadFormComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookUploadFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
