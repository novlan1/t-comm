/**
 * 匹配正则，获取匹配到的列表
 * @param {string} content 输入内容
 * @param {RegExp} reg 正则
 * @returns 匹配列表
 *
 * @example
 * ```ts
 * getMatchListFromReg(content, /emit\('([^',]+)'/g);
 *
 * // ['start', 'end']
 * ```
 */
export function getMatchListFromReg(content, reg) {
  let match = reg.exec(content);
  const result: Array<string> = [];

  while (match?.[1]) {
    result.push(match[1]);
    match = reg.exec(content);
  }

  return result;
}
