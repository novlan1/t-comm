import { timeStampFormat } from '../time/time';

import { batchSendWxRobotMarkdown } from '../wecom-robot/batch-send';

import { getOpenSourceReport } from './api';
import { parseOpenSourceReport } from './parse';

import type { IReportArr, IRequestInfo, ISearchInfo } from './types';

const MAX_SHOW_LINK_NAME = 12;


/**
 * 请求开源治理数据并发送
 * @param options 配置信息
 */
export async function sendOpenSourceReport({
  date,
  chatId,
  webhookUrl,
  requestInfo,
  searchInfo,
  maxShowLinkNum = MAX_SHOW_LINK_NAME,
  whiteList = [],
  filterOrgPath = '',
}: {
  date: string | number | Date;
  chatId: string;
  webhookUrl: string;

  requestInfo: IRequestInfo;
  searchInfo: ISearchInfo;
  maxShowLinkNum?: number;
  whiteList?: Array<string>;
  filterOrgPath?: string;
}) {
  const time = timeStampFormat(new Date(date).getTime(), 'yyyyMMdd');
  const formattedDate = timeStampFormat(new Date(date).getTime(), 'yyyy-MM-dd');

  const reportArr: IReportArr = await getOpenSourceReport({
    time,
    ...(requestInfo || {}),
  });

  const chatContent = parseOpenSourceReport({
    reportArr,
    date: time,
    formattedDate,
    requestInfo,
    searchInfo,
    maxShowLinkNum,
    whiteList,
    filterOrgPath,
  });

  if (!chatContent) return;

  try {
    await batchSendWxRobotMarkdown({
      chatId,
      content: chatContent,
      webhookUrl,
    });
  } catch (err) {
    console.log('[sendOpenSourceReport] err', err);
  }
}

