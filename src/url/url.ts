/**
 * url参数变对象
 * @param {string} url 输入URL
 * @returns {Object} search对象
 *
 * @example
 *
 * const res = getQueryObj('https://igame.qq.com?name=mike&age=18&feel=cold&from=China');
 *
 * console.log(res);
 * {
 *   name: 'mike',
 *   age: '18',
 *   feel: "cold",
 *   from: 'China',
 * }
 *
 */
export function getQueryObj(url: string) {
  const query: Record<string, string> = {};

  const qs = url.slice(url.indexOf('?') > -1 ? url.indexOf('?') + 1 : 0);
  let kvs;

  const qsList = qs.split('&');
  qsList.forEach((item) => {
    kvs = item.split('=');
    if (kvs.length === 2) {
      const value = kvs[1];
      query[kvs[0]] = value;
    }
  });

  return query;
}

/**
 * 组装`url`参数，将search参数添加在后面
 * @param {string} url 输入URL
 * @param {Object} queryObj search对象
 * @returns {string} 组装后的url
 *
 * @example
 * composeUrlQuery('https://baidu.com', {
 *   name: 'mike',
 *   feel: 'cold',
 *   age: '18',
 *   from: 'test',
 * });
 * // https://baidu.com?name=mike&feel=cold&age=18&from=test
 *
 * composeUrlQuery('https://baidu.com?gender=male', {
 *   name: 'mike',
 *   feel: 'cold',
 *   age: '18',
 *   from: 'test',
 * });
 * // https://baidu.com?gender=male&name=mike&feel=cold&age=18&from=test
 *
 */
export function composeUrlQuery(url: string, queryObj: object): string {
  const oriQuery = getQueryObj(url);
  let pathname = url.slice(
    0,
    url.indexOf('?') > -1 ? url.indexOf('?') : url.length,
  );
  pathname += '?';
  const allQuery = {
    ...oriQuery,
    ...queryObj,
  };
  Object.keys(allQuery).forEach((i) => {
    pathname += `${i}=${allQuery[i]}&`;
  });
  return pathname.slice(0, pathname.length - 1);
}


/**
 * 将对象字符串化
 * @param {object} obj 输入对象
 * @returns {string} 字符串
 * @example
 *
 * encodeUrlParam({a: 1})
 *
 * // '%7B%22a%22%3A1%7D'
 *
 */
export function encodeUrlParam(obj: object): string {
  if (typeof obj === 'object') {
    return encodeURIComponent(JSON.stringify(obj));
  }
  return encodeURIComponent(obj);
}


/**
 * 将字符串解码，与`encodeUrlParam`相对
 * @param {string} obj 输入字符串
 * @returns {object} 对象
 * @example
 *
 * decodeUrlParam('%7B%22a%22%3A1%7D')
 *
 * // { a: 1 }
 *
 */
export function decodeUrlParam(str: string): object {
  let res = {};
  try {
    res = JSON.parse(decodeURIComponent(str));
  } catch (err) {
    console.log('[decodeUrlParam] error: ', err);
  }
  return res;
}


/**
 * 获取 Url 参数
 * @param {string} paraName 参数 key
 * @param {string} search url search 部分
 * @returns paraValue
 *
 * @example
 * ```ts
 * getUrlPara('gender', '?gender=male&name=mike&feel=cold&age=18&from=test')
 * // male
 *
 * getUrlPara('age', '?gender=male&name=mike&feel=cold&age=18&from=test')
 * // 18
 * ```
 */
export function getUrlPara(paraName: string, search = '') {
  if (!search && typeof window !== 'undefined') {
    search  = window.location.search;
  }
  if (!search && typeof location !== 'undefined') {
    const { hash } = location;
    search = hash ? hash.substring(hash.indexOf('?')) : '';
  }
  if (!search) search = '';

  const query = search.substring(1);
  const vars = query.split('&');
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (pair[0] == paraName) {
      return pair[1];
    }
  }
  return '';
}
