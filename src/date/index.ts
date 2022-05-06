/**
 * 获取一个月有多少天
 *
 * new Date()第3个参数默认为1，就是每个月的1号，把它设置为0时， new Date()会返回上一个月的最后一天，然后通过getDate()方法得到天数
 * @param year 年份
 * @param month 月份
 * @returns 天数
 *
 * @example
 * ```ts
 * getMonthDay(2022, 2) // 28
 * getMonthDay(2022, 3) // 31
 * getMonthDay(2022, 4) // 30
 * ```
 */
export function getMonthDay(year, month) {
  const days = new Date(year, month, 0).getDate()
  return days
}

/**
 * 获取一个月有多少天
 *
 * 把每月的天数写在数组中，再判断时闰年还是平年确定2月分的天数
 * @param year 年份
 * @param month 月份
 * @returns 天数
 *
 * @example
 * ```ts
 * getMonthDay2(2022, 2) // 28
 * getMonthDay2(2022, 3) // 31
 * getMonthDay2(2022, 4) // 30
 * ```
 */
export function getMonthDay2(year, month) {
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
    days[1] = 29
  }
  return days[month - 1]
}
