import { tag } from "../home/home";

export interface articleInfo {
  articleId: string;
  title: string;
  tags: tag[];
  subTime: string;
  lastModifyTime: string;
  description: string;
  backImgUrl: string;
  folderName: string;
}
