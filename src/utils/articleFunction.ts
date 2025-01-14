export const articleGenerateTitleList = (article: string) => {
  const articleTitleList = article.match(
    /<h[1-6]{1}>.*?<\/h[1-6]{1}>/g,
  ) as any[];
  const titleMap: any = {};
  return articleTitleList.map((item, index) => {
    const temp = tagSplit(item);
    if (typeof titleMap[temp.title] === 'number') {
      titleMap[temp.title]++;
      temp.title += titleMap[temp.title];
    } else {
      titleMap[temp.title] = 0;
    }
    return item.replace(
      /<(h[1-6]{1})>(.*?)<\/(h[1-6]{1})/,
      `<$1>${temp.title}<$2>`,
    );
  });
};
export function tagSplit(tagString: string) {
  const temp = tagString.split('<')[1].split('>');
  const title = temp[1];
  const tagLevel = +temp[0].split('h')[1];
  return {
    title,
    tagLevel,
  };
}
//根据文章标题列表获取文章标题树
export function articleTitleListToTree(
  articleTitleList: string[],
  flag = false,
) {
  const tree: any[] = [];

  let firstSon: any = null;
  let stopFlag = false;
  articleTitleList.forEach((item, index) => {
    if (!stopFlag) {
      const temp = tagSplit(item);
      if (!tree.length || temp.tagLevel === tree[tree.length - 1].tagLevel) {
        tree.push({ ...temp, children: [] });
        firstSon = null;
      } else if (temp.tagLevel < tree[tree.length - 1].tagLevel) {
        if (flag) {
          tree.push({ ...temp, children: [] });
          firstSon = null;
        }
        if (!flag) return (stopFlag = true);
      } else if (temp.tagLevel > tree[tree.length - 1].tagLevel) {
        if (!firstSon) {
          firstSon = temp;
        }
        if (firstSon === temp) {
          tree[tree.length - 1].children = articleTitleListToTree(
            articleTitleList.slice(index),
            false,
          );
        }
      }
    }
  });
  return tree;
}

export function articleGenerateId(article: string) {
  const titleMap: any = {};
  return article.replace(/<h[1-6]{1}>.*?<\/h[1-6]{1}>/g, (match: string) => {
    const temp = match.split('<');
    const tagEnd = temp[2];
    const temp2 = temp[1].split('>');
    const tagStart = temp2[0];
    let title = temp2[1];
    let id = title;
    if (typeof titleMap[title] === 'number') {
      titleMap[title]++;
      id += titleMap[title];
    } else {
      titleMap[title] = 0;
    }
    return `<${tagStart} id="${id.replace(
      titleRegular,
      '',
    )}">${title}<${tagEnd}`;
  });
}

export const titleRegular = /[\(\-\)\$\.\s\&\@\;]/g;
