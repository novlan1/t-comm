import { getSummaryScoreByGroupIdList } from '../api/summary-score';
import { parseSummaryScore, getTableHeaders } from '../parse';
import { compareTwoList, getMaxAndMinIdx } from '../../base/list';
import { createCanvasTable } from '../../canvas/table';
import { timeStampFormat } from '../../date/time';
import { sendWxRobotBase64Img } from '../../wecom-robot/send-img';


/**
 * 生成TAM汇总数据图
 * @param {object} options 配置
 * @param {string} options.date 日期，yyyyMMdd格式
 * @param {Array<number>} options.groupIdList groupId列表
 *
 * @param {object} options.secretInfo 密钥信息
 * @param {string} options.secretInfo.apiKey apiKey
 * @param {string} options.secretInfo.loginName loginName
 * @param {Function} options.secretInfo.getPwdCode getPwdCode
 * @param {Function} options.secretInfo.encrypt encrypt
 *
 * @param {object} options.extraDataMap 额外数据Map
 * @param {object} options.ignoreProjectIdList 忽略的projectIdList
 *
 * @param {object} options.tableHeaderMap 表格头部Map
 * @returns {string} 图片base64
 * @example
 *
 *
 */
export async function genSummaryData({
  date,
  groupIdList,
  secretInfo,

  extraDataMap = {},
  ignoreProjectIdList = [],

  tableHeaderMap = {},
}) {
  const parsedDate = timeStampFormat(new Date(date).getTime(), 'yyyyMMdd');
  const headerDate = timeStampFormat(new Date(date).getTime(), 'yyyy-MM-dd');
  const parsedPreDate = timeStampFormat(new Date(date).getTime() - 1 * 24 * 60 * 60 * 1000, 'yyyyMMdd');
  console.log('parsedDate: ', parsedDate);
  console.log('parsedPreDate: ', parsedPreDate);

  const sortKeyList = Object.keys(tableHeaderMap);
  if (!sortKeyList.length) {
    return;
  }

  const data = await getSummaryScoreByGroupIdList({
    date: parsedDate,
    groupIdList,
    secretInfo,
  });
  console.log('data: ', data);

  const preData = await getSummaryScoreByGroupIdList({
    date: parsedPreDate,
    groupIdList,
    secretInfo,
  });
  console.log('preData: ', preData);

  const parsedData = parseSummaryScore({
    data: data.data,
    extraDataMap,
    ignoreProjectIdList,
    sortKeyList,
  });

  const parsedPreData = parseSummaryScore({
    data: preData.data,
    extraDataMap,
    ignoreProjectIdList,
    sortKeyList,
  });

  compareTwoList(parsedData, parsedPreData, 'ProjectName');

  const tableData = getMaxAndMinIdx(parsedData);

  const img = createCanvasTable({
    data: tableData,
    headers: getTableHeaders(tableData, tableHeaderMap),
    title: `TAM日报 ${headerDate}`,
    cellWidthList: Object.values(tableHeaderMap).map(item => (item as any).tableWidth || 65),
  });

  return img;
}

/**
 * 生成TAM汇总数据并发送到机器人
 * @param {object} options 配置
 * @param {string} options.date 日期，yyyyMMdd格式
 * @param {Array<number>} options.groupIdList groupId列表
 *
 * @param {object} options.secretInfo 密钥信息
 * @param {string} options.secretInfo.apiKey apiKey
 * @param {string} options.secretInfo.loginName loginName
 * @param {Function} options.secretInfo.getPwdCode getPwdCode
 * @param {Function} options.secretInfo.encrypt encrypt
 *
 * @param {object} options.extraDataMap 额外数据Map
 * @param {object} options.ignoreProjectIdList 忽略的projectIdList
 * @param {object} options.sortKeyList 排序key列表
 * @param {object} options.tableHeaderMap 表格头部Map
 *
 * @param {object} options.webhookUrl 机器人回调地址
 * @param {object} options.chatId 会话Id
 */
export async function genSummaryDataAndSendRobot({
  date,
  groupIdList,
  secretInfo,

  extraDataMap = {},
  ignoreProjectIdList = [],

  tableHeaderMap = {},

  webhookUrl,
  chatId,
}) {
  const img = await genSummaryData({
    date,
    groupIdList,
    secretInfo,

    extraDataMap,
    ignoreProjectIdList,

    tableHeaderMap,
  });

  if (!img || !chatId) {
    return;
  }

  if (!Array.isArray(chatId)) {
    chatId = [chatId];

    for (const id of chatId) {
      await sendWxRobotBase64Img({
        img,
        webhookUrl,
        chatId: id,
      });
    }
  }
}
