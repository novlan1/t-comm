/**
 * 横线转驼峰命名
 * @param {string} str  输入字符串
 * @returns {string} 处理后的字符串
 * @example
 *
 * camelize('ab-cd-ef')
 *
 * // => abCdEf
 *
 */
export function camelize(str) {
  const camelizeRE = /-(\w)/g;
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));
}

/**
 * 驼峰命名转横线命名：拆分字符串，使用 - 相连，并且转换为小写
 * @param {string} str 输入字符串
 * @returns {string} 处理后的字符串
 *
 * @example
 *
 * hyphenate('abCd')
 *
 * // => ab-cd
 *
 */
export function hyphenate(str) {
  const hyphenateRE = /\B([A-Z])/g;
  return str.replace(hyphenateRE, '-$1').toLowerCase();
}

/**
 * 字符串首位大写
 * @param {string} str 输入字符串
 * @returns {string} 处理后的字符串
 *
 * @example
 *
 * capitalize('abc')
 *
 * // => Abc
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * 将每个单词的首字母转换为大写
 * @param {string} str 输入字符串
 * @returns {string} 处理后的字符串
 *
 * @example
 *
 * titleize('my name is yang')
 *
 * // My name is Yang
 *
 * titleize('foo-bar')
 *
 * // Foo-Bar
 */
export function titleize(str) {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string');
  }

  return str.toLowerCase().replace(/(?:^|\s|-)\S/g, x => x.toUpperCase());
}


/**
 * 首字母小写
 * @param {string} str 输入字符串
 * @returns {string} 输出字符串
 * @example
 *
 * lowerInitial('GroupId')
 *
 * // groupId
 */
export function lowerInitial(str) {
  return str.replace(/^(\w)/, (a, b) =>  b?.toLowerCase());
}
