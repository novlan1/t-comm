/**
 * 获取cookie
 * @param {string} key cookie键值
 * @param {string} [defaultVal] 默认值
 * @returns {string} cookie值
 *
 * @example
 *
 * const res = getCookie('name')
 *
 * // => mike
 *
 */
export function getCookie(key: string, defaultVal?: string): string {
  let cookie = '';

  if (typeof window !== 'undefined' && window.document) {
    cookie = window.document.cookie;
  }
  let result = '';
  if (typeof defaultVal !== 'undefined') {
    result = defaultVal;
  }

  const re = new RegExp(`${key}=(.*?)(;|$)`); // 浏览器端，两个母子域名同名cookie会只取第一个值
  const ma = cookie.match(re);
  result = ma?.[1] || '';
  return result;
}

/**
 * 设置cookie
 * @param {string} key cookie键值
 * @param {string} value cookie值
 * @param {number} [hours] 过期时间，单位小时
 *
 * @example
 *
 * setCookie('name', 'mike')
 */
export function setCookie(name: string, value: string, Hours = 1) {
  const date = new Date(); // 获取当前时间
  const expiresDays = Hours; // 将date设置为n天以后的时间
  date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000); // 格式化为cookie识别的时间
  document.cookie = `${name}=${value};expires=${date.toUTCString()}`; // 设置cookie
}

/**
 * 清除cookie
 * @param {string} key cookie键
 *
 * @example
 *
 * clearCookie('name');
 *
 */
export function clearCookie(name: string) {
  setCookie(name, '', -1);
}

/**
 * 清除全部cookie
 *
 * @param {string} domain 域名
 *
 * @example
 *
 * clearAll()
 */
export function clearAll(domain: String = '') {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.slice(0, eqPos) : cookie;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT; Domain=.${domain}; path=/`;
  }
}
