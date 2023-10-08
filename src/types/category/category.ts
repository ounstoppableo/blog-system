import { articleInfo } from '@/types/overview/overview';
import { folderItem } from '../home/home';
export interface dateCaterory {
  dateCate: string;
  articleInfos: articleInfo[];
}
export interface articleInFolderCount extends Required<folderItem> {
  count: number;
}
export interface singleFolderMapArticleInfos {
  folderName: string;
  total: number;
  pages: number;
  articleInfos: articleInfo[];
}
export interface singleTagMapArticleInfos {
  tagName: string;
  total: number;
  pages: number;
  articleInfos: articleInfo[];
}
