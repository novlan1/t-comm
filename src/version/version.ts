/**
 * 版本比较
 * @param {string} v1 第一个版本
 * @param {string} v2 第二个版本
 * @returns 比较结果，1 前者大，-1 后者大，0 二者相同
 * @example
 * ```ts
 * compareVersion('1.1.1', '1.2.1')
 * // -1
 * ```
 */
export function compareVersion(v1 = '', v2 = '') {
  const v1List = trimVersion(v1).split('.');
  const v2List = trimVersion(v2).split('.');

  const len = Math.max(v1List.length, v2List.length);

  while (v1List.length < len) {
    v1List.push('0');
  }
  while (v2List.length < len) {
    v2List.push('0');
  }
  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1List[i], 10);
    const num2 = parseInt(v2List[i], 10);
    if (num1 > num2) {
      return 1;
    }
    if (num1 < num2) {
      return -1;
    }
  }
  return 0;
}


function trimVersion(str = '') {
  return str.replace(/^[\^|~]/, '');
}
