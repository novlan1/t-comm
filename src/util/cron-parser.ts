/* eslint-disable @typescript-eslint/no-require-imports */

function getMinute(time) {
  return parseInt(`${time / 1000 / 60}`, 10);
}


export function isInCronExpression(cronExpression) {
  const parser = require('cron-parser');
  const options = {
    // 当前时间提前1分钟，否则匹配不到
    currentDate: new Date(Date.now() - 60 * 1000),
  };

  try {
    const interval = parser.parseExpression(cronExpression, options);
    const nextDate = interval.next();

    const nextMinute = getMinute(nextDate.getTime());
    const nowMinute = getMinute(Date.now());

    return nowMinute === nextMinute;
  } catch (err: any) {
    console.log(`[isInCronExpression] Error: ${err.message}`);
  }
  return false;
}
