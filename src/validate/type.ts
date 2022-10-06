/**
 * 判断数据是不是正则对象
 * @param {any} value - 输入数据
 * @returns {boolean} - 是否是正则对象
 *
 * @example
 *
 * isRegExp(1)
 *
 * // => false
 *
 * isRegExp(/\d/)
 *
 * // => true
 */
export function isRegExp(value) {
  return Object.prototype.toString.call(value) === '[object RegExp]';
}

/**
 * 判断数据是不是时间对象
 * @param {any} value - 输入数据
 * @returns {boolean} 是否是时间对象
 *
 * @example
 *
 * isDate(1)
 *
 * // => false
 *
 * isDate(new Date())
 *
 * // => true
 */
export function isDate(value) {
  return Object.prototype.toString.call(value) === '[object Date]';
}

/**
 * 判断数据是不是函数
 * @param {any} value - 输入数据
 * @returns {boolean} 是否是函数
 *
 * @example
 *
 * isFunction(1)
 *
 * // => false
 *
 * isFunction(()=>{})
 *
 * // => true
 */
export function isFunction(value) {
  return Object.prototype.toString.call(value) === '[object Function]';
}
