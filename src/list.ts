/**
 * 拉平数组
 *
 * @param list - 对象数组
 * @param key - 对象的key
 * @returns map
 *
 * @example
 * ```ts
 * const list = [{id: 1, name: 'a'}, {id: 2, name: 'b'}]
 * flatten(list, 'id') // {1: {id: 1, name: 'a'}, 2: {id: 2, name: 'b'}}
 * ```
 */
export const flatten = (list: Array<object>, key: string) =>
  list.reduce((acc, item) => {
    acc[item[key]] = item
    return acc
  }, {})
