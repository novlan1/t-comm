/**
 * @module cookie cookie操作
 * @description cookie操作
 */

/**
   * 获取cookie
   * @exports getCookie
   * @param {string} key
   * @param {string} [defaultval]
   * @return {string} cookie值
   *
   * @example
    import { getCookie, setCookie, clearCookie } from 'comm/utils/cookie';
 
    setCookie('name', 'mike', 1);
    const res = getCookie('name')
    // mike
   */
export function getCookie(key, defaultval) {
  let cookie = ''

  if (typeof window !== 'undefined' && window.document) {
    cookie = window.document.cookie
  }
  let result = ''
  if (typeof defaultval !== 'undefined') result = defaultval
  const re = new RegExp(`${key}=(.*?)(;|$)`) // 浏览器端，两个母子域名同名cookie会只取第一个值，这个后续再优化。TODO
  const ma = cookie.match(re)
  result = ma?.[1] || ''
  return result
}

/**
 * 设置cookie
 * @exports setCookie
 * @param {string} key
 * @param {string} value
 * @param {number} [hours]
 */
export function setCookie(name, value, Hours = 1) {
  const date = new Date() // 获取当前时间
  const expiresDays = Hours // 将date设置为n天以后的时间
  date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000) // 格式化为cookie识别的时间
  document.cookie = `${name}=${value};expires=${date.toUTCString()}` // 设置cookie
}

/**
   * 清除cookie
   * @exports clearCookie
   * @param {string} key
   *
   * @example
    import { getCookie, setCookie, clearCookie } from 'comm/utils/cookie';
 
    setCookie('name', 'mike', 1);
    clearCookie('name');
    const res2 = getCookie('name')
    // mike
   */
export function clearCookie(name) {
  setCookie(name, '', -1)
}

/**
 * 清除全部cookie
 * @exports clearAll
 */
export function clearAll() {
  let domain = 'igame.qq.com'
  if (location.host.indexOf('oa.com') !== -1) {
    domain = 'pmd.oa.com'
  }
  const cookies = document.cookie.split(';')
  console.log(cookies)
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i]
    const eqPos = cookie.indexOf('=')
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
    console.log()
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT; Domain=.${domain}; path=/`
  }
}
