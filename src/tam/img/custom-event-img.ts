import { getMultiCustomEventData } from '../api/custom-event';
import { parseMultiCustomEvent, getTableHeaders } from '../parse';
import { createCanvasTable } from '../../canvas/table';
import { compareTwoList, getMaxAndMinIdx } from '../../base/list';
import { getSomeDayStartTimeStamp, getSomeDayEndTimeStamp, timeStampFormat } from '../../date';
import { sendWxRobotBase64Img } from '../../wecom-robot/send-img';


/**
 * 获取自定义事件图片
 * @param options 配置信息
 * @returns 图片url
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
 * @param options 配置信息
 * @returns 图片url
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
}) {
  const img = await genCustomEventImg({
    date,
    projectIdMap,
    env,
    secretInfo,

    eventMap,
    tableHeaderMap,
  });

  if (!img) {
    return;
  }

  await sendWxRobotBase64Img({
    img,
    webhookUrl,
    chatId,
  });
}
