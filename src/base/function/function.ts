/**
 * 将字符串转为函数
 * @param {string} func 字符串
 * @returns {Function} 字符串对应的函数
 *
 * @example
 *
 * parseFunction('()=>console.log(1)')
 *
 * // ()=>console.log(1)
 */
export function parseFunction(func) {
  if (typeof func !== 'string') return func;
  let data = '';
  try {
    // eslint-disable-next-line no-new-func
    data = new Function('', `return ${func}`)();
  } catch (e) {
    console.error('解析失败', e);
  }
  return data;
}
