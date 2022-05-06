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

function toMonday(dtm) {
  const dte = new Date(dtm)
  let day = dte.getDay()
  const dty = dte.getDate()
  if (day === 0) {
    day = 7
  }
  dte.setDate(dty - day + 1)
  return `${dte.getFullYear()}-${dte.getMonth()}-${dte.getDate()}`
}

/**
 * 判断两个日期是否属于同一周
 *
 * 把两个日期均转换到周一，比较转换后的两日期是否相同。
 *
 * @param date1 第1个时间戳
 * @param date2 第2个时间戳
 * @returns 是否是同一周
 * @example
 * ```ts
 * isSameWeek(1601308800000, 1601395200000) // true
   isSameWeek(1601308800000, 1601913600000) // false
 * ```
 */
export function isSameWeek(date1, date2) {
  const dt1 = new Date()
  dt1.setTime(date1)
  const dt2 = new Date()
  dt2.setTime(date2)

  const md1 = toMonday(dt1)
  const md2 = toMonday(dt2)
  return md1 === md2
}
