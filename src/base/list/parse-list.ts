import { getUnitPreviousRatio } from '../number';


type ValueType = string | number;

interface IPreData {
  [key: string]: {
    name: string
    value: ValueType
  }
}


/**
 * 判断数组是否全部相等
 * @param {Array<number | string>} list - 数组
 * @returns {Boolean} 是否全部相等
 *
 * @example
 * isListAllEqual([0, 0, 0])
 *
 * // true
 *
 * isListAllEqual([0, 0, 2])
 *
 * // false
 */
export function isListAllEqual(list: Array<number | string> = []): boolean {
  if (!list.length) return true;
  const value = list[0];
  for (const item of list.slice(1)) {
    if (item !== value) return false;
  }

  return true;
}

/**
 * 获取对象的value列表，并输出大对象形式
 * @param {Array<any>} data
 * @returns {Object} 处理后的对象
 *
 * @example
 *
 * const data = [
 * {
 *   Project: 'x',
 *   Request: 1,
 *   Score: 'a'
 * },
 * {
 *   Project: 'y',
 *   Request: 2,
 *   Score: 'b'
 * }]
 *
 * getKeyValuesMap(data)
 *
 * // 结果为:
 * {
 *   Project: ['x', 'y'],
 *   Request: [1, 2],
 *   Score: ['a', 'b'],
 * }
 *
 * // 也支持参数为带value属性的对象数组，如：
 *
 * const data = [
 * {
 *   Project: {
 *     value: 'x'
 *   }
 * },{
 *   Project: {
 *     value: 'y'
 *   }
 * }]
 *
 * // 结果为：
 * {
 *   Project: ['x', 'y']
 * }
 */
export function getKeyValuesMap(data: Array<{
  [k: string]: ValueType | { value: ValueType }
}> = []): Record<string, Array<ValueType>> {
  if (!data.length) return {};
  const keys = Object.keys(data[0]);
  const keyValueMap: Record<string, Array<ValueType>> = {};

  data.forEach((item) => {
    keys.forEach((key) => {
      // 如果有value，就取value，否则直接取item[key]
      const value = (item[key] as { value: any })?.value || item[key];

      if (keyValueMap[key]) {
        keyValueMap[key].push(value);
      } else {
        keyValueMap[key] = [value];
      }
    });
  });
  return keyValueMap;
}

/**
 * 标记最大最小值
 * @private
 * @param {object} params 参数对象
 * @param {Array<number>} params.values 待处理的数组
 * @param {number} params.value 当前值
 * @param {Object} params.obj 迭代中的对象
 * @returns {Object} 处理后的对象
 */
function markMaxAndMinOfObj({ values, value, obj }: {
  values: Array<any>;
  value: ValueType;
  obj: Object;
}) {
  const idx = values.indexOf(value);
  const lastIdx = values.indexOf(value);

  let newObj: typeof obj & {
    idx: number;
    lastIdx: number;
    isMax?: boolean;
    isMin?: boolean;
    isSecondMax?: boolean;
    isSecondMin?: boolean;
  } = {
    ...obj,
    idx,
    lastIdx,
  };

  if (!isListAllEqual(values)) {
    const len = values.length;
    const isMax = idx === 0;
    const isSecondMax = idx === 1;
    const isMin = idx === len - 1;
    const isSecondMin = idx === len - 2;

    newObj = {
      ...newObj,
      isMax,
      isMin,
      isSecondMax,
      isSecondMin,
    };
  }
  return newObj;
}

/**
 * 获取相对上次的比例，会给输入的对象数组的每一项增加 ratio、previousValue 属性
 * @param {Array<Object>} data - 输入数据
 * @param {Object} preDataMap - 上次数据的map
 * @param {string} uniqKey - 唯一键
 *
 * @example
 * const data = [{
 *   Project: { value: 'mj-match', name: 'Project' },
 *   Request: {
 *     value: 854,
 *     name: 'Request',
 *     idx: 19,
 *     lastIdx: 19,
 *     isMax: false,
 *     isMin: false,
 *     isSecondMax: false,
 *     isSecondMin: true,
 *   },
 * }];
 *
 * const preDataMap = {
 *   'mj-match': {
 *     Project: 'mj-match',
 *     Request: 4,
 *     Score: 91.81,
 *     FirstLoadTime: 178,
 *     WholePageTime: 1035,
 *     ParseDomTime: 484,
 *     DNSLinkTime: 0,
 *     DOMTime: 414,
 *     TCP: 0,
 *     HTTP: 275,
 *     BackEnd: 60,
 *     CGIFailNum: 0,
 *     ErrorLogNum: 0,
 *     CGIRequestNum: 83,
 *   },
 * };
 *
 * getPreviousRatio(data, preDataMap);
 *
 * // data会变成：
 * [{
 *   Project: { value: 'mj-match', name: 'Project' },
 *   Request: {
 *     value: 854,
 *     name: 'Request',
 *     idx: 19,
 *     lastIdx: 19,
 *     isMax: false,
 *     isMin: false,
 *     isSecondMax: false,
 *     isSecondMin: true,
 *
 *     previousValue: 4, // 新增属性
 *     ratio: "+999+%" // 新增属性
 *   },
 * }];
 */
export function getPreviousRatio(
  data: Array<any> = [],
  preDataMap: Record<string, any> = {},
  uniqKey = 'Project',
) {
  data.forEach((item) => {
    Object.keys(item).forEach((key) => {
      const obj = item[key] as any;

      if (typeof obj.value === 'number') {
        const uniqVal = (item[uniqKey] as any).value;
        const preValue = preDataMap?.[uniqVal]?.[key];

        if (preValue === undefined) {
          obj.ratio = '';
        } else {
          obj.ratio = getUnitPreviousRatio(obj.value, preValue);
          obj.previousValue = preValue;
        }
      }
    });
  });
}

