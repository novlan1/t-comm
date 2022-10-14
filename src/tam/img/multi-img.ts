import { genCustomEventImg } from './custom-event-img';
import { genSummaryData } from './summary-img';
import { mergeMultiCanvasPic } from '../../canvas/multi-img';
import { batchSendWxRobotBase64Img } from '../../wecom-robot/batch-send';


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

  await batchSendWxRobotBase64Img({
    img,
    webhookUrl,
    chatId,
  });
}

