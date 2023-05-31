import { parseEslintError } from './parse';
import { genRobotMsg } from './robot-msg';
import { batchSendWxRobotMarkdown } from '../wecom-robot/batch-send';

import type { RepoConfigType } from './types';


export function parseEslintAndSendRobot({
  mrId,
  mrUrl,
  lintReportFile,
  repoConfig,
  robotInfo,
}: {
  mrId: string | number
  mrUrl: string
  lintReportFile: string
  repoConfig: RepoConfigType
  robotInfo: {
    webhookUrl: string
    chatId: string
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

  console.log('[parseEslintAndSendRobot] total: ', total);

  if (!total) return;

  const robotMsg = genRobotMsg({
    mrId,
    mrUrl,

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
