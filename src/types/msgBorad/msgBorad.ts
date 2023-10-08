export interface addMsg {
  name: string,
  content: string,
  fatherMsgId?: string,
  articleId?: string,
  mail: string,
  website?: string
}
export interface msgItem extends addMsg {
  msgId:string,
  subTime: Date,
  upvoke: number,
  device: string,
  browser: string,
  avatar: string,
  children?: msgItem[],
  parent?: {
    parentName: string,
    parentWebsite: string
  }
}
