/**
 * 拉平数组
 * @param {Array<Object>} list - 对象数组
 * @param {string} key - 对象的key
 * @returns {object} 拉平后的对象
 *
 * @example
 *
 * const list = [{id: 1, name: 'a'}, {id: 2, name: 'b'}]
 *
 * flatten(list, 'id')
 *
 * // {1: {id: 1, name: 'a'}, 2: {id: 2, name: 'b'}}
 *
 */
export function flatten(list: Array<object>, key: string) {
  return list.reduce((acc, item) => {
    acc[item[key]] = item;
    return acc;
  }, {});
}

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
export function shuffle(array) {
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
 */
export function getAccCellWidth(cellWidthList: Array<number>, idx: number): number {
  let res = 0;
  for (let i = 0; i <= Math.min(idx, cellWidthList.length - 1); i++) {
    res += cellWidthList[i];
  }
  return res;
}
