/**
 * 根据传入的参数，移除原来的所有参数，根据传入的 keepParamsObj 进行重新拼接地址，以 hash 模式返回
 * @param {string} url 地址
 * @param {object} keepParamsObj 参数对象
 * @returns 只有传入参数的地址
 * @example
 * const url1 = formatUrlParams('http://www.test.com?a=1&b=2&c=3', { e: 5 }); // http://www.test.com/#/?e=5
 * const url2 = formatUrlParams('http://www.test.com?a=1&b=2&c=3#/detail?d=4', { f: 5 }); // http://www.test.com/#/detail?f=5
 */
export function formatUrlParams(url = '', keepParamsObj: Record<string, string | number> = {}, forceHistoryMode?: boolean) {
  // 参数校验
  const keepKeyArr = Object.keys(keepParamsObj);
  if (!url) {
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
