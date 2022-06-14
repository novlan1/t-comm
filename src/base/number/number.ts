/**
 * 获取相对于过去数据的比例
 * @param value 当前数据
 * @param preValue 之前数据
 * @returns
 *
 * @example
 * ```ts
 * getUnitPreviousRatio(1, 0) // +999+%
 * ```
 */
export function getUnitPreviousRatio(value, preValue) {
  const interval = value - preValue
  const symbol = interval > 0 ? '+' : ''

  if (preValue === 0) {
    preValue = 0.01
  }

  let intervalRatio = ((interval / preValue) * 100).toFixed(1)
  if (+intervalRatio > 999) {
    intervalRatio = '999+'
  }
  return `${symbol}${intervalRatio}%`
}

export const NUMBER_CHI_MAP = {
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
  7: '七',
  8: '八',
  9: '九',
  10: '十',
  11: '十一',
  12: '十二',
  13: '十三',
  14: '十四',
  15: '十五',
  16: '十六',
  17: '十七',
  18: '十八',
  19: '十九',
  20: '二十',
}
