/**
 * 判断数据是不是正则对象
 * @param {any} value - 输入数据
 * @returns {boolean} 是否是正则对象
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
export function isRegExp(value: any) {
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
export function isDate(value: any) {
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
export function isFunction(value: any) {
  // typeof val === 'function' // 也可以
  return Object.prototype.toString.call(value) === '[object Function]';
}

export function isPlainObject(val: any) {
  return val !== null && typeof val === 'object' && !Array.isArray(val);
}

export function isPromise(val: any) {
  return isPlainObject(val) && isFunction(val.then) && isFunction(val.catch);
}

export function isDef(value: any) {
  return value !== undefined && value !== null;
}

export function isObj(x: any) {
  const type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

export function isObject(val: any) {
  return val !== null && typeof val === 'object';
}

const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
const VIDEO_REGEXP = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv)/i;

export function isImageUrl(url: any) {
  return IMAGE_REGEXP.test(url);
}

export function isVideoUrl(url: any) {
  return VIDEO_REGEXP.test(url);
}

export function isNumber(value: any) {
  return /^\d+(\.\d+)?$/.test(value);
}
