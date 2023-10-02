import { FormControl } from "@angular/forms";

export interface tag {
  tagName: string;
  tagColor: string;
}
export interface folderItem {
  folderId: number,
  folderName: string
}
export interface addArticle {
  articleId?: FormControl<string | null>,
  title: FormControl<string | null>,
  folderId: FormControl<string | null>,
  description: FormControl<string | null>,
  backImgUrl: FormControl<string | null>,
  articleUrl: FormControl<string | null>,
  listOfTagOptions: FormControl<string[] | null>
}
