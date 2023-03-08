/* eslint-disable @typescript-eslint/no-require-imports */
import { saveJsonToLog, readJsonLog } from '../util/fs-util';

/**
 * 组装发送给机器人的消息
 * @private
 * @param {Array<object>} usefulData 处理后的数据
 * @returns {string} 发送给机器人的markdown消息
 */
export function composeRobotContent(usefulData: Array<any> = []): string {
  if (!usefulData.length) {
    return '当前深圳预警已全部解除';
  }

  const content = ['>【深圳当前生效的预警】'];
  const WEB_LINK = 'http://weather.sz.gov.cn/qixiangfuwu/yujingfuwu/tufashijianyujing/';

  const tempList = usefulData.map((item, index) => {
    const {
      date,
      alarmArea,
      alarmType,
      alarmColor,
      // str,
    } = item;
    const list = [
      `${index + 1}. ${alarmType}${alarmColor || ''}预警·${alarmArea}，发布时间：${date}`,
      // `${str}`,
    ];
    return list.join('\n');
  });
  content.push(tempList.join('\n'));
  content.push(`[深圳市气象局](${WEB_LINK})`);
  return content.join('\n');
}


/**
 * 对比数据
 * @private
 * @param {Array<object>} usefulData 处理后的数据
 * @returns {boolean} 是否和以前数据一样
 */
export function compareData(usefulData: Array<object|undefined> = []): boolean {
  const FILE_NAME = 'alarm.json';
  let preData = '{}';

  try {
    preData = readJsonLog(FILE_NAME);
  } catch (e) {
    console.log('[compareData] err: ', e);
  }

  const isSame = JSON.stringify(JSON.parse(preData)) === JSON.stringify(usefulData);

  saveJsonToLog(usefulData, FILE_NAME);

  return isSame;
}


/**
 * 处理weather数据
 * @private
 * @param {Array<object>} subAlarm 天气数据
 * @returns 处理后的数据
 */
export function parseWeatherData(subAlarm: Array<any> = []): {
  content: string
  isSame: boolean
} {
  const usefulData = subAlarm.map((item) => {
    const {
      date,
      alarmArea,
      alarmType,
      alarmColor,
      str,
    } = item;

    return {
      date,
      alarmArea,
      alarmType,
      alarmColor,
      str,
    };
  });

  const isSame = compareData(usefulData);

  const content = composeRobotContent(usefulData);

  return {
    content,
    isSame,
  };
}
