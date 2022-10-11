import { getSummaryScoreByGroupIdList } from '../api/summary-score';
import { parseSummaryScore, getTableHeaders } from '../parse';
import { compareTwoList, getMaxAndMinIdx } from '../../base/list';
import { createCanvasTable } from '../../canvas/table';
import { timeStampFormat } from '../../date/time';
import { sendWxRobotBase64Img } from '../../wecom-robot/send-img';


/**
 * 生成TAM汇总数据图
 */
export async function genSummaryData({
  date,
  groupIdList,
  secretInfo,

  extraDataMap = {},
  ignoreProjectIdList = [],
  sortKeyList = [],

  tableHeaderMap = {},
}) {
  const parsedDate = timeStampFormat(new Date(date).getTime(), 'yyyyMMdd');
  const headerDate = timeStampFormat(new Date(date).getTime(), 'yyyy-MM-dd');
  const parsedPreDate = timeStampFormat(new Date(date).getTime() - 1 * 24 * 60 * 60 * 1000, 'yyyyMMdd');
  console.log('parsedDate: ', parsedDate);
  console.log('parsedPreDate: ', parsedPreDate);

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
    cellWidthList: [
      95,
      65,
      65,
      65,
      65,
      65,
      65,
      65,
      65,
      65,
      65,
      65,
      65,
      65,
      65,
      65,
    ],
  });

  return img;
}

/**
 * 生成TAM汇总数据并发送到机器人
 * @param {object} options 配置信息
 */
export async function genSummaryDataAndSendRobot({
  date,
  groupIdList,
  secretInfo,

  extraDataMap = {},
  sortKeyList = [],
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
    sortKeyList,
    ignoreProjectIdList,

    tableHeaderMap,
  });

  await sendWxRobotBase64Img({
    img,
    webhookUrl,
    chatId,
  });
}
