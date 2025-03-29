import { keepUrlParams } from './keep-url-params';

import type { FilterParams } from './types';


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
