import { genCustomEventImg } from './custom-event-img';
import { genSummaryData } from './summary-img';
import { mergeMultiCanvasPic } from '../../canvas/multi-img';
import { sendWxRobotBase64Img } from '../../wecom-robot/send-img';


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
  const summaryScoreImg = await genSummaryData({
    date,
    groupIdList,
    secretInfo,

    extraDataMap,
    ignoreProjectIdList,

    tableHeaderMap,
  });

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

