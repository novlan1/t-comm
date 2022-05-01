import { getAccCellWidth as oriGetAccCellWidth } from './helper'

const cellHeight = 20
const extraHeight = 15
const extraBottom = 10
const extraWidth = 3
const maxColor = '#fc5531'
const minColor = 'green'

/**
 * 创建canvas的table
 * @param param0
 * @returns
 */
export function createCanvasTable({
  data,
  headers,
  title,
  cellWidthList,
  createCanvas,
}): {
  createCanvas: Function
} {
  const getAccCellWidth = oriGetAccCellWidth.bind(null, cellWidthList)

  const width = getAccCellWidth(headers.length - 1) * 2 + extraWidth * 4
  const height =
    (data.length + 1) * cellHeight * 2 + extraHeight * 2 + extraBottom

  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  function fillBackground() {
    ctx.font = '7px Arial'
    ctx.scale(2, 2)
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  function fillTitle() {
    ctx.lineWidth = 1
    ctx.strokeStyle = '#ccc'
    ctx.textAlign = 'start'
    ctx.fillStyle = '#000'
    ctx.fillText(title, 5, 10)
  }

  // 表头绘制
  function fillTableHeader() {
    ctx.textAlign = 'center'
    const colors = [
      '#000000',
      '#000000',
      '#ff0000',
      '#006fff',
      '#07c160',
      '#ff0000',
      '#006fff',
    ]

    for (let i = 0; i < headers.length; i++) {
      const cellWidth = cellWidthList[i]

      // eslint-disable-next-line prefer-destructuring
      ctx.fillStyle = colors[0]
      ctx.moveTo(
        Math.round(cellWidth / 2) + getAccCellWidth(i - 1) + extraWidth,
        0,
      )
      ctx.fillText(
        headers[i],
        Math.round(cellWidth / 2) + getAccCellWidth(i - 1) + extraWidth,
        13.5 + extraHeight,
      )
    }
  }

  // 文字
  function fillCellText() {
    for (let i = 0; i < data.length; i++) {
      Object.keys(data[i]).forEach((item, idx) => {
        let color
        const obj = data[i][item]

        if (obj.isMax || obj.isSecondMax) {
          color = maxColor
        } else if (obj.isMin || obj.isSecondMin) {
          color = minColor
        } else {
          color = '#000000'
        }

        const cellWidth = cellWidthList[idx]
        const textWidth =
          Math.round(cellWidth / 2) + getAccCellWidth(idx - 1) + extraWidth
        const textHeight = cellHeight * i + 33.5 + extraHeight

        // 少了序号，颜色值后移
        ctx.fillStyle = color

        if (obj.ratio) {
          ctx.fillText(`${obj.value}       `, textWidth, textHeight)

          ctx.font = '5px Arial'
          ctx.textAlign = 'right'
          ctx.fillStyle = 'rgba(0,0,0,0.8)'

          // 绘制趋势
          ctx.fillText(obj.ratio, textWidth + 30, textHeight)

          ctx.font = '7px Arial'
          ctx.textAlign = 'center'
        } else {
          ctx.fillText(`${obj.value}`, textWidth, textHeight)
        }
      })
    }
  }

  // 画线
  function drawLine() {
    // 竖线
    for (let i = 0; i < headers.length + 1; i++) {
      ctx.moveTo(getAccCellWidth(i - 1) + extraWidth, 0 + extraHeight)
      ctx.lineTo(
        getAccCellWidth(i - 1) + extraWidth,
        canvas.height / 2 - extraBottom / 2,
      )
    }

    // 横线
    for (let i = 0; i < data.length + 2; i++) {
      ctx.moveTo(0 + extraWidth, cellHeight * i + extraHeight)
      ctx.lineTo(canvas.width / 2 - extraWidth, cellHeight * i + extraHeight)
    }
    ctx.stroke()
  }

  fillBackground()
  fillTitle()
  fillTableHeader()
  fillCellText()
  drawLine()

  const imgUrl = canvas.toDataURL()
  return imgUrl
}
