/**
 * 横线转驼峰命名，如果第一个字符是字母，则不处理。
 * @param {string} str  输入字符串
 * @param {boolean} handleSnake  是否处理下划线，默认不处理
 * @returns {string} 处理后的字符串
 * @example
 *
 * camelize('ab-cd-ef')
 *
 * // => abCdEf
 *
 */
export function camelize(str = '', handleSnake = false) {
  const camelizeRE = /-(\w)/g;
  const snakeRE =  /_(\w)/g;


  const cb = (str = '', re: RegExp) =>  str.replace(re, (_, c) => (c ? c.toUpperCase() : ''));

  if (!handleSnake) {
    return cb(str, camelizeRE);
  }
  return cb(cb(str, camelizeRE), snakeRE);
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
export function hyphenate(str: string) {
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
 * // My Name Is Yang
 *
 * titleize('foo-bar')
 *
 * // Foo-Bar
 */
export function titleize(str: string) {
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
export function lowerInitial(str: string) {
  return str.replace(/^(\w)/, (a, b) =>  b?.toLowerCase());
}


/**
 * 用大驼峰，即 PascalCase 格式，来格式化字符串
 * @param str 字符串
 * @returns PascalCase 的字符串
 *
 * @example
 * ```ts
 * pascalCase('ab-cd')
 * // AbCd
 *
 * pascalCase('ab_cd')
 * // AbCd
 * ```
 */
export function pascalCase(str = '') {
  return capitalize(camelize(str));
}

