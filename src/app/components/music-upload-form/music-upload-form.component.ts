import { MusicService } from '@/app/service/music.service';
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
  selector: 'app-music-upload-form',
  templateUrl: './music-upload-form.component.html',
  styleUrls: ['./music-upload-form.component.scss'],
  standalone: false,
})
export class MusicUploadFormComponent implements OnDestroy {
  subscriptionList: any[] = [];
  picUrl = '';
  hadUploadMusic = false;
  hadUploadLyric = false;
  musicUrl = '';
  LyricUrl = '';
  validateForm: FormGroup<{
    musicName: FormControl<string>;
    musicAuthor: FormControl<string>;
  }>;
  constructor(
    private fb: NonNullableFormBuilder,
    private message: NzMessageService,
    private musicService: MusicService,
  ) {
    this.validateForm = this.fb.group({
      musicName: ['', [Validators.required, Validators.min(1)]],
      musicAuthor: ['', [Validators.required, Validators.min(1)]],
    });
  }

  encodeURIComponent(str: any) {
    return encodeURIComponent(str);
  }

  //上传音乐的逻辑
  beforeMusicUpload = (file: NzUploadFile): boolean | Observable<boolean> => {
    if (file.size! > 10 * 1024 * 1024 * 8) {
      this.message.error('文件不能超过10MB');
      return false;
    }
    this.validateForm.setValue({
      musicName: file.name.slice(0, file.name.length - 4) || '',
      musicAuthor: this.validateForm.value.musicAuthor || '',
    });
    this.hadUploadMusic = true;
    return true;
  };
  removeMusic = (): boolean | Observable<boolean> => {
    if (this.musicUrl) {
      this.subscriptionList.push(
        this.musicService.deleteMusic(this.musicUrl).subscribe((res) => {
          if (res.code === 200) {
            this.musicUrl = '';
            this.hadUploadMusic = false;
          } else {
            this.message.error(res.msg);
          }
        }),
      );
    } else {
      this.hadUploadMusic = false;
    }
    return true;
  };
  uploadMusic = (e: any) => {
    if (e.type === 'success') {
      if (e.file.response.code === 200) {
        this.musicUrl = e.file.response.url;
      }
    }
  };

  //上传歌词的逻辑
  beforeLyricUpload = (file: NzUploadFile): boolean | Observable<boolean> => {
    if (file.size! > 10 * 1024 * 1024 * 8) {
      this.message.error('文件不能超过10MB');
      return false;
    }
    this.hadUploadLyric = true;
    return true;
  };
  removeLyric = (): boolean | Observable<boolean> => {
    if (this.LyricUrl) {
      this.subscriptionList.push(
        this.musicService.deleteLyric(this.LyricUrl).subscribe((res) => {
          if (res.code === 200) {
            this.LyricUrl = '';
            this.hadUploadLyric = false;
          } else {
            this.message.error(res.msg);
          }
        }),
      );
    } else {
      this.hadUploadLyric = false;
    }
    return true;
  };
  uploadLyric = (e: any) => {
    if (e.type === 'success') {
      if (e.file.response.code === 200) {
        this.LyricUrl = e.file.response.url;
      }
    }
  };

  //上传海报逻辑
  beforeUploadPic = (file: NzUploadFile): boolean | Observable<boolean> => {
    if (file.size! > 10 * 1024 * 1024 * 8) {
      this.message.error('文件不能超过10MB');
      return false;
    }
    return true;
  };
  handlePicChange = (e: any) => {
    if (e.type === 'success') {
      if (e.file.response.code === 200) {
        this.picUrl = e.file.response.data;
      }
    }
  };

  submitForm() {
    if (
      !this.picUrl ||
      !this.validateForm.value.musicName ||
      !this.validateForm.value.musicAuthor ||
      !this.musicUrl
    ) {
      this.message.error('请完整填写表单！');
      return 'incorrectParam';
    }
    const params = {
      picUrl: this.picUrl,
      lyricUrl: this.LyricUrl,
      musicUrl: this.musicUrl,
      musicName: this.validateForm.value.musicName,
      musicAuthor: this.validateForm.value.musicAuthor,
    };
    this.subscriptionList.push(
      this.musicService.addMusicInfo(params).subscribe((res) => {
        if (res.code === 200) {
          this.message.success('上传成功！');
        } else {
          this.message.error('上传失败！');
        }
      }),
    );
  }
  close() {
    this.musicUrl &&
      this.subscriptionList.push(
        this.musicService.deleteMusic(this.musicUrl).subscribe(),
      );
    this.LyricUrl &&
      this.subscriptionList.push(
        this.musicService.deleteLyric(this.LyricUrl).subscribe(),
      );
  }
  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscripion) => {
      subscripion.unsubscribe();
    });
  }
}
