import { getUnitPreviousRatio } from '../number'

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
 * @returns 处理后的对象
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
      // 如果有value，就取value，否则直接取item[key]
      const value = item[key]?.value || item[key]

      if (keyValueMap[key]) {
        keyValueMap[key].push(value)
      } else {
        keyValueMap[key] = [value]
      }
    })
  })
  return keyValueMap
}

/**
 * 标记最大最小值
 * @param {object} obj
 * @returns 处理后的对象
 */
function markMaxAndMinOfObj({ values, value, obj }) {
  const idx = values.indexOf(value)
  const lastIdx = values.indexOf(value)

  let newObj = {
    ...obj,
    idx,
    lastIdx,
  }

  if (!isListAllEqual(values)) {
    const len = values.length
    const isMax = idx === 0
    const isSecondMax = idx === 1
    const isMin = idx === len - 1
    const isSecondMin = idx === len - 2

    newObj = {
      ...newObj,
      isMax,
      isMin,
      isSecondMax,
      isSecondMin,
    }
  }
  return newObj
}

/**
 * 获取相对上次的比例
 * @param data - 输入数据
 * @param preDataMap - 上次数据的map
 * @example
 * ```ts
  const data = [{
    Project: { value: 'mj-match', name: 'Project' },
    Request: {
      value: 854,
      name: 'Request',
      idx: 19,
      lastIdx: 19,
      isMax: false,
      isMin: false,
      isSecondMax: false,
      isSecondMin: true
    },
  }];

  const preDataMap = {
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
  };

  getPreviousRatio(data, preDataMap)

 * ```
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

/**
 * 添加isMax、isMin、、isSecondMax、isSecondMin、idx、lastIdx等属性
 * @param {*} data 原始数据
 * @param {*} reverseScoreKeys - 逆序的key
 * @returns 处理后的数据
 *
 * @example
 * ```ts
 * // 将
 * [{
      ProjectName: { name: 'ProjectName', value: '麻将赛事' },
      PagePv: { name: 'PagePv', value: 2877 },
      PageUv: { name: 'PageUv', value: 544 },
      Score: { name: 'Score', value: 99.83 },
      PageDuration: { name: 'PageDuration', value: 527.21 },
      PageError: { name: 'PageError', value: 0 },
      ApiNum: { name: 'ApiNum', value: 11146 },
      ApiFail: { name: 'ApiFail', value: 25 },
      ApiDuration: { name: 'ApiDuration', value: 200.17 },
      StaticNum: { name: 'StaticNum', value: 70249 },
      StaticFail: { name: 'StaticFail', value: 0 },
      StaticDuration: { name: 'StaticDuration', value: 42.13 }
  }]
  // 转化为：
 * [{
      ProjectName: { name: 'ProjectName', value: '麻将赛事' },
      PagePv: {
        name: 'PagePv',
        value: 2877,
        idx: 6,
        lastIdx: 6,
        isMax: false,
        isMin: false,
        isSecondMax: false,
        isSecondMin: false
      },
    }]
    ```
    // 可见数据结构没有变化，只是添加了isMax、isMin、、isSecondMax、isSecondMin、idx、lastIdx等属性
 */
export function getMaxAndMinIdx(
  data: Array<object> = [],
  reverseScoreKeys: Array<string> = [],
) {
  if (!data.length) return []
  const keys = Object.keys(data[0])

  const keyValueMap = getKeyValuesMap(data)

  const parsedData = data.map(item => {
    const temp = { ...(item as any) }

    keys.forEach(key => {
      const values = keyValueMap[key]
      const itemInfo = item[key] || {}

      if (values && typeof itemInfo.value === 'number') {
        if (reverseScoreKeys.includes(key)) {
          values.sort((a, b) => a - b)
        } else {
          values.sort((a, b) => b - a)
        }

        temp[key] = markMaxAndMinOfObj({
          values,
          value: itemInfo.value,
          obj: temp[key],
        })
      }
    })
    return temp
  })

  return parsedData
}

/**
 * 拉平之前数据
 * @param {Array} preDataList 之前的数据，作为对照
 * @param {String} key 主键
 * @returns preDataMap
 *
 * @example
 * flattenPreData(preDataList, 'ProjectName')
 * ```ts
 * // 将
 * [{
      ProjectName: { name: 'ProjectName', value: '研发平台' },
      PagePv: { name: 'PagePv', value: 152 },
      PageUv: { name: 'PageUv', value: 7 },
      Score: { name: 'Score', value: 93.92 },
      PageDuration: { name: 'PageDuration', value: 1281.58 },
      PageError: { name: 'PageError', value: 2 },
      ApiNum: { name: 'ApiNum', value: 316 },
      ApiFail: { name: 'ApiFail', value: 10 },
      ApiDuration: { name: 'ApiDuration', value: 324.83 },
      StaticNum: { name: 'StaticNum', value: 878 },
      StaticFail: { name: 'StaticFail', value: 0 },
      StaticDuration: { name: 'StaticDuration', value: 38.5 }
   }]
   // 转化为：
 * {
 *   '研发平台': {
        ProjectName: '研发平台',
        PagePv: 152,
        PageUv: 7,
        Score: 93.92,
        PageDuration: 1281.58,
        PageError: 2,
      }
    }
    ```
 */
export function flattenPreData(preDataList: Array<any>, key: string) {
  const preDataMap = preDataList.reduce((acc, item) => {
    acc[item[key].value] = Object.values(item).reduce((ac: any, it: any) => {
      ac[it.name] = it.value
      return ac
    }, {})
    return acc
  }, {})
  return preDataMap
}
