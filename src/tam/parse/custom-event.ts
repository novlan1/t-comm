import { getPartRatio } from '../../base/number';

/**
 * 处理事件数据
 * @param {object} options 配置
 * @example
 *
 * const res = getExtraEventData({
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
export function getExtraEventData({
  data,
  eventMap,
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
function getEventSummary(keyList, dataMap, extraDataMap) {
  return keyList.reduce((acc, item) => acc + (dataMap[item] || extraDataMap[item] || 0), 0);
}


/**
 * 解析额外数据
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
function parseExtraData(eventDataMap) {
  const res = {};
  console.log('parseExtraData.eventDataMap', eventDataMap);
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
  console.log('parseExtraData.res', res);
  return res;
}


/**
     * 解析自定义事件数据
     * @param options 配置
     * @returns 解析后的数据
     * @example
     *
     * const eventDataMap = {
     * {
      '57706': {
        AI_PLAYER_EVENT_0: 10063,
        AI_PLAYER_EVENT_14: 16,
        AI_PLAYER_EVENT_300001: 9325,
        AI_PLAYER_EVENT_4: 25,
        LAUNCH_GAME_FAIL_GP_HELPER: 2,
        LAUNCH_GAME_FAIL_QQ: 228,
        LAUNCH_GAME_FAIL_WX: 3,
       },
        '62653': {
          // ...
        }
      }
     * }

      const eventMap = {
        WX_SUC: {
        type: 'SUMMARY',
        target: [ 'ENTER_GAME_WX_SUC', 'LAUNCH_GAME_SUC_WX' ]
      },
      WX_FAIL: {
        type: 'SUMMARY',
        target: [ 'ENTER_GAME_WX_FAIL', 'LAUNCH_GAME_FAIL_WX' ]
      },
      WX_SUMMARY: {
        type: 'SUMMARY',
        target: [
          'WX_SUC',
          'WX_FAIL',
          'ENTER_GAME_WX_NO_PERMISSION',
          'LAUNCH_GAME_WX_NO_PERMISSION',
          'ENTER_GAME_WX_ACCESS_DENIED',
          'LAUNCH_GAME_WX_ACCESS_DENIED'
        ]
      },
      // ...
      }
      const res = parseMultiCustomEvent({
        eventDataMap,
        eventMap,
      })
     * console.log(res)
     *[
      {
        projectId: { name: 'projectId', value: '57706' },
        WX_SUC: { name: 'WX_SUC', value: 1184 },
        WX_FAIL: { name: 'WX_FAIL', value: 3 },
        WX_SUMMARY: { name: 'WX_SUMMARY', value: 1262 },
        WX_FAIL_RATIO: { name: 'WX_FAIL_RATIO', value: 0.24 },
        QQ_SUC: { name: 'QQ_SUC', value: 1807 },
      },
      {
        projectId: { name: 'projectId', value: '62653' },
        // ...
      }
      ]
     */
export function parseMultiCustomEvent({
  eventDataMap,
  eventMap,
  projectIdMap = {},
  sortKeyList,
}) {
  const parsedEventData = parseExtraData(eventDataMap);

  const res: any = [];
  Object.keys(parsedEventData).forEach((projectId) => {
    const eventData = eventDataMap[projectId];
    const parsedData = getExtraEventData({
      data: eventData,
      eventMap,
    });

    // 统一格式，类似于：[ { ProjectName: { name: 'ProjectName', value: '脚手架' } } ]
    let initial = {
      ProjectName: { name: 'ProjectName', value: projectIdMap[projectId]?.name },
    };

    initial = Object.keys(parsedData)
      .filter(item => sortKeyList.includes(item))
      .sort((a, b) => sortKeyList.indexOf(a) - sortKeyList.indexOf(b))
      .reduce((acc, key) => {
        acc[key] = { name: key, value: parsedData[key] };
        return acc;
      }, initial);

    res.push(initial);
  });
  console.log('parseMultiCustomEvent.res', res, eventDataMap, eventMap);
  return res;
}
