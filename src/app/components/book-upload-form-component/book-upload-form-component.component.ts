import { BookService } from '@/app/service/book.service';
import { Component, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-upload-form-component',
  templateUrl: './book-upload-form-component.component.html',
  styleUrls: ['./book-upload-form-component.component.scss'],
  standalone: false,
})
export class BookUploadFormComponentComponent implements OnDestroy {
  bookFrontPicUrl = '';
  bookBackPicUrl = '';
  bookSidePicUrl = '';
  bookUrl = '';
  subscriptionList: any[] = [];
  validateForm: FormGroup<{
    bookUrl: FormControl<string>;
  }>;
  constructor(
    private fb: NonNullableFormBuilder,
    private message: NzMessageService,
    private bookService: BookService,
  ) {
    this.validateForm = this.fb.group({
      bookUrl: ['', [Validators.required, Validators.min(1)]],
    });
  }

  encodeURIComponent(str: any) {
    return encodeURIComponent(str);
  }

  //上传海报逻辑
  beforeUploadPic = (file: NzUploadFile): boolean | Observable<boolean> => {
    if (file.size! > 10 * 1024 * 1024 * 8) {
      this.message.error('文件不能超过10MB');
      return false;
    }
    return true;
  };
  handleBookFrontPicUrlChange = (e: any) => {
    if (e.type === 'success') {
      if (e.file.response.code === 200) {
        this.bookFrontPicUrl = e.file.response.data;
      }
    }
  };
  handleBookBackPicUrlChange = (e: any) => {
    if (e.type === 'success') {
      if (e.file.response.code === 200) {
        this.bookBackPicUrl = e.file.response.data;
      }
    }
  };
  handleBookSidePicUrlChange = (e: any) => {
    if (e.type === 'success') {
      if (e.file.response.code === 200) {
        this.bookSidePicUrl = e.file.response.data;
      }
    }
  };

  submitForm() {
    if (
      !this.bookFrontPicUrl ||
      !this.bookBackPicUrl ||
      !this.bookSidePicUrl ||
      !this.validateForm.value.bookUrl
    ) {
      this.message.error('请完整填写表单！');
      return 'incorrectParam';
    }
    const params = {
      bookFrontPicUrl: this.bookFrontPicUrl,
      bookBackPicUrl: this.bookBackPicUrl,
      bookSidePicUrl: this.bookSidePicUrl,
      bookUrl: this.validateForm.value.bookUrl,
    };
    this.subscriptionList.push(
      this.bookService.addBook(params).subscribe((res) => {
        if (res.code === 200) {
          this.message.success('上传成功！');
        } else {
          this.message.error('上传失败！');
        }
      }),
    );
  }
  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscripion) => {
      subscripion.unsubscribe();
    });
  }
}
