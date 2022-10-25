
/**
 * 格式化 bite 单位，最多保留2位小数，最大单位为BB
 * @param number size bite 单位
 * @returns 格式化的字符
 * @example
 *
 * formatBite(1)
 * // 1B
 *
 * formatBite(100)
 * // 100B
 *
 * formatBite(1000)
 * // 1000B
 *
 * formatBite(10000)
 * // 9.77KB
 *
 * formatBite(100000)
 * // 97.66KB
 *
 * formatBite(1000000)
 * // 976.56KB
 *
 * formatBite(10000000)
 * // 9.54MB
 */
export function formatBite(size) {
  const UNIT = 1024;
  const UNIT_LIST = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB'];

  if (size > UNIT) {

  }
  let res = size;
  let loopTime = 0;
  while (res > UNIT && loopTime < UNIT_LIST.length - 1) {
    res = res / UNIT;
    loopTime += 1;
  }

  return parseFloat(res.toFixed(2)) + UNIT_LIST[loopTime];
}
