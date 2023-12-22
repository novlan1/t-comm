import { FilterParams } from './types';

/**
 * @export resolveUrlParams
 * @description 提取链接参数，兼容hash模式和history模式，以及拼接异常情况
 * @param {string} [url=''] 地址
 * @param {string} [key=''] 可选，若不为空，则提取返回该key对应的参数值
 * @returns 地址参数对象，或者是指定参数值
 * @example
 * const url = 'https://igame.qq.com?name=mike&age=18#/index?from=china&home=china'
 * const params = resolveUrlParams(url); // { from: 'china', home: 'china', name: 'mike', age: 18 }
 * const paramsAge =  resolveUrlParams(url, 'age'); // 18
 */
export function resolveUrlParams(url = '', key = '') {
  if (!url) return key ? undefined : {};

  // 解码
  let link = url;

  // 提取从第一个问号开始后的字符串内容（含问号）
  link = link.substring(url.indexOf('?'));

  // 正则匹配方式提取键值对
  // eslint-disable-next-line no-useless-escape
  const matchList = link.match(/(\?|&)([^\?&]*=[^\?&#]*)/g);
  if (!matchList) {
    return key ? undefined : {};
  }

  // 提取多个键值对
  const params: Record<string, string> = {};
  const kvList = matchList.map(item => item.replace(/(\?|&)/g, '')); // 移除 ? 或 & 前缀
  kvList.forEach((kv) => {
    const [key, value] = kv.split('=');
    if (value) { // 有值时，才记录
      params[key] = value;
    }
  });

  return key ? params[key] : params;
}


/**
 * @export formatUrlParams
 * @description 根据传入的参数，移除原来的所有参数，根据传入的 keepParamsObj 进行重新拼接地址，以 hash 模式返回
 * @param {string} url 地址
 * @param {object} keepParamsObj 参数对象
 * @param {boolean} [forceHistoryMode] 是否强制 history 模式
 * @returns 只有传入参数的地址
 * @example
 * const url1 = formatUrlParams('http://www.test.com?a=1&b=2&c=3', { e: 5 }); // http://www.test.com/#/?e=5
 * const url2 = formatUrlParams('http://www.test.com?a=1&b=2&c=3#/detail?d=4', { f: 5 }); // http://www.test.com/#/detail?f=5
 */
export function formatUrlParams(url = '', keepParamsObj: Record<string, any> = {}, forceHistoryMode = false) {
  // 参数校验
  const keepKeyArr = Object.keys(keepParamsObj);
  if (!url || keepKeyArr.length === 0) {
    return url;
  }

  // 转换地址参数为字符串
  const paramsStr = keepKeyArr.reduce((str, key) => {
    const value = keepParamsObj[key];
    const item = `${key}=${value}`;

    if (str !== '') {
      return `${str}&${item}`;
    }

    return item;
  }, '');

  // 通过 HTMLAnchorElement 规范链接格式
  const anchorElement = document.createElement('a') || {};
  anchorElement.href = url;
  const { origin = '', pathname = '', hash = '' } = anchorElement;
  if (!origin) {
    return url;
  }

  // 获取 router 的目标 path
  const matchRes = hash.match(/^#([^?]*)/);
  const routeName = matchRes?.[1];

  // 重新拼接链接，判断采用 history 或 hash 模式返回
  let routerPath = '';
  // hash 模式拼上
  if (!forceHistoryMode) {
    const isHistory = url.includes('?') && !url.includes('#');
    // forceHistoryMode未传的history模式，默认加上hash
    if (!(forceHistoryMode !== false && isHistory)) {
      routerPath = `#${routeName || '/'}`;
    }
  }

  const formatUrl = `${origin}${pathname}${routerPath}?${paramsStr}`;
  return formatUrl;
}


/**
 * @export extendUrlParams
 * @description 拼接额外参数
 * @param {string} url 地址
 * @param {object} extParamsObj 待添加的参数对象
 * @param {boolean} [forceHistoryMode] 是否强制 history 模式
 * @returns 重新拼接的地址
 * @example
 * const url1 = extendUrlParams('http://www.test.com?a=1&b=2&c=3#/detail?d=4', { e: 5 }); // 'http://www.test.com/#/detail?a=1&b=2&c=3&d=4&e=5'
 */
export function extendUrlParams(url: string, extParamsObj: Record<string, any>, forceHistoryMode = false) {
  // 获取链接上的所有参数
  const urlParamsObj = resolveUrlParams(url) || {};

  // 合并传入的参数
  const keepParamsObj = {
    ...(urlParamsObj as Record<string, string>),
    ...extParamsObj,
  };

  // 根据合并后的参数集合，重新拼接地址
  return formatUrlParams(url, keepParamsObj, forceHistoryMode);
}


/**
 * @export removeUrlParams
 * @description 移除参数
 * @param {string} url 地址
 * @param {string} removeKeyArr 待移除的参数名集合
 * @returns 重新拼接的地址
 * @example
 * const url = removeUrlParams('http://www.test.com/#/detail?a=1&b=2&c=3', ['a', 'b']); // 'http://www.test.com/#/detail?c=3'
 * const url2 = removeUrlParams('http://www.test.com?d=4&f=6#/detail?a=1&b=2&c=3', ['a', 'd']); // 'http://www.test.com/#/detail?b=2&c=3&f=6'
 */
export function removeUrlParams(url: string, removeKeyArr: Array<string>, forceHistoryMode = false) {
  // 获取链接上的所有参数
  const urlParamsObj = resolveUrlParams(url) as Record<string, string>;

  // 移除指定的key集合
  const keepParamsObj: Record<string, string> = {};
  Object.keys(urlParamsObj).forEach((key) => {
    if (!removeKeyArr.includes(key)) {
      keepParamsObj[key] = urlParamsObj[key];
    }
  });

  // 根据移除后的参数集合，重新拼接地址
  return formatUrlParams(url, keepParamsObj, forceHistoryMode);
}


/**
 * @export keepUrlParams
 * @description 除保留参数外，一律移除
 * @param {string} url 地址
 * @param {string} keepKeyArr 待保留的参数名集合
 * @param {boolean} [forceHistoryMode] 是否强制 history 模式
 * @returns 重新拼接的地址
 * @example
 * const url = keepUrlParams('http://www.test.com?a=1&b=2&c=3#/detail?d=4', ['a', 'd']); // 'http://www.test.com/#/detail?a=1&d=4'
 */
export function keepUrlParams(url: string, keepKeyArr: Array<string>, forceHistoryMode = false) {
  // 获取链接上的所有参数
  const urlParamsObj = resolveUrlParams(url) as Record<string, string>;

  // 只保留指定的key集合
  const keepParamsObj: Record<string, string> = {};
  Object.keys(urlParamsObj).forEach((key: string) => {
    if (keepKeyArr.includes(key)) {
      keepParamsObj[key] = urlParamsObj[key];
    }
  });

  // 根据移除后的参数集合，重新拼接地址
  return formatUrlParams(url, keepParamsObj, forceHistoryMode);
}


/**
 * @export filterUrlParams
 * @description 根据地址长度，进行过滤地址参数，允许指定保留特定参数
 * @param {object} [params={ limit: 1024 }] 参数
 * @param {number} params.url 待过滤地址，默认当前页面地址
 * @param {number} params.limit 参数长度限制
 * @param {array}  params.keepKey 指定保留的参数，比如业务参数、框架参数（登录态、统计上报等）
 */
export function filterUrlParams(params: FilterParams = {
  url: window.location.href,
  limit: 1000,
  keepKey: [],
}) {
  const {
    url = window.location.href,
    limit = 1000,
    keepKey: keepKeyArr = [],
    forceHistoryMode,
  } = params;

  // 不超过长度限制，不处理
  const originUrl = url;
  if (originUrl.length <= limit) {
    return originUrl;
  }

  // 只保留特定参数进行拼接地址
  return keepUrlParams(originUrl, keepKeyArr, forceHistoryMode);
}
