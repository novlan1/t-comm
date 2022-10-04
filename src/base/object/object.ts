function isObjOrArray(obj) {
  return obj instanceof Object;
}

function isArray(obj) {
  return Array.isArray(obj);
}

function toHump(str) {
  return str.replace(/_(\w)/g, (a, b) => b.toUpperCase());
}

/**
 * 将对象中的key由下划线专为驼峰
 *
 * @param {object} obj - 对象
 * @returns {object} 转化后的对象
 *
 * @example
 * const obj = {
 *   a_a: 'a',
 *   b_b: [
 *     {
 *       bb_b: 'b',
 *     },
 *   ],
 *   c: {
 *     dd_d: 'd',
 *     e: {
 *       ee_e: 'e',
 *     },
 *   },
 * };
 *
 * toHumpObj(obj);
 * // { aA: 'a', bB: [ { bbB: 'b' } ], c: { ddD: 'd', e: { eeE: 'e' } } }
 */
export function toHumpObj(obj: object, cache = new WeakMap()): object {
  // 函数首次调用判断
  if (!isObjOrArray(obj)) return obj;

  if (cache.get(obj)) {
    return cache.get(obj);
  }

  const result = isArray(obj) ? [] : {};
  cache.set(obj, result);

  const keys = Object.keys(obj);

  keys.forEach((key) => {
    const value = obj[key];

    const nKey = toHump(key);

    result[nKey] = isObjOrArray(value) ? toHumpObj(value, cache) : value;
  });

  return result;
}


