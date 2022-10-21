import { parseEslintError } from './parse';
import { genRobotMsg } from './robot-msg';
import { batchSendWxRobotMarkdown } from '../wecom-robot/batch-send';

import { RepoConfigType } from './type';


export function parseEslintAndSendRobot({
  mrId,
  lintReportFile,
  repoConfig,
  robotInfo,
}: {
  mrId: string | number
  lintReportFile: string
  repoConfig: RepoConfigType
  robotInfo: {
    webhookUrl: string
    chatId: string | undefined
  }
}) {
  const {
    webhookUrl,
    chatId,
  } = robotInfo;

  const {
    errorMap,
    total,
  } = parseEslintError({
    lintReportFile,
  });

  const robotMsg = genRobotMsg({
    mrId,

    errorMap,
    total,

    repoConfig,
  });

  if (webhookUrl) {
    return batchSendWxRobotMarkdown({
      webhookUrl,
      chatId,
      content: robotMsg,
    });
  }
}
