/**
 * 获取相对于过去数据的比例
 * @param {number} value 当前数据
 * @param {number} preValue 之前数据
 * @returns {string} 比例
 *
 * @example
 *
 * getUnitPreviousRatio(1, 0)
 * // +999+%
 */
export function getUnitPreviousRatio(value: number, preValue: number) {
  const interval = value - preValue;
  const symbol = interval > 0 ? '+' : '';

  if (preValue === 0) {
    preValue = 0.01;
  }

  let intervalRatio = ((interval / preValue) * 100).toFixed(1);
  if (+intervalRatio > 999) {
    intervalRatio = '999+';
  }
  return `${symbol}${intervalRatio}%`;
}


/**
 * 获取占比
 * @param {number} summary 总数据
 * @param {number} part 部分数据
 * @returns {number} 比例
 * @example
 * getRatio(0, 1)
 * // 0
 *
 * getRatio(1, 0)
 * // 0
 *
 * getRatio(1, 1)
 * // 100
 *
 * getRatio(1, .5)
 * // 50
 */
export function getPartRatio(summary: number, part: number) {
  if (!summary) return 0;
  if (!part) return 0;
  return +(part / summary * 100).toFixed(2);
}

/**
 *
 * 阿拉伯数字和中文数字映射表，0 - 32
 * @type {object}
 * @example
 *
 * console.log(NUMBER_CHI_MAP[1]);
 * // '一'
 *
 * console.log(NUMBER_CHI_MAP[2]);
 * // '二'
 */
export const NUMBER_CHI_MAP = {
  0: '零',
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
  7: '七',
  8: '八',
  9: '九',
  10: '十',
  11: '十一',
  12: '十二',
  13: '十三',
  14: '十四',
  15: '十五',
  16: '十六',
  17: '十七',
  18: '十八',
  19: '十九',
  20: '二十',
  21: '二十一',
  22: '二十二',
  23: '二十三',
  24: '二十四',
  25: '二十五',
  26: '二十六',
  27: '二十七',
  28: '二十八',
  29: '二十九',
  30: '三十',
  31: '三十一',
  32: '三十二',
};


/**
 * 获取千分位分隔符
 * @param {string | number} value 输入数字
 * @returns {string} 处理后的数字
 *
 * @example
 *
 * getThousandSeparator('123123123')
 *
 * // => 123,123,123
 *
 * getThousandSeparator('12312312')
 *
 * // => 12,312,312
 */
export function getThousandSeparator(value: number | string) {
  const reg = /(?!^)(?=(\d{3})+$)/g;
  return `${value}`.replace(reg, ',');
}

/**
 * 获取千分位分隔符，处理数字之间有空格的情况
 * @param {string | number} value 输入数字
 * @returns {string} 处理后的数字
 *
 * @example
 * getThousandSeparator2('12345678 123456789')
 *
 * // => 12,345,678 123,456,789
 *
 */
export function getThousandSeparator2(value: number | string) {
  const reg = /\B(?=(\d{3})+\b)/g;
  return `${value}`.replace(reg, ',');
}


/**
 * 在区间内获取随机整数
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @returns 随机数
 *
 * @example
 * ```ts
 * random(0, 19) // 1
 * ```
 */
export function random(min: number, max: number) {
  if (min >= 0 && max > 0 && max >= min) {
    const gap = max - min + 1;
    return Math.floor(Math.random() * gap + min);
  }
  return 0;
}


export function getRandomNumber(min: number, max: number) {
  const result = Math.random() * (max - min) + min;
  return result;
}


/**
 * 数字左侧加 0，直到满足长度要求
 * @param {string | number} num 当前数字
 * @param {number} [targetLength=2] 目标长度
 * @returns {string} 新的字符串
 * @example
 * ```ts
 * padZero(1, 3); // 001
 * ```
 */
export function padZero(num: number | string, targetLength = 2) {
  let str = `${num}`;
  while (str.length < targetLength) {
    str = `0${str}`;
  }
  return str;
}


/**
 * add num and avoid float number
 * @param {number} num1 第1个数字
 * @param {number} num2 第2个数字
 * @returns {number} 结果
 * @example
 * ```ts
 * addNumber(0.1, 0.2); // 0.3
 * ```
 */
export function addNumber(num1: number, num2: number) {
  const cardinal = Math.pow(10, 10);
  return Math.round((num1 + num2) * cardinal) / cardinal;
}


/**
 * 根据边界值修正数字
 * @param {number} num 待处理的数字
 * @param {number} min 边界最小值
 * @param {number} max 边界最大值
 * @returns {number} 处理结果
 * @example
 * ```ts
 * range(12, 1, 2); // 2
 * ```
 */
export function range(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}
