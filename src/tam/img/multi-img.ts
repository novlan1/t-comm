import { genCustomEventImg } from './custom-event-img';
import { genSummaryData } from './summary-img';
import { mergeMultiCanvasPic } from '../../canvas/multi-img';
import { batchSendWxRobotBase64Img } from '../../wecom-robot/batch-send';


/**
 * 生成多个图片并发送机器人
 * @param {object} options 配置
 *
 * @example
 *
 * const requestMultiImgDate = Date.now() - 1 * 24 * 60 * 60 * 1000;
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
 * await genMultiImgAndSendRobot({
 *   date: requestMultiImgDate,
 *   secretInfo: {
 *     getPwdCode,
 *     encrypt,
 *     apiKey: process.env.AEGIS_APP_KEY,
 *     loginName: 'lee',
 *   },
 *   webhookUrl: tamRobotWebhook,
 *   chatId: tamRobotChatId,
 *
 *   groupIdList: tamGroupIdList,
 *   eventProjectIdMap: eventProjectMap,
 *   tableHeaderMap: summaryScoreTableHeaderMap,
 *
 *   eventMap,
 *   eventTableHeaderMap,
 * });
 *
 *
 */
export async function genMultiImgAndSendRobot({
  date,
  groupIdList,
  secretInfo,

  extraDataMap = {},
  ignoreProjectIdList = [],

  tableHeaderMap = {},

  webhookUrl,
  chatId,

  env = 'production',
  eventMap,
  eventProjectIdMap,
  eventTableHeaderMap,
}) {
  const result = await genSummaryData({
    date,
    groupIdList,
    secretInfo,

    extraDataMap,
    ignoreProjectIdList,

    tableHeaderMap,
  });

  if (!result) return;
  const { img: summaryScoreImg, data } = result;

  const launchGameImg = await genCustomEventImg({
    date,
    projectIdMap: eventProjectIdMap,
    env,
    secretInfo,

    eventMap,
    tableHeaderMap: eventTableHeaderMap,
  });

  const img = await mergeMultiCanvasPic({
    imgs: [
      summaryScoreImg,
      launchGameImg,
    ],
  });

  if (!img || !chatId) {
    return;
  }

  await batchSendWxRobotBase64Img({
    img,
    webhookUrl,
    chatId,
  });

  return data;
}

