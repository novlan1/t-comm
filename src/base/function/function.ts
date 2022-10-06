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


/**
 * 记忆函数：缓存函数的运算结果
 * @param {Function} fn 输入函数
 * @returns {any} 函数计算结果
 *
 * @example
 * function test(a) {
 *   return a + 2
 * }
 *
 * const cachedTest = cached(test)
 *
 * cachedTest(1)
 *
 * // => 3
 *
 * cachedTest(1)
 *
 * // => 3
 */
export function cached(fn) {
  const cache = Object.create(null);
  return function cachedFn(str) {
    const hit = cache[str];
    if (hit) return hit;
    cache[str] = fn(str);
    return cache[str];
  };
}
