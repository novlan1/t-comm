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
