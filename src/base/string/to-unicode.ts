/**
 * 获取字符串指定下标的 unicode
 *
 * @param {string} str - 字符串
 * @param {number} index - unicode 的下标
 * @returns {string} data
 *
 * @example
 *
 * unicodeAt('ABC', 1)
 *
 * // -> '\\u0042'
 *
 */
export function toUnicodeAt(str: string, index = 0) {
  let code = str.charCodeAt(index).toString(16)
    .toUpperCase();
  while (code.length < 4) {
    code = `0${code}`;
  }
  return `\\u${code}`;
}

/**
 * 获取字符串的 unicode
 *
 * @param {string} str - 字符串
 * @returns {string} data
 *
 * @example
 *
 * toUnicode('ABC')
 *
 * // -> '\\u0041\\u0042\\u0043'
 *
 *
 */
export function toUnicode(str: string) {
  if (!str) {
    return '';
  }

  return Array.prototype.reduce.call(
    str,
    (pre, cur, index) => `${pre}${toUnicodeAt(str, index)}`,
    '',
  );
}
