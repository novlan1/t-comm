type Flat<T extends any[]> = T extends [infer F, ...infer R]
  ? F extends any[]
    ? [...Flat<F>, ...Flat<R>]
    : [F, ...Flat<R>]
  : [];

/**
 * 递归拉平数组
 * @param list 数组
 * @returns 数组
 *
 * @example
 *
 * flat([[[1, 2, 3], 4], 5])
 *
 * // [1, 2, 3, 4, 5]
 */
export function flat<T extends any[]>(list: T[]): Flat<T> {
  return list.reduce((acc, item) => acc.concat(Array.isArray(item) ? flat(item) : item), [] as any);
}


/**
 * 拉平数组，不会递归处理
 * @param {Array<Object>} list - 对象数组
 * @param {string} key - 对象的key
 * @returns {object} 拉平后的对象
 *
 * @example
 *
 * const list = [{id: 1, name: 'a'}, {id: 2, name: 'b'}]
 *
 * flatten(list, 'id')
 *
 * // {1: {id: 1, name: 'a'}, 2: {id: 2, name: 'b'}}
 *
 */
export function flatten<K extends keyof any, T extends keyof any>(
  list: Array<Record<K, T>>,
  key: string,
): Record<T, Record<K, T>> {
  return list.reduce((acc: Record<T, Record<K, T>>, item) => {
    acc[item[key as K]] = item;
    return acc;
  }, {} as any);
}
