/**
 * 将时间戳格式化
 * @param {number} timestamp
 * @param {string} fmt
 * @param {string} [defaultVal]
 * @returns {string} 格式化后的日期字符串
 * @example
 *
 * const stamp = new Date('2020-11-27 8:23:24').getTime();
 *
 * const res = timeStampFormat(stamp, 'yyyy-MM-dd hh:mm:ss')
 *
 * // 2020-11-27 08:23:24
 */
export function timeStampFormat(
  timestamp: number,
  fmt: string,
  defaultVal?: string,
) {
  if (!timestamp) {
    return defaultVal || '';
  }
  const date = new Date();
  if (`${timestamp}`.length === 10) {
    timestamp *= 1000;
  }
  date.setTime(timestamp);
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };

  let match = fmt.match(/(y+)/);
  if (match?.[1]) {
    fmt = fmt.replace(
      match[1],
      `${date.getFullYear()}`.slice(4 - match[1].length),
    );
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const k in o) {
    match = fmt.match(new RegExp(`(${k})`));
    if (match?.[1]) {
      fmt = fmt.replace(
        match[1],
        match[1].length === 1 ? o[k] : `00${o[k]}`.slice(`${o[k]}`.length),
      );
    }
  }
  return fmt;
}

function beautiTime(time: number): string {
  if (time >= 10) return `${time}`;
  return `0${time}`;
}

/**
 * 将日期格式化
 * @param {Date} date
 * @param {string} format
 * @returns {string} 格式化后的日期字符串
 * @example
 *
 * const date = new Date('2020-11-27 8:23:24');
 *
 * const res = dateFormat(date, 'yyyy-MM-dd hh:mm:ss')
 *
 * // 2020-11-27 08:23:24
 */
export function dateFormat(date, fmt) {
  const timestamp = new Date(date).getTime();
  return timeStampFormat(timestamp, fmt);
}

/**
 * 功能和上面的dateFormat/timeStampFormat类型，只是参数time可以接收多种类型，且参数cFormat用的是{y}形式
 * @param {(Object|string|number)} time 输入日期
 * @param {string} cFormat 时间格式
 * @returns {string | null} 格式化后的日期字符串
 * @example
 *
 * const date = new Date('2020-11-27 8:23:24');
 *
 * const res = parseTime(date, 'yyyy-MM-dd hh:mm:ss')
 *
 * // 2020-11-27 08:23:24
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time, 10);
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time *= 1000;
    }
    date = new Date(time);
  }

  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const timeStr = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    return value.toString().padStart(2, '0');
  });
  return timeStr;
}


/**
 * 获取某个时间戳距离今天的时间
 * @param {number} timestamp
 * @returns {string} 距离今天的时间描述
 * @example
 *
 * const date = new Date('2020-11-27 8:23:24').getTime();
 * getTimeAgo(date);
 * // 1个月前
 *
 * const date2 = new Date('2021-11-27 8:23:24').getTime();
 * getTimeAgo(date2);
 * // 10个月后
  */
export function getTimeAgo(timestamp) {
  let mistiming = Math.round(Date.now() / 1000) - timestamp;
  const postfix = mistiming > 0 ? '前' : '后';
  mistiming = Math.abs(mistiming);
  const arrr = ['年', '个月', '星期', '天', '小时', '分钟', '秒'];
  const arrn = [31536000, 2592000, 604800, 86400, 3600, 60, 1];

  for (let i = 0; i < 7; i++) {
    const inm = Math.floor(mistiming / arrn[i]);
    if (inm !== 0) {
      return inm + arrr[i] + postfix;
    }
  }
  return '';
}


/**
 * 功能：获取多久之前，若间隔超过一天，返回时刻描述
 * @param {number} timestamp 时间戳
 * @param {string} format 时间格式
 * @returns {string} 距离今天的时间描述或者时刻描述
 * @example
 *
 * getTimeAgoOrDate(Date.now() - 60 * 60 * 24 * 1 * 1000);
 * // 1天前
 *
 * const date = new Date('2018-07-13 17:54:01').getTime();
 * getTimeAgoOrDate(date);
 * // 7月13日17时54分
 */
export function getTimeAgoOrDate(time, format) {
  if (`${time}`.length === 10) {
    time = parseInt(time, 10) * 1000;
  } else {
    time = +time;
  }
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d.getTime()) / 1000;

  if (diff < 30) {
    return '刚刚';
  }
  if (diff < 3600) {
    // less 1 hour
    return `${Math.ceil(diff / 60)}分钟前`;
  }
  if (diff < 3600 * 24) {
    return `${Math.ceil(diff / 3600)}小时前`;
  }
  if (diff < 3600 * 24 * 2) {
    return '1天前';
  }
  if (format) {
    return parseTime(time, format);
  }
  return `${
    d.getMonth() + 1
  }月${d.getDate()}日${d.getHours()}时${d.getMinutes()}分`;
}

/**
 * 倒计时（eg:距开赛1天）
 * @param {string} time  剩余时间
 * @param {SECOND | MINUTE | HOUR | DAY } [maxUnit]  最大单位
 * @returns {object} 剩余时间的描述对象
 * @example
 *
 * getCountDownObj(100)
 * // { day: 0, hour: 0, minute: 1, second: 40 }
 *
 * getCountDownObj(1*24*60*60+200)
 * // { day: 1, hour: 0, minute: 3, second: 20 }
 *
 * getCountDownObj(1 * 24 * 60 * 60 + 2 * 60 * 60 + 1 * 60 + 11, 'HOUR')
 * // 结果 =>
 * {
 *   fHour: '26',
 *   fMinute: '01',
 *   fSecond: '11',
 *   hour: 26,
 *   minute: 1,
 *   second: 11,
 * }
 */
export function getCountDownObj(
  time,
  maxUnit = 'DAY',
): {
    day?: Number
    hour?: Number
    minute?: Number
    second?: Number
    fDay?: String
    fHour?: String
    fMinute?: String
    fSecond?: String
  } {
  if (!time) {
    return {};
  }
  time = parseInt(time, 10);

  const second = Math.floor(time % 60);
  // 秒是最大单位
  if (maxUnit === 'SECOND') {
    return {
      second: time,
      fSecond: beautiTime(second),
    };
  }

  let minute = Math.floor((time / 60) % 60);
  // 分钟是最大单位
  if (maxUnit === 'MINUTE') {
    minute = Math.floor(time / 60);

    return {
      minute,
      second,
      fMinute: beautiTime(minute),
      fSecond: beautiTime(second),
    };
  }

  let hour = Math.floor((time / 60 / 60) % 24);
  // 小时为最大单位
  if (maxUnit === 'HOUR') {
    hour = Math.floor(time / 60 / 60);

    return {
      hour,
      minute,
      second,
      fHour: beautiTime(hour),
      fMinute: beautiTime(minute),
      fSecond: beautiTime(second),
    };
  }

  // 天为最大单位
  if (maxUnit === 'DAY') {
    const day = Math.floor(time / 60 / 60 / 24);

    return {
      day,
      hour,
      minute,
      second,
      fDay: beautiTime(day),
      fHour: beautiTime(hour),
      fMinute: beautiTime(minute),
      fSecond: beautiTime(second),
    };
  }
  return {};
}

