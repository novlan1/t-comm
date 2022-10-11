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
 *       target: ['LAUNCH_GAME_WX_SUC', 'ENTER_GAME_WX_SUC', 'LAUNCH_GAME_WX_FAIL', 'ENTER_GAME_WX_FAIL'],
 *     },
 *     WX_SUC_RATIO: {
 *       // 比例
 *       type: 'RATIO',
 *       target: [
 *         // 分母部分
 *         ['LAUNCH_GAME_WX_SUC', 'ENTER_GAME_WX_SUC', 'LAUNCH_GAME_WX_FAIL', 'ENTER_GAME_WX_FAIL'],
 *         // 分子部分
 *         ['LAUNCH_GAME_WX_SUC', 'ENTER_GAME_WX_SUC'],
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
  const res = {};
  Object.keys(eventMap).forEach((event) => {
    const info = eventMap[event] || {};
    const { target, type } = info;
    if (type === 'SUMMARY') {
      res[event] = getEventSummary(target, data) || 0;
    } else if (type === 'RATIO') {
      const { 0: part = [], 1: summary = [] } = target;
      res[event] = getPartRatio(getEventSummary(part, data), getEventSummary(summary, data)) || 0;
    }
  });
  return res;
}


function getEventSummary(keyList, dataMap) {
  return keyList.reduce((acc, item) => acc + dataMap[item], 0);
}


/**
 * 解析自定义事件数据
 * @param {object} options 配置
 * @param {object} options.data 自定义事件数据
 * @param {object} options.projectIdNameMap 项目id和name的map
 * @param {Array<string>} options.sortKeyList 排序key列表
 * @returns
 */
export function parseEventData({
  data = {},
  projectIdNameMap = {},
  sortKeyList = [],
}: {
  data: object
  projectIdNameMap: object
  sortKeyList?: Array<string>
}) {
  return Object.keys(data)
    .map((key) => {
      const temp = {};
      const list = data[key]
        .concat([
          {
            name: 'ProjectName',
            value: projectIdNameMap[key].name,
          },
        ])
        .filter(item => sortKeyList.includes(item.name))
        .sort((a, b) => sortKeyList.indexOf(a.name) - sortKeyList.indexOf(b.name));

      list.forEach((item) => {
        temp[item.name] = item;
      });
      return temp;
    });
}
