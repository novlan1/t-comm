import { getHistoryModeConfigDiff } from './api';
import type { ISecretInfo, IAddedMap } from './type';
import { batchSendWxRobotMarkdown } from '../wecom-robot/batch-send';


export async function getHistoryModeConfigDiffAndSendRobot({
  secretInfo,
  appName,
  key,

  chatId,
  webhookUrl,
  mentions,
}: {
  secretInfo: ISecretInfo;
  appName: string;
  key: string;

  chatId?: string | string[];
  webhookUrl?: string;
  mentions?: Array<string>;
}) {
  const res = await getHistoryModeConfigDiff({
    secretInfo,
    appName,
    key,
  });
  const { equal, addedMap, deletedMap  } = res;

  if (equal) {
    return {
      message: '',
      equal,
      addedMap,
      deletedMap,
    };
  }

  const message = genMessage({
    addedMap,
    deletedMap,
    mentions,
  });

  try {
    if (chatId && webhookUrl) {
      batchSendWxRobotMarkdown({
        chatId,
        content: message,
        webhookUrl,
      });
    }
  } catch (err) {
    console.log('[sendRainbowInfoToRobot] err: \n', err);
  }

  return {
    message,
    equal,
    addedMap,
    deletedMap,
  };
}


function genMessage({
  addedMap,
  deletedMap,
  mentions,
}: {
  addedMap: IAddedMap;
  deletedMap: IAddedMap;
  mentions?: Array<string>;
}) {
  const mentionStr = mentions?.map(item => `<@${item}>`)?.join('') || '';
  const result = [`> ⚠️ 【History 模式错误更新可能导致所有项目白屏，请关注变更并二次确认】${mentionStr}`];

  Object.keys(addedMap).forEach((domain) => {
    const list = addedMap[domain].map(item => `\`${item}\``);
    if (list.length) {
      result.push(`- ${domain} 新增: ${list.join('、')}`);
    }
  });

  Object.keys(deletedMap).forEach((domain) => {
    const list = deletedMap[domain].map(item => `\`${item}\``);
    if (list.length) {
      result.push(`- ${domain} 删除: ${list.join('、')}`);
    }
  });
  return result.join('\n');
}
