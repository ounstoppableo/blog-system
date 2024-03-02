// 计算平均颜色
export function getAverageColor(pixelData: any) {
  let totalR = 0,
    totalG = 0,
    totalB = 0;

  for (let i = 0; i < pixelData.length; i += 4) {
    totalR += pixelData[i];
    totalG += pixelData[i + 1];
    totalB += pixelData[i + 2];
  }

  const pixelCount = pixelData.length / 4;
  const averageColor = {
    r: Math.round(totalR / pixelCount),
    g: Math.round(totalG / pixelCount),
    b: Math.round(totalB / pixelCount),
  };

  return averageColor;
}

//计算深色
export function getDarkColor(color: any) {
  const darkFactor = 0.7; // 调整这个因子来控制浅色调的程度
  const darkColor = {
    r: Math.round(color.r * darkFactor),
    g: Math.round(color.g * darkFactor),
    b: Math.round(color.b * darkFactor),
  };

  return `rgb(${darkColor.r}, ${darkColor.g}, ${darkColor.b} , 0.5)`;
}

// 获取浅色调
export function getLighterColor(color: any) {
  const lightenFactor = 1.2; // 调整这个因子来控制浅色调的程度
  const lighterColor = {
    r: Math.round(color.r * lightenFactor),
    g: Math.round(color.g * lightenFactor),
    b: Math.round(color.b * lightenFactor),
  };

  return `rgb(${lighterColor.r}, ${lighterColor.g}, ${lighterColor.b} , 0.5)`;
}

//根据底色计算偏灰字体颜色
export function getGrayishColor(rgbaColor: string): string {
  // 将 RGBA 颜色字符串转换为数组 [r, g, b, a]
  const rgbaArray: number[] = rgbaColor.slice(5, -1).split(',').map(Number);

  // 计算背景颜色的相对亮度
  const bgBrightness: number =
    (rgbaArray[0] * 299 + rgbaArray[1] * 587 + rgbaArray[2] * 114) / 1000;

  // 计算偏向灰色的文字颜色
  let grayishValue: number = Math.round(bgBrightness * 0.6); // 调整系数以控制灰色偏向程度
  grayishValue = Math.min(grayishValue + 50, 255); // 确保灰色值不超过 255

  // 计算对比度
  const contrastRatio = Math.abs((rgbaArray[0] * 0.299 + rgbaArray[1] * 0.587 + rgbaArray[2] * 0.114 - grayishValue) / 255);

  // 如果对比度小于阈值，则根据对比度调整灰色值
  const contrastThreshold = 0.5; // 自定义对比度阈值
  if (contrastRatio < contrastThreshold) {
    const adjustValue = (contrastThreshold - contrastRatio) * 255;
    grayishValue = Math.min(grayishValue + adjustValue, 255);
  }

  // 返回偏灰文字颜色的 RGBA 表示
  return `rgba(${grayishValue}, ${grayishValue}, ${grayishValue}, ${rgbaArray[3]})`;
}
