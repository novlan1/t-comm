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
export function getMatchListFromReg(content: string, reg: RegExp) {
  let match = reg.exec(content);
  const result: Array<string> = [];

  while (match?.[1]) {
    result.push(match[1]);
    match = reg.exec(content);
  }

  return result;
}

const PRE_RELEASE_VERSION = /\d+\.\d+\.\d+-(\w+).\d+/;


/**
 * 获取预发布版本标签，比如 alpha, beta
 * @param {string} version 版本号
 * @returns 标签
 * @example
 * ```ts
 * getPreReleaseTag('1.2.2-beta.0')
 * // beta
 * ```
 */
export function getPreReleaseTag(version: string) {
  const match = version.match(PRE_RELEASE_VERSION);
  if (!match?.[1]) {
    return '';
  }
  return match[1];
}
