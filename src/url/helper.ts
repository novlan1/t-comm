/**
 * 多重解码。避免内嵌在外部时地址参数被编码，先进行URL解码再进行HTML字符实体解码
 * @docgen
 * @function decode
 * @param {string} str 文本
 * @returns 解码后的文本
 */
export function decode(str = '') {
  if (!str) return str;

  let text = decodeURIComponent(str);

  // 含有实体符号 &amp;，需要实体解码处理
  const regex = /&amp;/g;
  if (regex.test(text)) {
    text = text.replace(regex, '&');
  }

  return text;
}

/**
 * 将参数对象转成字符串
 * @docgen
 * @function stringifyParams
 * @param {Object} { params } 参数对象
 * @returns {String}
 */
export function stringifyParams(params: Record<string, string | number>) {
  return Object.keys(params).reduce((acc, key) => {
    const value = params[key];
    return (`${acc ? `${acc}&` : ''}${key}=${value}`);
  }, '');
}

/**
 * 小程序不支持URL对象，用字符串拼接方式添加
 * 注意：已有相同key不支持覆盖，会重复添加
 * @docgen
 * @function addUrlParam
 * @param url 输入url
 * @param key 键
 * @param value 值
 */
export function addUrlParam(url: string, key: string, value: string) {
  let ret = url;
  if (url.indexOf('?') !== -1) {
    ret = `${ret}&${key}=${value}`;
  } else {
    ret = `${ret}?${key}=${value}`;
  }
  return ret;
}

/**
 *  为url添加参数
 *
 * @export
 * @param {string} url
 * @param {object} params
 * @param {boolean} [shouldOverride=false]
 * @return {string}
 */
export function addUrlParams(url: string, params: object, shouldOverride = false) {
  // 使用正则表达式找到当前 URL 中的哈希部分
  const hashPart = url.match(/#.*/);
  const hash = hashPart ? hashPart[0] : '';

  // 从原始 URL 中删除哈希部分
  const mainUrl = url.replace(/#.*/, '');

  const [baseUrl, originalQueryString] = mainUrl.split('?');
  const originalParams = originalQueryString
    ? originalQueryString.split('&').reduce((acc: Record<string, string>, entry) => {
      const [key, value] = entry.split('=');
      acc[decodeURIComponent(key)] = decodeURIComponent(value);
      return acc;
    }, {})
    : {};

  // 向原始参数对象添加新参数，同时判断是否覆盖现有参数值
  Object.entries(params).forEach(([key, value]) => {
    if (shouldOverride || !Object.prototype.hasOwnProperty.call(originalParams, key)) {
      originalParams[key] = value;
    }
  });

  // 将原始参数和新参数合并为查询字符串
  const updatedQueryString = Object.entries(originalParams)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
    .join('&');

  // 拼接新的 URL
  const updatedUrl = `${baseUrl}?${updatedQueryString}${hash}`;

  return updatedUrl;
}


