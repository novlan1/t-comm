import { formatUrlParams } from './format-url-params';
import { resolveUrlParams } from './resolve-url-params';


/**
 * 除保留参数外，一律移除
 * @param {string} url 地址
 * @param {string} removeKeyArr 待保留的参数名集合
 * @returns 重新拼接的地址
 * @example
 * const url = keepUrlParams('http://www.test.com?a=1&b=2&c=3#/detail?d=4', ['a', 'd']); // 'http://www.test.com/#/detail?a=1&d=4'
 */
export function keepUrlParams(url = '', keepKeyArr: string[], forceHistoryMode?: boolean) {
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

