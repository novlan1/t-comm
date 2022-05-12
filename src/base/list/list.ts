import { getUnitPreviousRatio } from '../number'

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

/**
 * 判断数组是否全部相等
 * @param list - 数组
 * @returns 是否全部相等
 *
 * @example
 * ```ts
 * isListAllEqual([0, 0, 0]) // true
 * isListAllEqual([0, 0, 2]) // false
 * ```
 */
export function isListAllEqual(list = []) {
  if (!list.length) return true
  const value = list[0]
  // eslint-disable-next-line no-restricted-syntax
  for (const item of list.slice(1)) {
    if (item !== value) return false
  }

  return true
}

/**
 * 获取对象的value列表，并输出大对象形式
 * @param {*} data
 * @returns
 *
 * @example
 *
 * ```ts
 * const data = [
 * {
 *   Project: 'xx',
 *   Request: 111,
 *   Score: 111
 * },
 * {
 *   Project: 'yy',
 *   Request: 333,
 *   Score: 555
 * }]
 *
 * getKeyValuesMap(data)
 *
 * // 结果为
 * {
 *   Project: ['xx', 'yy'],
     Request: [111, 333],
     Score: [111, 555],
   }
    ```
 */
export function getKeyValuesMap(data: Array<any> = []) {
  if (!data.length) return {}
  const keys = Object.keys(data[0])
  const keyValueMap = {}

  data.forEach(item => {
    keys.forEach(key => {
      if (keyValueMap[key]) {
        keyValueMap[key].push(item[key])
      } else {
        keyValueMap[key] = [item[key]]
      }
    })
  })
  return keyValueMap
}

/**
 * 获取相对上次的比例
 * @param data
 *
 * [{
 *   Project: { value: 'mj-match', name: 'Project' },
 *   Request: {
        value: 854,
        name: 'Request',
        idx: 19,
        lastIdx: 19,
        isMax: false,
        isMin: false,
        isSecondMax: false,
        isSecondMin: true
      },
    }
   }]
 * @param preDataMap
 *
 * {
     'mj-match': {
      Project: 'mj-match',
      Request: 4,
      Score: 91.81,
      FirstLoadTime: 178,
      WholePageTime: 1035,
      ParseDomTime: 484,
      DNSLinkTime: 0,
      DOMTime: 414,
      TCP: 0,
      HTTP: 275,
      BackEnd: 60,
      CGIFailNum: 0,
      ErrorLogNum: 0,
      CGIRequestNum: 83
    },
  }
 */
export function getPreviousRatio(
  data = [],
  preDataMap = {},
  uniqKey = 'Project',
) {
  data.forEach(item => {
    Object.keys(item).forEach(key => {
      const obj = item[key] as any

      if (typeof obj.value === 'number') {
        const uniqVal = (item[uniqKey] as any).value
        const preValue = preDataMap?.[uniqVal]?.[key]

        if (preValue === undefined) {
          obj.ratio = ''
        } else {
          obj.ratio = getUnitPreviousRatio(obj.value, preValue)
          obj.previousValue = preValue
        }
      }
    })
  })
}