/**
 * 给对象数组的每一项，添加isMax、isMin、、isSecondMax、isSecondMin、idx、lastIdx等属性
 * @param {Array<object>} data 原始数据
 * @param {Array<string>} reverseScoreKeys - 逆序的key列表
 * @returns {Object} 处理后的数据
 *
 * @example
 * const data = [{
 *   ProjectName: { name: 'ProjectName', value: '麻将赛事' },
 *   PagePv: { name: 'PagePv', value: 2877 },
 * }, {
 *   ProjectName: { name: 'ProjectName', value: '斗地主赛事' },
 *   PagePv: { name: 'PagePv', value: 7 },
 * },
 * // ...
 * ];
 *
 * getMaxAndMinIdx(data, [])
 *
 * // =>
 *   [{
 *     ProjectName: { name: 'ProjectName', value: '麻将赛事' },
 *     PagePv: {
 *       name: 'PagePv',
 *       value: 2877,
 *       idx: 6,
 *       lastIdx: 6,
 *       isMax: false,
 *       isMin: false,
 *       isSecondMax: false,
 *       isSecondMin: false,
 *     },
 *   }];
 *
 */
export function getMaxAndMinIdx(
  data: Array<Record<string, any>> = [],
  reverseScoreKeys: Array<string> = [],
) {
  if (!data.length) return [];
  const keys = Object.keys(data[0]);

  const keyValueMap = getKeyValuesMap(data);

  const parsedData = data.map((item) => {
    const temp = { ...(item as any) };

    keys.forEach((key) => {
      const values = keyValueMap[key];
      const itemInfo = item[key] || {};

      if (values && typeof itemInfo.value === 'number') {
        if (reverseScoreKeys.indexOf(key) > -1) {
          values.sort((a: ValueType, b: ValueType) => {
            if (a > b) return 1;
            if (a < b) return -1;
            return 0;
          });
        } else {
          values.sort((a: ValueType, b: ValueType) => {
            if (a > b) return -1;
            if (a < b) return 1;
            return 0;
          });
        }

        temp[key] = markMaxAndMinOfObj({
          values,
          value: itemInfo.value,
          obj: temp[key],
        });
      }
    });
    return temp;
  });

  return parsedData;
}

/**
 * 拉平之前数据
 * @param {Array<Object>} preDataList 之前的数据，作为对照
 * @param {string} key 主键
 * @returns {Object} preDataMap
 *
 * @example
 * const data = [{
 *   ProjectName: { name: 'ProjectName', value: '研发平台' },
 *   PagePv: { name: 'PagePv', value: 152 },
 *   PageUv: { name: 'PageUv', value: 7 },
 *   Score: { name: 'Score', value: 93.92 },
 *   PageDuration: { name: 'PageDuration', value: 1281.58 },
 *   PageError: { name: 'PageError', value: 2 },
 * }];
 *
 * flattenPreData(data, 'ProjectName');
 *
 * // 输出
 * {
 *   研发平台: {
 *     ProjectName: '研发平台',
 *     PagePv: 152,
 *     PageUv: 7,
 *     Score: 93.92,
 *     PageDuration: 1281.58,
 *     PageError: 2,
 *   },
 * };
 */
export function flattenPreData(preDataList: Array<IPreData>, key: string): {
  [valueOfPrimaryKey: string]: {
    [key: string]: ValueType
  }
} {
  const preDataMap = preDataList.reduce((acc, item) => {
    acc[item[key]?.value || 'DEFAULT_KEY'] = Object.values(item).reduce((ac: any, it: any) => {
      ac[it.name] = it.value;
      return ac;
    }, {});
    return acc;
  }, {});
  return preDataMap;
}


/**
 * 对比两个对象列表
 * @param {Array<object>} list 现在数据
 * @param {Array<object>} preList 参照数据
 * @param {string} key 唯一key名称
 * @return {Array<object>} 对比结果，增加为list的每一项增加previousValue和ratio属性
 * @example
 * const list = [
 *   {
 *     ProjectName: { name: 'ProjectName', value: '脚手架' },
 *     PagePv: { name: 'PagePv', value: 544343 },
 *     PageUv: { name: 'PageUv', value: 225275 },
 *   }
 * ]
 *
 * const preList = [
 *   {
 *     ProjectName: { name: 'ProjectName', value: '脚手架' },
 *     PagePv: { name: 'PagePv', value: 123123 },
 *     PageUv: { name: 'PageUv', value: 33333 },
 *   }
 * ]
 *
 * compareTwoList(list, preList, 'ProjectName')
 *
 * console.log(list)
 *
 * [
 *   {
 *     ProjectName: { name: 'ProjectName', value: '脚手架' },
 *     PagePv: {
 *       name: 'PagePv',
 *       value: 544343,
 *       ratio: '+342.1%',
 *       previousValue: 123123
 *     },
 *     PageUv: {
 *       name: 'PageUv',
 *       value: 225275,
 *       ratio: '+575.8%',
 *       previousValue: 33333
 *     }
 *   }
 * ]
 */
export function compareTwoList(list: Array<IPreData>, preList: Array<IPreData>, key: string) {
  const preDataMap = flattenPreData(preList, key);
  getPreviousRatio(list, preDataMap, key);
  return list;
}
