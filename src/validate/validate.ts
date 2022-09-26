/**
 * 一些校验方法
 * @module validate
 */

/**
 * 判断是否外部资源
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @ignore
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const validMap = ['admin', 'editor']
  return validMap.indexOf(str.trim()) >= 0
}

/**
 * 判断是否URL
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * 判断是否小写
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * 判断是否大写
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * 判断是否字母字符串
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * 判断是否合法邮箱地址
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  // eslint-disable-next-line no-useless-escape
  const reg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/**
 * 判断是否字符串
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * 判断是否数组
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

/**
 * 判断是否合法的QQ号码
 * @param {String} qq 待检测的qq号
 */
export function isQQNumber(qq) {
  const reQQ = /^[1-9]\d{4,9}$/
  if (!reQQ.test(qq)) {
    return false
  }
  return true
}

/**
 * 判断是否合法的邮箱号码
 * @param {String} email 待检测的邮箱号码
 */
export function isEmail(email) {
  // @符号前后直接相邻不能为 .
  // eslint-disable-next-line no-useless-escape
  const reEmail =
    /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
  if (!reEmail.test(email)) {
    return false
  }
  return true
}

/**
 * 判断是否合法的手机号
 * @param {String} phone 待检测的手机号
 */
export function isMobile(phone) {
  // 根据号码段的不同和前缀不同可适当修改
  const reValue = /^[1]([3-9])[0-9]{9}$/
  if (!reValue.test(phone)) {
    return false
  }
  return true
}

/**
 * 判断是否合法的电话号码
 * @param {String} tel 待检测的电话号码
 */
export function isTel(tel) {
  const reValue = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/
  if (!reValue.test(tel)) {
    return false
  }
  return true
}
/**
 * 判断是否合法的身份证号
 * @param {*} idCard
 */
export function isIdCard(idCard) {
  const regExp =
    /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  return regExp.test(idCard)
}
