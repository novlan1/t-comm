/**
 * 获取几天前的时间戳
 * @private
 * @param {boolean} n 几天前
 * @returns {number} 时间戳
 */
function getTimeStamp(n = 0) {
  return Date.now() - n * 24 * 60 * 60 * 1000;
}

/**
 * 获取几天前的起始时间戳
 * @param {boolean} n 几天前
 * @returns {number} 时间戳
 */
export function getDayStartTimestamp(n = 0, unit = 's'): number {
  const time = getTimeStamp(n);
  const date = new Date(time);
  date.setHours(0, 0, 0, 0);
  if (unit === 'ms' || unit === 'MS') {
    return date.getTime();
  }
  const startTime =  parseInt(`${date.getTime() / 1000}`, 10);
  return startTime;
}

/**
 * 获取几天前的终止时间戳
 * @param {boolean} n 几天前
 * @param {string} unit 返回时间戳的单位，默认是s(秒)
 * @param {string} endFlag 以什么单位作为结束时间，默认分钟，即23时59分0秒0毫秒
 * @returns {number} 时间戳
 */
export function getDayEndTimeStamp(n = 0, unit = 's', endFlag = 'm') {
  const time = getTimeStamp(n);
  const date = new Date(time);

  if (['h', 'hh', 'H'].indexOf(endFlag) > -1) {
    date.setHours(23, 0, 0, 0);
  } else if (['m', 'mm', 'M'].indexOf(endFlag) > -1) {
    date.setHours(23, 59, 0, 0);
  } else if (['s', 'ss', 'S'].indexOf(endFlag) > -1) {
    date.setHours(23, 59, 59, 0);
  } else if (['ms', 'MS'].indexOf(endFlag) > -1) {
    date.setHours(23, 59, 59, 999);
  }

  if (unit === 'ms' || unit === 'MS') {
    return date.getTime();
  }
  const endTime =  parseInt(`${date.getTime() / 1000}`, 10);
  return endTime;
}

export function getTodayStartTimestamp(unit = 's') {
  return getDayStartTimestamp(0, unit);
}

export function getTodayEndTimeStamp(unit = 's', endFlag = 'm') {
  return getDayEndTimeStamp(0, unit, endFlag);
}

export function getYesterdayStartTimeStamp(unit = 's') {
  return getDayStartTimestamp(1, unit);
}

export function getYesterdayEndTimeStamp(unit = 's', endFlag = 'm') {
  return getDayEndTimeStamp(1, unit, endFlag);
}

export function getDBYStartTimeStamp(unit = 's') {
  return getDayStartTimestamp(2, unit);
}

export function getDBYEndTimeStamp(unit = 's', endFlag = 'm') {
  return getDayEndTimeStamp(2, unit, endFlag);
}

/**
 * 查询距今有多少天
 * @param date 时间
 * @returns 距今多少天
 * @ignore
 */
function getDaysFromToday(date: string | number | Date) {
  const zero = new Date(date);
  zero.setHours(0, 0, 0, 0);

  const now = new Date();
  now.setHours(0, 0, 0);

  const days = (now.getTime() - zero.getTime()) / (1 * 24 * 60 * 60 * 1000);
  return parseInt(`${days}`, 10);
}

export function getSomeDayStartTimeStamp(date: string | number | Date, unit = 's') {
  const days = getDaysFromToday(date);
  return getDayStartTimestamp(days, unit);
}

export function getSomeDayEndTimeStamp(date: string | number | Date, unit = 's') {
  const days = getDaysFromToday(date);
  return getDayEndTimeStamp(days, unit);
}
