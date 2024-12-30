import { HomeService } from '@/app/service/home.service';
import { addArticle, folderItem, tag } from '@/types/home/home';
import { articleInfo } from '@/types/overview/overview';
import { resType } from '@/types/response/response';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-add-article-form',
  templateUrl: './add-article-form.component.html',
  styleUrls: ['./add-article-form.component.scss'],
  standalone: false,
})
export class AddArticleFormComponent implements OnInit {
  //文档分类
  folderCategory: folderItem[] = [];
  //上传文章相关参数
  listOfOption: tag[] = []; //已有的标签选项
  ImgUploadLoading = false; //文章图片上传加载状态
  uploadLoading = false; //文章上传加载状态
  uploadFlag = false;
  formContent = new FormGroup<addArticle>({
    articleId: new FormControl(''),
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
    folderId: new FormControl('', [Validators.required]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(20),
      Validators.maxLength(100),
    ]),
    backImgUrl: new FormControl('', [Validators.required]),
    articleUrl: new FormControl(''),
    listOfTagOptions: new FormControl([], [Validators.required]),
  });
  get articleId() {
    return this.formContent.get('articleId');
  }
  get title() {
    return this.formContent.get('title');
  }
  get folderId() {
    return this.formContent.get('folderId');
  }
  get description() {
    return this.formContent.get('description');
  }
  get backImgUrl() {
    return this.formContent.get('backImgUrl');
  }
  get articleUrl() {
    return this.formContent.get('articleUrl');
  }
  get listOfTagOptions() {
    return this.formContent.get('listOfTagOptions');
  }
  ngOnInit(): void {
    this.homeService
      .getFolderCategory()
      .subscribe((res: resType<folderItem[]>) => {
        if (res.code === 200) this.folderCategory = res.data as folderItem[];
      });
  }
  //显示上传模态框
  showUploadModal(articleInfo?: articleInfo & { listOfTagOptions: string[] }) {
    if (articleInfo) {
      Object.keys(articleInfo).forEach((item: string) => {
        type itemType = Extract<
          keyof AddArticleFormComponent,
          keyof articleInfo
        >;
        if (item !== 'articleUrl')
          this[item as itemType]?.setValue(articleInfo[item as itemType]);
      });
    }
    if (!articleInfo) {
      this.articleUrl?.setValidators([Validators.required]);
    }
    this.uploadFlag = true;
    this.homeService.getTags().subscribe((res: resType<tag[]>) => {
      if (res.code === 200) this.listOfOption = res.data as tag[];
    });
  }
  //上传图片前的钩子
  beforeUploadImg = (file: NzUploadFile) => {
    const maxSize = 5 * 1024 * 1024;
    if (file.size! > maxSize) {
      this.message.error('文件大小超出限制，请控制在5MB以内！');
      return false;
    }
    if (!file.type?.includes('image')) {
      this.message.error('只能上传图片！');
      return false;
    }
    return true;
  };
  //监测上传图片的进度
  handleUploadImgChange(e: any) {
    if (e.type === 'start') this.ImgUploadLoading = true;
    if (e.type === 'success') {
      this.ImgUploadLoading = false;
      if (e.file.response.code === 200)
        this.formContent
          .get('backImgUrl')!
          .setValue('/api' + e.file.response.data);
    }
  }
  //上传文件的回调
  handleUploadFileChange(e: any) {
    if (e.type === 'start') this.uploadLoading = true;
    if (e.type === 'success') {
      if (e.file.response.code === 200) {
        this.uploadLoading = false;
        this.articleUrl!.setValue(e.file.response.data);
      }
    }
  }
  //删除文件的回调
  removeFile = (file: any) => {
    this.uploadLoading = false;
    this.articleUrl!.setValue('');
    this.homeService
      .delFile(file.response.data)
      .subscribe((res: resType<any>) => {
        if (res.code === 200) return this.message.success('删除成功');
      });
    return true;
  };
  //取消的回调
  handleCancel() {
    this.uploadFlag = false;
    this.formContent.reset();
  }
  //确认的回调
  handleOk() {
    if (this.formContent.valid) {
      if (!this.formContent.value.articleId) {
        this.homeService
          .uploadArticle(this.formContent.value)
          .subscribe((res: resType<any>) => {
            if (res.code === 200) {
              this.message.success('添加成功');
              this.uploadFlag = false;
              this.formContent.reset();
            }
          });
      } else {
        this.homeService
          .updateArticleInfo(this.formContent.value)
          .subscribe((res: resType<any>) => {
            if (res.code === 200) {
              this.message.success('更新成功');
              this.uploadFlag = false;
              this.formContent.reset();
            }
          });
      }
    } else {
      Object.values(this.formContent.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      if (this.backImgUrl?.invalid) this.message.error('请上传图片');
      if (!this.articleId?.value && this.articleUrl?.invalid)
        this.message.error('请上传文章');
    }
  }
  constructor(
    private message: NzMessageService,
    private homeService: HomeService,
  ) {}
}
