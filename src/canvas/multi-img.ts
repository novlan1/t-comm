import { saveBase64ImgToFile } from '../node-img'

/**
 * 绘制多张图
 * @param param0 imgs 多张图片，sizeOf require('image-size')，canvasLibrary require('canvas'), require('fs'), require('path')
 * @returns
 * @example
 * ```ts
 * mergeMultiCanvasPic({
 *   imgs: [img, img2, img3],
 *   sizeOf: require('image-size'),
 *   canvasLibrary: require('canvas'),
 *   path: require('path'),
 *   fs: require('fs'),
 * })
 * ```
 */
export async function mergeMultiCanvasPic({
  imgs,
  sizeOf,
  canvasLibrary,
  path,
  fs,
}) {
  const { createCanvas, loadImage } = canvasLibrary

  const getSavePath = i => path.resolve(__dirname, `${i}.png`)
  const dimensionMap: {
    width: Array<number>
    height: Array<number>
  } = { width: [], height: [] }

  for (let i = 0; i < imgs.length; i++) {
    const img = imgs[i]
    const savePath = getSavePath(i)

    saveBase64ImgToFile({
      fs,
      imgUrl: img,
      savePath,
    })

    const dimensions = sizeOf(savePath)
    const { height: oHeight, width: oWidth } = dimensions

    dimensionMap.width.push(oWidth)
    dimensionMap.height.push(oHeight)
  }

  const getMaxWidth = () => Math.max(...dimensionMap.width)
  const getTotalHeight = () =>
    dimensionMap.height.reduce((acc, item) => acc + item, 0)
  const getPastHeight = (heights, index) => {
    let res = 0
    for (let i = 0; i < heights.length; i++) {
      if (i < index) {
        res += heights[i]
      }
    }
    return res
  }

  const CANVAS_MARGIN_TOP = 0
  const canvas = createCanvas(
    getMaxWidth(),
    getTotalHeight() + CANVAS_MARGIN_TOP,
  )

  const ctx = canvas.getContext('2d')

  function drawBackground() {
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  drawBackground()

  for (let i = 0; i < imgs.length; i++) {
    const imgSrc = getSavePath(i)
    const dimensions = sizeOf(imgSrc)
    const { height: oHeight, width: oWidth } = dimensions
    // eslint-disable-next-line no-await-in-loop
    const image = await loadImage(imgSrc)

    ctx.drawImage(
      image,
      0,
      getPastHeight(dimensionMap.height, i),
      oWidth,
      oHeight,
    )
  }

  const imgUrl = canvas.toDataURL()
  return imgUrl
}
