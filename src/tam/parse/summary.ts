import { ScoreInfoType } from '../type';
import { getPartRatio } from '../../base/number';

function formatNum(num) {
  if (typeof num !== 'number') {
    return num;
  }
  return +num.toFixed(2);
}

/**
 * 解析汇总数据
 * @ignore
 * @param {object} options 配置
 * @param {Array<object>} options.data 汇总数据
 * @param {object} options.extraDataMap 额外数据Map，键为 ProjectId
 * @param {Array<number>} options.ignoreProjectIdList 忽略的projectIdList
 * @param {Array<string>} options.sortKeyList 排序key列表
 * @returns {Array<object>} 处理后的数据
 * @example
 *
 * const result = parseSummaryScore({
 *   data
 * })
 * // 结果如下：
 * [
 *   {
 *     ProjectName: { name: 'ProjectName', value: '脚手架' },
 *     PagePv: { name: 'PagePv', value: 544343 },
 *     PageUv: { name: 'PageUv', value: 225275 },
 *     Score: { name: 'Score', value: 90 },
 *     PageDuration: { name: 'PageDuration', value: 2894.08 },
 *     PageError: { name: 'PageError', value: 627 },
 *     PageErrorRatio: { name: 'PageErrorRatio', value: 0.12 },
 *     ApiNum: { name: 'ApiNum', value: 2506167 },
 *     ApiFail: { name: 'ApiFail', value: 3468 },
 *     ApiFailRatio: { name: 'ApiFailRatio', value: 0.14 },
 *     ApiDuration: { name: 'ApiDuration', value: 337.67 },
 *     StaticNum: { name: 'StaticNum', value: 9857894 },
 *     StaticFail: { name: 'StaticFail', value: 1174 },
 *     StaticFailRatio: { name: 'StaticFailRatio', value: 0.01 },
 *     StaticDuration: { name: 'StaticDuration', value: 154.5 },
 *   },
 *   {
 *     ProjectName: { name: 'ProjectName', value: '社区' },
 *     // ...
 *   },
 * ]
 */
export function parseSummaryScore({
  data,
  extraDataMap = {},
  ignoreProjectIdList = [],
  sortKeyList = [],
}: {
  data: Array<ScoreInfoType>
  extraDataMap?: object
  ignoreProjectIdList?: Array<number>
  sortKeyList?: Array<string>
}) {
  const res = data
    .filter(item => !ignoreProjectIdList.includes(+item.ProjectId))
    .sort((a, b) => +b.PagePv - +a.PagePv)
    .map((item) => {
      const temp = {};
      const projectId = item.ProjectId;

      const list = Object.keys(item)
        .map(iKey => ({
          name: iKey,
          value: formatNum(item[iKey]),
        }))
        .concat([{
          name: 'ApiFailRatio',
          value: getPartRatio(item.ApiNum, item.ApiFail),
        }, {
          name: 'StaticFailRatio',
          value: getPartRatio(item.StaticNum, item.StaticFail),
        }, {
          name: 'PageErrorRatio',
          value: getPartRatio(item.PagePv, item.PageError),
        }])
        .concat(extraDataMap[projectId] || [])
        .filter(item => sortKeyList.includes(item.name))
        .sort((a, b) => sortKeyList.indexOf(a.name) - sortKeyList.indexOf(b.name));

      list.forEach((item) => {
        temp[item.name] = item;
      });

      return temp;
    });
  return res;
}
