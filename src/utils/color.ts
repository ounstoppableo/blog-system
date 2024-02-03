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
export function getGrayishColor(rgbaColor: any) {
  // 将 RGBA 颜色字符串转换为数组 [r, g, b, a]
  const rgbaArray = rgbaColor.slice(5, -1).split(',').map(Number);

  // 计算颜色的相对亮度
  const brightness =
    (rgbaArray[0] * 299 + rgbaArray[1] * 587 + rgbaArray[2] * 114) / 1000;

  // 计算偏向灰色的文字颜色
  const grayishValue = Math.round(brightness * 0.8); // 调整 0.8 的值以控制灰色的深浅

  // 返回偏灰文字颜色的 RGBA 表示
  return `rgba(${grayishValue}, ${grayishValue}, ${grayishValue}, ${rgbaArray[3]})`;
}
