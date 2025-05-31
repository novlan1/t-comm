import { getCanvas } from './get-canvas';
/**
 * 为图片增加文字
 *
 * @param {Object} config 配置
 * @param {number} config.width 宽度
 * @param {number} config.height 高度
 * @param {Array<string>} config.textList 文字列表，支持多行
 * @param {string} config.imgPath 图片路径
 * @returns {string} canvas.toDataURL生成的base64图片
 *
 * @example
 *
 * ```ts
 * const imgUrl = addTextForImg({
 *   width: 300,
 *   height: 300,
 *   textList: ['第一行', '第二行'],
 *   imgPath: './test.png',
 * })
 * ```
 */
export async function addTextForImg({
  width,
  height,
  textList,
  imgPath,
}: {
  width: number;
  height: number;
  textList: Array<string>;
  imgPath: string;
}): Promise<string> {
  const canvasLibrary = getCanvas();
  if (!canvasLibrary) return '';

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const sizeOf = require('image-size');
  const { createCanvas, loadImage } = canvasLibrary;

  const image = await loadImage(imgPath);
  const lineHeight = 15;
  const dpr = 2;
  const topHeight = textList.length * lineHeight + 15;

  const dimensions = sizeOf(imgPath);
  const { height: oHeight, width: oWidth } = dimensions;
  if (!width) {
    width = oWidth;
  }
  if (!height) {
    height = oHeight;
  }

  const canvas = createCanvas(
    width * dpr,
    (height + topHeight) * dpr,
  );

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  function drawBackground() {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function fillTitle(textList: Array<string>) {
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#ccc';
    ctx.textAlign = 'start';
    ctx.font = '10px Arial';
    ctx.fillStyle = '#000';
    for (let j = 0; j < textList.length; j++) {
      ctx.fillText(textList[j], 15, 20 + (j * lineHeight));
    }
  }

  drawBackground();


  ctx.drawImage(
    image,
    0,
    topHeight,
    width,
    width,
  );

  fillTitle(textList);

  const imgUrl = canvas.toDataURL();


  return imgUrl;
}

