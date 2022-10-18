/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * 为图片增加文字
 */
export async function addTextForImg({
  width,
  height,
  textList,
  imgPath,
}) {
  const canvasLibrary = require('canvas');
  const sizeOf = require('image-size');
  const { createCanvas, loadImage } = canvasLibrary;

  const image = await loadImage(imgPath);
  const lineHeight = 15;
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
    width,
    height + topHeight,
  );

  const ctx = canvas.getContext('2d');


  function drawBackground() {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function fillTitle(textList) {
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

