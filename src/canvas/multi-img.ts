/* eslint-disable @typescript-eslint/no-require-imports */
import { saveBase64ImgToFile } from '../node-img';

/**
 * 绘制多张图
 * @param {object} config 输入参数
 * @param {Array<string>} config.imgs base64图片列表
 * @returns {string} 图片url
 *
 * @example
 *
 * mergeMultiCanvasPic({
 *   imgs: [img, img2, img3],
 * })
 */
export async function mergeMultiCanvasPic({
  imgs,
}) {
  const path = require('path');
  const sizeOf = require('image-size');
  const canvasLibrary = require('canvas');
  const { createCanvas, loadImage } = canvasLibrary;

  const getSavePath = i => path.resolve(__dirname, `${i}.png`);
  const dimensionMap: {
    width: Array<number>
    height: Array<number>
  } = { width: [], height: [] };

  for (let i = 0; i < imgs.length; i++) {
    const img = imgs[i];
    const savePath = getSavePath(i);

    await saveBase64ImgToFile({
      imgUrl: img,
      savePath,
    });

    const dimensions = sizeOf(savePath);
    const { height: oHeight, width: oWidth } = dimensions;

    dimensionMap.width.push(oWidth);
    dimensionMap.height.push(oHeight);
  }

  const getMaxWidth = () => Math.max(...dimensionMap.width);
  const getTotalHeight = () => dimensionMap.height.reduce((acc, item) => acc + item, 0);
  const getPastHeight = (heights, index) => {
    let res = 0;
    for (let i = 0; i < heights.length; i++) {
      if (i < index) {
        res += heights[i];
      }
    }
    return res;
  };
  const ONE_HEIGHT_GAP = 50;
  const getPastGap = index => index * ONE_HEIGHT_GAP;

  const CANVAS_MARGIN_TOP = 0;
  const canvas = createCanvas(
    getMaxWidth(),
    getTotalHeight() + CANVAS_MARGIN_TOP + getPastGap(imgs.length - 1),
  );

  const ctx = canvas.getContext('2d');

  function drawBackground() {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  drawBackground();

  for (let i = 0; i < imgs.length; i++) {
    const imgSrc = getSavePath(i);
    const dimensions = sizeOf(imgSrc);
    const { height: oHeight, width: oWidth } = dimensions;
    const image = await loadImage(imgSrc);

    ctx.drawImage(
      image,
      0,
      getPastHeight(dimensionMap.height, i) + getPastGap(i),
      oWidth,
      oHeight,
    );
  }

  const imgUrl = canvas.toDataURL();
  return imgUrl;
}
