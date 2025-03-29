import { formatUrlParams } from './format-url-params';
import { resolveUrlParams } from './resolve-url-params';


function simpleRemoveUrlParams(url = '', removeKeyArr: Array<string> = []) {
  if (!url.includes('?') || !removeKeyArr.length) {
    return url;
  }

  const list = url.split('?');

  const query = list[1].split('&').reduce((acc: Record<string, string>, item) => {
    const list = item.split('=');
    return {
      ...acc,
      [list[0]]: list[1],
    };
  }, {});


  const queryStr = Object.keys(query)
    .filter(item => !removeKeyArr.includes(item))
    .map(item => `${item}=${query[item]}`)
    .join('&');

  if (!queryStr) {
    return list[0];
  }

  return `${list[0]}?${queryStr}`;
}


function isSimpleUrl(url = '') {
  return url.indexOf('?') === url.lastIndexOf('?');
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
export function removeUrlParams(url = '', removeKeyArr: string[], forceHistoryMode?: boolean) {
  if (isSimpleUrl(url)) {
    return simpleRemoveUrlParams(url, removeKeyArr);
  }

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

