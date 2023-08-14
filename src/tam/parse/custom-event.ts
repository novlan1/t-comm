import { getPartRatio } from '../../base/number';
import { saveJsonToLog } from '../../node/fs-util';

/**
 * 处理事件数据
 * @ignore
 * @param {object} options 配置
 * @example
 *
 * const res = parseEventData({
 *   data: {
 *     LAUNCH_GAME_WX_SUC: 2,
 *     LAUNCH_GAME_WX_FAIL: 1,
 *     ENTER_GAME_WX_SUC: 2,
 *     ENTER_GAME_WX_FAIL: 6,
 *   },
 *   eventMap: {
 *     WX_SUC: {
 *       // 总和
 *       type: 'SUMMARY',
 *       target: ['LAUNCH_GAME_WX_SUC', 'ENTER_GAME_WX_SUC'],
 *     },
 *     WX_FAIL: {
 *       // 总和
 *       type: 'SUMMARY',
 *       target: ['LAUNCH_GAME_WX_FAIL', 'ENTER_GAME_WX_FAIL'],
 *     },
 *     WX_SUMMARY: {
 *       // 总和
 *       type: 'SUMMARY',
 *       target: ['WX_SUC', 'WX_FAIL'],
 *     },
 *     WX_SUC_RATIO: {
 *       // 比例
 *       type: 'RATIO',
 *       target: [
 *         // 分母部分
 *         ['WX_SUMMARY'],
 *         // 分子部分
 *         ['WX_SUC'],
 *       ],
 *     },
 *   },
 * });
 *
 * console.log(res);
 *
 * // 结果如下：
 * {
 *   WX_SUC: 4,
 *   WX_FAIL: 7,
 *   WX_SUMMARY: 11,
 *   WX_SUC_RATIO: 36.36,
 * }
 *
 *
 */
function parseEventData({
  data,
  eventMap,
}: {
  data: Record<string, any>;
  eventMap: Record<string, any>;
}) {
  const res: any = {};
  Object.keys(eventMap).forEach((event) => {
    const info = eventMap[event] || {};
    const { target, type } = info;
    if (type === 'SUMMARY') {
      res[event] = getEventSummary(target, data, res) || 0;
    } else if (type === 'RATIO') {
      const { 0: summary = [], 1: part = [] } = target;
      res[event] = getPartRatio(getEventSummary(summary, data, res), getEventSummary(part, data, res)) || 0;
    }
  });

  res.ALL_SUMMARY = Object.keys(res)
    .filter(key => key.endsWith('_SUMMARY'))
    .reduce((acc, item) => acc + res[item], 0);
  res.ALL_FAIL = Object.keys(res)
    .filter(key => key.endsWith('_FAIL'))
    .reduce((acc, item) => acc + res[item], 0);

  res.ALL_FAIL_RATIO = getPartRatio(res.ALL_SUMMARY, res.ALL_FAIL);
  return res;
}


/**
 * 获取数据综合
 * @ignore
 * @param keyList keyList
 * @param dataMap dataMap
 * @param extraDataMap extraDataMap
 * @returns 数据综合
 */
function getEventSummary(keyList: Array<string>, dataMap: Record<string, any>, extraDataMap: Record<string, any>) {
  return keyList.reduce((acc, item) => acc + (dataMap[item] || extraDataMap[item] || 0), 0);
}


/**
 * 解析额外数据
 * @ignore
 * @param eventDataMap 数据map
 * @returns 解析后的数据
 * @example
 * const eventDataMap = {
 * '57706': {
    LAUNCH_GAME_FAIL_GP_HELPER: 2,
    LAUNCH_GAME_FAIL_QQ: 228,
    extraData: {
      JUMP_LIVE_ACCOUNT_CONSOLE_SUC: 27,
      LAUNCH_GAME_FAIL_MP: 11,
      LAUNCH_GAME_SUC_MP: 261,
    }
  },
  '62653': {
 * }
 *
 * const res = parseExtraData(eventDataMap)
 * console.log(res)
 * {
 *   57706: {
 *   LAUNCH_GAME_FAIL_GP_HELPER: 2,
     LAUNCH_GAME_FAIL_QQ: 228,
 *   EXTRA_DATA_JUMP_LIVE_ACCOUNT_CONSOLE_SUC: 27,
     EXTRA_DATA_LAUNCH_GAME_FAIL_MP: 11,
     EXTRA_DATA_LAUNCH_GAME_SUC_MP: 261,
 *   },
     62653: {
      // ...
     }
 * }
 */
function parseExtraData(eventDataMap: Record<string, any>) {
  const res: Record<string, any> = {};
  saveJsonToLog(eventDataMap, 'tam.custom-event.event-data-map.json');

  Object.keys(eventDataMap).forEach((projectId) => {
    const eventData = eventDataMap[projectId];
    if (eventData.extraData) {
      Object.keys(eventData.extraData).forEach((key) => {
        eventData[`EXTRA_DATA_${key}`] = eventData.extraData[key];
      });
      delete eventData.extraData;
    }
    res[projectId] = eventData;
  });

  saveJsonToLog(res, 'tam.custom-event.parsed-extra-data.json');
  return res;
}


/**
 * 解析自定义事件数据
 * @ignore
 * @param options 配置
 * @returns 解析后的数据
 */
export function parseMultiCustomEvent({
  eventDataMap,
  eventMap,
  projectIdMap = {},
  sortKeyList,
}: {
  eventDataMap: Record<string, any>;
  eventMap: Record<string, any>;
  projectIdMap?: Record<string, any>;
  sortKeyList: Array<string>;
}) {
  const parsedEventData = parseExtraData(eventDataMap);

  const res: any = [];
  Object.keys(parsedEventData).forEach((projectId) => {
    const eventData = eventDataMap[projectId];
    const parsedData = parseEventData({
      data: eventData,
      eventMap,
    });

    // 统一格式，类似于：[ { ProjectName: { name: 'ProjectName', value: '脚手架' } } ]
    let initial: Record<string, any> = {
      ProjectName: { name: 'ProjectName', value: projectIdMap[projectId]?.name },
    };

    initial = Object.keys(parsedData)
      .filter(item => sortKeyList.includes(item))
      .sort((a, b) => sortKeyList.indexOf(a) - sortKeyList.indexOf(b))
      .reduce((acc: Record<string, {
        name: string;
        value: any;
      }>, key) => {
        acc[key] = { name: key, value: parsedData[key] };
        return acc;
      }, initial);

    res.push(initial);
  });

  saveJsonToLog(res, 'tam.custom-event.parsed-multi-custom-event.json');
  return res;
}
