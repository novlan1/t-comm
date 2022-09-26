function addZero(date) {
  return date < 10 ? `0${date}` : date;
}

export function getVersion() {
  const now = new Date();
  const year = now.getFullYear();
  const month = addZero(now.getMonth() + 1);
  const day = addZero(now.getDate());
  const hour = addZero(now.getHours());
  const minute = addZero(now.getMinutes());
  const second = addZero(now.getSeconds());
  const ms = now.getMilliseconds();
  return `${year}${month}${day}${hour}${minute}${second}${ms}`;
}

export const BASE_URL = 'http://api.rainbow.oa.com:8080';
