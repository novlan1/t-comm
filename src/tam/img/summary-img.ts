import { getTAMSummaryScoreByGroupIdList } from '../api/summary-score';
import { getRUMScores } from '../api/rum-score';

import { parseSummaryScore, getTableHeaders } from '../parse';
import { compareTwoList, getMaxAndMinIdx } from '../../base/list';
import { createCanvasTable } from '../../canvas/table';
import { timeStampFormat } from '../../time/time';

import { batchSendWxRobotBase64Img } from '../../wecom-robot/batch-send';
import { saveJsonToLog } from '../../node/fs-util';
import type { SecretInfoType, IRumSecretItem } from '../types';


async function getRUMScoreList({
  secretInfo,
  parsedDate,
  parsedPreDate,
  date,
}: {
  secretInfo: Pick<SecretInfoType, 'rumSecretId' | 'rumSecretKey'>;
  parsedDate: string;
  parsedPreDate: string;
  date: string | number | Date;
}) {
  if (!secretInfo.rumSecretId || !secretInfo.rumSecretKey) {
    return {};
  }
  const parsedPostDate = timeStampFormat(new Date(date).getTime() + 1 * 24 * 60 * 60 * 1000, 'yyyyMMdd');

  const rumScores = await getRUMScores({
    secretId: secretInfo.rumSecretId,
    secretKey: secretInfo.rumSecretKey,
    startTime: `${parsedDate}00`,
    endTime: `${parsedPostDate}00`,
  });

  const preRumScores = await getRUMScores({
    secretId: secretInfo.rumSecretId,
    secretKey: secretInfo.rumSecretKey,
    startTime: `${parsedPreDate}00`,
    endTime: `${parsedDate}00`,
  });

  console.log('[getRUMScoreList] parsedPostDate: ', parsedPostDate);

  saveJsonToLog(rumScores, 'rum-score.json');
  saveJsonToLog(preRumScores, 'rum-score-pre.json');

  return {
    rumScores,
    preRumScores,
  };
}

/**
 * 生成TAM汇总数据图
 * @ignore
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
 * const requestSummaryScoreDate = Date.now() - 1 * 24 * 60 * 60 * 1000;
 *
 * const tamGroupIdList = [1, 2, 3];
 *
 * const summaryScoreTableHeaderMap = {
 *   ProjectName: {
 *     name: '项目名称',
 *     tableWidth: 95,
 *   },
 *   PagePv: {
 *     name: 'PV',
 *     tableWidth: 65,
 *   },
 * };
 *
 * await genSummaryData({
 *   date: requestSummaryScoreDate,
 *   groupIdList: tamGroupIdList,
 *   secretInfo: {
 *     getPwdCode,
 *     encrypt,
 *     apiKey: process.env.AEGIS_APP_KEY,
 *     loginName: 'lee',
 *   },
 *   tableHeaderMap: summaryScoreTableHeaderMap,
 * });
 */
