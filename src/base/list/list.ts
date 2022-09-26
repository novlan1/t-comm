/** @module base/list */

/**
 * 拉平数组
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
export function flatten(list: Array<object>, key: string) {
  return list.reduce((acc, item) => {
    acc[item[key]] = item
    return acc
  }, {})
}

/**
 * 打乱顺序
 *
 * @param array - 数组
 * @returns 乱序后的数组
 *
 * @example
 * ```ts
 * shuffle([1, 2, 3, 4, 5]) // [3, 2, 1, 4, 5]
 * ```
 */
export function shuffle(array) {
  const arr = [...array]
  let m = arr.length
  while (m > 1) {
    const index = Math.floor(Math.random() * m)
    m -= 1
    ;[arr[m], arr[index]] = [arr[index], arr[m]]
  }
  return arr
}
