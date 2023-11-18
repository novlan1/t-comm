import { checkNodeEnv } from '../env/env';


/**
 * 写入持久化存储localStorage。仅用于浏览器端，value里不能有循环引用
 * @param {string} key 键
 * @param {string} value 值
 * @param {number} expireMsec 过期时间，单位毫秒
 * @return {boolean} 是否存储成功
 *
 * @example
 * const res = savePersist('name', 'mike', 30 * 86400 * 1000); // true
 * const name = getPersist('name'); // mike
 *
 * clearPersist('name'); // true
 * const name2 = getPersist('name'); // undefined
 */
export function savePersist(key, value, expireMsec = 0) {
  if (checkNodeEnv()) {
    return false;
  }

  if (!window.localStorage || typeof window.localStorage === 'undefined') {
    return false;
  }
  let data = '';
  try {
    data = JSON.stringify(value);
  } catch (err) {
    console.error(err);
  }
  if (!data) {
    return false;
  }
  if (!expireMsec) expireMsec = 30 * 86400 * 1000;
  localStorage[`vue_da|${key}`] = data; // 数据
  localStorage[`vue_ep|${key}`] = Date.now() + expireMsec; // 对应失效时间
  return true;
}

/**
 * 读取持久化存储
 * @param {string} key
 * @return {string} key对应的值
 */
export function getPersist(key) {
  if (checkNodeEnv()) {
    return undefined;
  }

  if (!window.localStorage || typeof window.localStorage === 'undefined') {
    return undefined;
  }

  if (localStorage[`vue_ep|${key}`] < Date.now()) {
    delete localStorage[`vue_ep|${key}`];
    delete localStorage[`vue_da|${key}`];
    return undefined;
  }

  let data = undefined;
  try {
    data = JSON.parse(localStorage[`vue_da|${key}`]);
  } catch (err) {
    data = undefined;
    delete localStorage[`vue_ep|${key}`];
    delete localStorage[`vue_da|${key}`];
  }
  // 顺便清理一下其它可能过期的
  clearPersist();
  return data;
}

/**
 * 持久化存储。清理。传 key 就删除。不传清理所有过期的。
 * @param {string} [key]
 * @return {boolean} 是否清楚成功
 */
export function clearPersist(key?: string) {
  if (checkNodeEnv()) {
    return false;
  }
  if (!window.localStorage || typeof window.localStorage === 'undefined') {
    return false;
  }

  if (key) {
    delete localStorage[`vue_ep|${key}`];
    delete localStorage[`vue_da|${key}`];
  } else {
    Object.keys(localStorage).forEach((i) => {
      // if (localStorage.hasOwnProperty(i)) {
      if (i.indexOf('vue_ep|') === 0 && localStorage[i] < Date.now()) {
        delete localStorage[i];
        delete localStorage[`vue_da${i.slice(6)}`];
      }
      // }
    });
  }

  return true;
}
