import { formatUrlParams } from './format-url-params';
import { resolveUrlParams } from './resolve-url-params';

/**
 * 拼接额外参数
 * @param {string} url 地址
 * @param {string} removeKeyArr 待添加的参数对象
 * @returns 重新拼接的地址
 * @example
 * const url1 = extendUrlParams('http://www.test.com?a=1&b=2&c=3#/detail?d=4', { e: 5 }); // 'http://www.test.com/#/detail?a=1&b=2&c=3&d=4&e=5'
 */
export function extendUrlParams(url = '', extParamsObj = {}, forceHistoryMode?: boolean) {
  // 获取链接上的所有参数
  const urlParamsObj = resolveUrlParams(url) as Record<string, string>;

  // 合并传入的参数
  const keepParamsObj = {
    ...urlParamsObj,
    ...extParamsObj,
  };

  // 根据合并后的参数集合，重新拼接地址
  return formatUrlParams(url, keepParamsObj, forceHistoryMode);
}
