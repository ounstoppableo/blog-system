import { tag } from '../home/home';

export interface articleInfo {
  folderId: string;
  articleId: string;
  title: string;
  tags: tag[];
  subTime: string;
  lastModifyTime: string;
  description: string;
  backImgUrl: string;
  folderName: string;
  VT: number;
  wordsCount?: number;
  readTime?: string;
  toTop: string;
}
