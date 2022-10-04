/**
 * 获取累积宽度
 * @private
 * @param {Array<number>} cellWidthList - 宽度列表
 * @param {number} idx - 当前idx
 * @returns {number} 累计宽度
 */
export function getAccCellWidth(cellWidthList: Array<number>, idx: number): number {
  let res = 0;
  for (let i = 0; i <= idx; i++) {
    res += cellWidthList[i];
  }
  return res;
}