export async function genSummaryData({
  date,
  groupIdList,
  secretInfo,

  extraDataMap = {},
  ignoreProjectIdList = [],

  tableHeaderMap = {},

  rumSecretList = [],
}: {
  date: number | string | Date;
  groupIdList: Array<number>;
  secretInfo: SecretInfoType;

  extraDataMap: any;
  ignoreProjectIdList: Array<string | number>;

  tableHeaderMap: Record<string, any>;

  rumSecretList?: Array<IRumSecretItem>;
}) {
  const parsedDate = timeStampFormat(new Date(date).getTime(), 'yyyyMMdd');
  const headerDate = timeStampFormat(new Date(date).getTime(), 'yyyy-MM-dd');
  const parsedPreDate = timeStampFormat(new Date(date).getTime() - 1 * 24 * 60 * 60 * 1000, 'yyyyMMdd');
  console.log('[genSummaryData] parsedDate: ', parsedDate);
  console.log('[genSummaryData] parsedPreDate: ', parsedPreDate);


  const sortKeyList = Object.keys(tableHeaderMap);
  if (!sortKeyList.length) {
    return;
  }

  const data = await getTAMSummaryScoreByGroupIdList({
    date: parsedDate,
    groupIdList,
    secretInfo,
  });

  const preData = await getTAMSummaryScoreByGroupIdList({
    date: parsedPreDate,
    groupIdList,
    secretInfo,
  });

  console.log('[genSummaryData.rumSecretList]', rumSecretList);

  if (rumSecretList?.length) {
    for (const item of rumSecretList) {
      const { rumScores, preRumScores } = await getRUMScoreList({
        secretInfo: item,
        parsedDate,
        parsedPreDate,
        date,
      });

      console.log('[genSummaryData.rumScores?.length]', rumScores?.length);

      if (rumScores) {
        data.data.push(...rumScores);
      }
      if (preRumScores) {
        preData.data.push(...preRumScores);
      }
    }
  }


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

  saveJsonToLog(parsedData, 'summary.parsed-data.json');
  saveJsonToLog(parsedPreData, 'summary.parsed-data-pre.json');

  compareTwoList(parsedData, parsedPreData, 'ProjectName');

  const tableData = getMaxAndMinIdx(parsedData);

  saveJsonToLog(tableData, 'summary.table-data.json');

  let img = '';
  try {
    img = createCanvasTable({
      data: tableData,
      headers: getTableHeaders(tableData, tableHeaderMap),
      title: `TAM日报 ${headerDate}`,
      cellWidthList: Object.values(tableHeaderMap).map(item => (item as any).tableWidth || 65),
    });
  } catch (err) {
    console.log('[genSummaryData.createCanvasTable.error]', err);
  }


  return {
    img,
    data,
  };
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
 * @param {object} options.tableHeaderMap 表格头部Map
 *
 * @param {object} options.webhookUrl 机器人回调地址
 * @param {object} options.chatId 会话Id
 *
 * @example
 * const requestSummaryScoreDate = Date.now() - 1 * 24 * 60 * 60 * 1000;
 *
 * const tamGroupIdList = [1, 2, 3];
 *
 * const summaryScoreTableHeaderMap = {
 *   ProjectName: {
 *     name: '项目名称',
 *     tableWidth: 95,
 *   },
 *   PagePv: {
 *     name: 'PV',
 *     tableWidth: 65,
 *   },
 * };
 *
 * await genSummaryDataAndSendRobot({
 *   date: requestSummaryScoreDate,
 *   groupIdList: tamGroupIdList,
 *   secretInfo: {
 *     getPwdCode,
 *     encrypt,
 *     apiKey: process.env.AEGIS_APP_KEY,
 *     loginName: 'lee',
 *   },
 *   webhookUrl: tamRobotWebhook,
 *   chatId: tamRobotChatId,
 *   tableHeaderMap: summaryScoreTableHeaderMap,
 * });
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

  rumSecretList = [],
}: {
  date: number;
  groupIdList: Array<number>;
  secretInfo: SecretInfoType;

  extraDataMap?: {};
  ignoreProjectIdList?: Array<string>;

  tableHeaderMap?: {}

  webhookUrl: string;
  chatId: string;

  rumSecretList?: Array<IRumSecretItem>;
}) {
  if (!rumSecretList.length && secretInfo.rumSecretId && secretInfo.rumSecretKey) {
    rumSecretList = [{
      rumSecretId: secretInfo.rumSecretId,
      rumSecretKey: secretInfo.rumSecretKey,
    }];
  }

  const result = await genSummaryData({
    date,
    groupIdList,
    secretInfo,

    extraDataMap,
    ignoreProjectIdList,

    tableHeaderMap,

    rumSecretList,
  });

  if (!result) return;
  const { img, data } = result;

  if (!img || !chatId) {
    return data;
  }

  await batchSendWxRobotBase64Img({
    img,
    webhookUrl,
    chatId,
  });

  return data;
}
