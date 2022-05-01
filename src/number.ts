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
