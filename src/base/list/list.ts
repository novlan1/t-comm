/**
 * 打乱数组顺序
 *
 * @param {Array<any>} array - 数组
 * @returns {Array<any>} 乱序后的数组
 *
 * @example
 *
 * shuffle([1, 2, 3, 4, 5])
 *
 * // [3, 2, 1, 4, 5]
 *
 */
export function shuffle<T>(array: Array<T>): Array<T> {
  const arr = [...array];
  let m = arr.length;
  while (m > 1) {
    const index = Math.floor(Math.random() * m);
    m -= 1
    ;[arr[m], arr[index]] = [arr[index], arr[m]];
  }
  return arr;
}


/**
 * 获取累积宽度
 * @param {Array<number>} cellWidthList - 宽度列表
 * @param {number} idx - 当前idx
 * @returns {number} 累计宽度
 *
 * @example
 *
 * getAccCellWidth([20, 10, 20, 10], 1)
 *
 * // 30
 */
export function getAccCellWidth(cellWidthList: Array<number>, idx: number): number {
  let res = 0;
  for (let i = 0; i <= Math.min(idx, cellWidthList.length - 1); i++) {
    res += cellWidthList[i];
  }
  return res;
}
