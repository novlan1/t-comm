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
 * @returns {number} 时间戳
 */
export function getDayEndTimeStamp(n = 0, unit = 's') {
  const time = getTimeStamp(n);
  const date = new Date(time);
  date.setHours(23, 59, 0, 0);
  if (unit === 'ms' || unit === 'MS') {
    return date.getTime();
  }
  const endTime =  parseInt(`${date.getTime() / 1000}`, 10);
  return endTime;
}

export function getTodayStartTimestamp(unit = 's') {
  return getDayStartTimestamp(0, unit);
}

export function getTodayEndTimeStamp(unit = 's') {
  return getDayEndTimeStamp(0, unit);
}

export function getYesterdayStartTimeStamp(unit = 's') {
  return getDayStartTimestamp(1, unit);
}

export function getYesterdayEndTimeStamp(unit = 's') {
  return getDayEndTimeStamp(1, unit);
}

export function getDBYStartTimeStamp(unit = 's') {
  return getDayStartTimestamp(2, unit);
}

export function getDBYEndTimeStamp(unit = 's') {
  return getDayEndTimeStamp(2, unit);
}
