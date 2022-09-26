/**
 * 获取累积宽度
 *
 * @param cellWidthList - 宽度列表
 * @param idx - 当前idx
 * @returns 累计宽度
 */
export function getAccCellWidth(cellWidthList, idx) {
  let res = 0;
  for (let i = 0; i <= idx; i++) {
    res += cellWidthList[i];
  }
  return res;
}
