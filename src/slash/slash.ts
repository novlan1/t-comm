
/**
 * 移除第一个反斜杠
 *
 * @export
 * @param {string} [str=''] 输入字符串
 * @returns {string} 字符串
 * @example
 * ```ts
 * removeFirstSlash('/abc/ddd/')
 *
 * 'abc/ddd/'
 * ```
 */
export function removeFirstSlash(str = '') {
  if (str.startsWith('/')) {
    return str.slice(1);
  }
  return str;
}


/**
 * 移除最后一个反斜杠
 *
 * @export
 * @param {string} [str=''] 输入字符串
 * @returns {string} 字符串
 *
 * @example
 * ```ts
 * removeLastSlash('/abc/')
 *
 * '/abc'
 * ```
 */
export function removeLastSlash(str = '') {
  return str.replace(/\/$/, '');
}


/**
 *移除第一个和最后一个反斜杠
 *
 * @export
 * @param {string} [str=''] 输入字符串
 * @returns {string} 字符串
 *
 * @example
 * ```ts
 * removeFirstAndLastSlash('/abc/')
 *
 * 'abc'
 * ```
 */
export function removeFirstAndLastSlash(str = '') {
  return str.replace(/^\/|\/$/g, '');
}
