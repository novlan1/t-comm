type IHumpObject = Record<string, any> | Array<any>;

function isObjOrArray(obj: unknown) {
  return obj instanceof Object;
}

function isArray(obj: unknown) {
  return Array.isArray(obj);
}

function toHump(str: string) {
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
export function toHumpObj(obj: IHumpObject, cache = new WeakMap()): object {
  // 函数首次调用判断
  if (!isObjOrArray(obj)) return obj;

  if (cache.get(obj)) {
    return cache.get(obj);
  }

  const result: IHumpObject = isArray(obj) ? [] : {};
  cache.set(obj, result);

  const keys = Object.keys(obj);

  keys.forEach((key: string | number) => {
    let value;
    if (Array.isArray(obj)) {
      key = +key;
      value = obj[key];
    } else {
      value = obj[key];
    }

    let nKey: string | number = toHump(`${key}`);

    const temp = isObjOrArray(value) ? toHumpObj(value, cache) : value;
    if (Array.isArray(result)) {
      nKey = +nKey;
      result[nKey] = temp;
    } else {
      result[nKey] = temp;
    }
  });

  return result;
}


/**
 * 将属性混合到目标对象中
 * @param {object} to 目标对象
 * @param {object} from 原始对象
 * @returns 处理后的对象
 *
 * @example
 * const a = { name: 'lee' }
 * const b = { age: 3 }
 * extend(a, b)
 *
 * console.log(a)
 *
 * // => { name: 'lee', age: 3 }
 */
export function extend(to: Record<string, any>, from: Record<string, any>): object {
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const key in from) {
    to[key] = from[key];
  }
  return to;
}
