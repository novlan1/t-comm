import { getMultiCustomEventData } from '../api/custom-event';
import { parseMultiCustomEvent, getTableHeaders } from '../parse';
import { createCanvasTable } from '../../canvas/table';
import { compareTwoList, getMaxAndMinIdx } from '../../base/list';
import { getSomeDayStartTimeStamp, getSomeDayEndTimeStamp } from '../../date';
import { timeStampFormat } from '../../time/time';
import { batchSendWxRobotBase64Img } from '../../wecom-robot/batch-send';
import type { SecretInfoType } from '../types';

/**
 * 获取自定义事件图片
 * @ignore
 * @param {object} options 配置信息
 * @returns {string} 图片url
 * @example
 *
 * const requestMultiImgDate = Date.now() - 1 * 24 * 60 * 60 * 1000;
 *
 * const tamGroupIdList = [1, 2, 3];
 *
 * const eventProjectMap = {
 *   62659: {
 *     name: 'aaaaa',
 *   },
 *   57706: {
 *     name: 'bbbbb',
 *     extraProjectId: 66379,
 *   },
 * };
 *
 * const eventMap = {
 *   WX_SUC: {
 *     // 总和
 *     type: 'SUMMARY',
 *     target: ['ENTER_GAME_WX_SUC', 'LAUNCH_GAME_SUC_WX'],
 *   },
 *   WX_FAIL: {
 *     // 总和
 *     type: 'SUMMARY',
 *     target: ['ENTER_GAME_WX_FAIL', 'LAUNCH_GAME_FAIL_WX'],
 *   },
 * };
 *
 * const eventTableHeaderMap = {
 *   ProjectName: {
 *     name: '项目名称',
 *     tableWidth: 95,
 *   },
 *   ALL_SUMMARY: {
 *     name: '拉起总数',
 *     tableWidth: 65,
 *   },
 * };
 *
 * genCustomEventImg({
 *   date: requestLaunchGameDate,
 *   secretInfo: {
 *     getPwdCode,
 *     encrypt,
 *     apiKey: process.env.AEGIS_APP_KEY,
 *     loginName: 'lee',
 *   },
 *   projectIdMap: eventProjectMap,
 *   eventMap,
 *   tableHeaderMap: eventTableHeaderMap,
 * });
 *
 */
export async function genCustomEventImg({
  // 获取数据参数
  date,
  projectIdMap,
  env = 'production',
  secretInfo,

  // 处理数据、画图参数
  eventMap,
  tableHeaderMap,
}: {
  date: string | number | Date;
  projectIdMap: Record<string, any>;
  env: string;
  secretInfo: SecretInfoType;

  // 处理数据、画图参数
  eventMap: {};
  tableHeaderMap: {};
}) {
  const startTime = getSomeDayStartTimeStamp(date);
  const endTime = getSomeDayEndTimeStamp(date);

  const preStartTime = getSomeDayStartTimeStamp(new Date(date).getTime() - 1 * 24 * 60 * 60 * 1000);
  const preEndTime = getSomeDayEndTimeStamp(new Date(date).getTime() - 1 * 24 * 60 * 60 * 1000);

  const headerDate = timeStampFormat(new Date(date).getTime(), 'yyyy-MM-dd');

  const sortKeyList = Object.keys(tableHeaderMap);
  if (!sortKeyList.length) {
    return;
  }

  const data = await getMultiCustomEventData({
    startTime,
    endTime,
    projectIdMap,
    env,
    secretInfo,
  });

  const preData = await getMultiCustomEventData({
    startTime: preStartTime,
    endTime: preEndTime,
    projectIdMap,
    env,
    secretInfo,
  });

  if (!data) return;
  if (!preData) return;

  const parsedData = parseMultiCustomEvent({
    eventDataMap: data,
    eventMap,
    projectIdMap,
    sortKeyList,
  });

  const parsedPreData = parseMultiCustomEvent({
    eventDataMap: preData,
    eventMap,
    projectIdMap,
    sortKeyList,
  });

  compareTwoList(parsedData, parsedPreData, 'ProjectName');

  const tableData = getMaxAndMinIdx(parsedData);

  const img = createCanvasTable({
    data: tableData,
    headers: getTableHeaders(tableData, tableHeaderMap),
    title: `拉起游戏数据汇总 ${headerDate}`,
    cellWidthList: Object.values(tableHeaderMap).map(item => (item as any).tableWidth || 65),
  });

  return img;
}


/**
 * 获取自定义事件图片并发送
 * @param {object} options 配置信息
 * @returns {string} 图片url
 * @example
 *
 * const requestMultiImgDate = Date.now() - 1 * 24 * 60 * 60 * 1000;
 *
 * const tamGroupIdList = [1, 2, 3];
 *
 * const eventProjectMap = {
 *   62659: {
 *     name: 'aaaaa',
 *   },
 *   57706: {
 *     name: 'bbbbb',
 *     extraProjectId: 66379,
 *   },
 * };
 *
 * const eventMap = {
 *   WX_SUC: {
 *     // 总和
 *     type: 'SUMMARY',
 *     target: ['ENTER_GAME_WX_SUC', 'LAUNCH_GAME_SUC_WX'],
 *   },
 *   WX_FAIL: {
 *     // 总和
 *     type: 'SUMMARY',
 *     target: ['ENTER_GAME_WX_FAIL', 'LAUNCH_GAME_FAIL_WX'],
 *   },
 * };
 *
 * const eventTableHeaderMap = {
 *   ProjectName: {
 *     name: '项目名称',
 *     tableWidth: 95,
 *   },
 *   ALL_SUMMARY: {
 *     name: '拉起总数',
 *     tableWidth: 65,
 *   },
 * };
 *
 * genCustomEventImgAndSendRobot({
 *   date: requestLaunchGameDate,
 *   secretInfo: {
 *     getPwdCode,
 *     encrypt,
 *     apiKey: process.env.AEGIS_APP_KEY,
 *     loginName: 'lee',
 *   },
 *   projectIdMap: eventProjectMap,
 *   eventMap,
 *   tableHeaderMap: eventTableHeaderMap,
 *   webhookUrl: tamRobotWebhook,
 *   chatId: tamRobotChatId,
 * });
 *
 */
export async function genCustomEventImgAndSendRobot({
  date,
  projectIdMap,
  env = 'production',
  secretInfo,

  eventMap,
  tableHeaderMap,

  webhookUrl,
  chatId,
}: {
  date: number;
  projectIdMap: Array<string>;
  env: string;
  secretInfo: SecretInfoType;

  eventMap: {};
  tableHeaderMap: {};

  webhookUrl: string;
  chatId: string;
}) {
  const img = await genCustomEventImg({
    date,
    projectIdMap,
    env,
    secretInfo,

    eventMap,
    tableHeaderMap,
  });

  if (!img || !chatId) {
    return;
  }

  await batchSendWxRobotBase64Img({
    img,
    webhookUrl,
    chatId,
  });
}
