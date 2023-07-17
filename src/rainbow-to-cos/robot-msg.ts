import { flatten } from '../base/list';
import { timeStampFormat } from '../time/time';
import { getCOSFilePath } from './helper/helper';
import { batchSendWxRobotMarkdown } from '../wecom-robot/batch-send';
import type { ICosInfo, ISecretInfo, ILocalConfig } from './types';

function isEqual(a: any, b: any) {
  let wrapA = a;
  let wrapB = b;
  if (typeof a !== 'string') wrapA = JSON.stringify(a);
  if (typeof a !== 'string') wrapB = JSON.stringify(b);
  return wrapA === wrapB;
}

function getAllCOSFiles({
  flatNow,
  appName,
  secretInfo,
  cosInfo,
}: {
  flatNow: Record<string, any>;
  appName: string;
  secretInfo: ISecretInfo;
  cosInfo: ICosInfo;
}) {
  const { groupName, envName } = secretInfo || {};
  const notifyList = [`>【当前七彩石配置】${appName}·${groupName}·${envName}`];

  const keys = Object.keys(flatNow);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const params = {
      appName,
      groupName,
      envName,
      key,
      valueType: flatNow[key].valueType,
      cosInfo,
    };
    notifyList.push(`${i + 1}. [${key}](${getCOSFilePath(params)})`);
  }
  return notifyList;
}

function getOnlyChangedCOSFiles({
  flatNow,
  flatOrigin,
  appName,
  secretInfo,
  cosInfo,
}: {
  flatNow: any;
  flatOrigin: any;
  appName: string;
  secretInfo: ISecretInfo;
  cosInfo: ICosInfo
}) {
  const { groupName, envName } = secretInfo || {};
  let notifyList: Array<string> = [];

  const addList: Array<string> = [];
  const updateList: Array<string> = [];
  const deleteList: Array<string> = [];

  Object.keys(flatNow).forEach((key) => {
    const params = {
      appName,
      groupName,
      envName,
      key,
      valueType: flatNow[key].valueType,
      cosInfo,
    };

    if (!flatOrigin[key]) {
      addList.push(`[${key}](${getCOSFilePath(params)})`);
    } else if (!isEqual(flatOrigin[key].value, flatNow[key].value)) {
      updateList.push(`[${key}](${getCOSFilePath(params)})`);
    }
  });

  Object.keys(flatOrigin).forEach((key) => {
    if (!flatNow[key]) {
      const params = {
        appName,
        groupName,
        envName,
        key,
        valueType: flatOrigin[key].valueType,
        cosInfo,
      };

      deleteList.push(`[${key}](${getCOSFilePath(params)})`);
    }
  });


  if (addList.length) {
    notifyList.push(`新增了：${addList.join('，')}`);
  }
  if (updateList.length) {
    notifyList.push(`更新了：${updateList.join('，')}`);
  }
  if (deleteList.length) {
    notifyList.push(`删除了：${deleteList.join('，')}`);
  }

  if (!notifyList.length) {
    return [];
  }

  notifyList = notifyList.map((value, idx) => `${idx + 1}. ${value}`);
  notifyList.unshift(`>【七彩石配置更新】${appName}·${groupName}·${envName}`);
  notifyList.push(`${timeStampFormat(Date.now(), 'yyyy-MM-dd: hh:mm:ss')}`);
  return notifyList;
}

function genRobotMsg({
  newConfig,
  originConfig,
  secretInfo,
  appName,
  cosInfo,
  isGenAll = false,
}: {
  newConfig: ILocalConfig;
  originConfig: ILocalConfig;
  secretInfo: ISecretInfo;
  appName: string;
  cosInfo: ICosInfo;
  isGenAll?: boolean;
}) {
  const flatNow = flatten(newConfig, 'key');
  const flatOrigin = flatten(originConfig, 'key');
  let notifyList: Array<string> = [];
  if (isGenAll) {
    notifyList = getAllCOSFiles({
      flatNow,
      appName,
      secretInfo,
      cosInfo,
    });
  } else {
    notifyList = getOnlyChangedCOSFiles({
      flatNow,
      flatOrigin,
      appName,
      secretInfo,
      cosInfo,
    });
  }

  return notifyList.join('\n');
}


export async function sendRainbowInfoToRobot({
  newConfig,
  originConfig,
  secretInfo,
  cosInfo,

  appName,
  isGenAll = false,

  chatId,
  webhookUrl,
}: {
  newConfig: ILocalConfig;
  originConfig: ILocalConfig;
  secretInfo: ISecretInfo;
  cosInfo: ICosInfo;

  appName: string;
  isGenAll?: boolean;

  chatId: string;
  webhookUrl: string;
}) {
  const chatContent = genRobotMsg({
    newConfig,
    originConfig,
    secretInfo,
    appName,
    cosInfo,
    isGenAll,
  });

  if (!chatContent) {
    console.log('[sendRainbowInfoToRobot] Error: chatContent 为空');
    return;
  }

  try {
    await batchSendWxRobotMarkdown({
      chatId,
      content: chatContent,
      webhookUrl,
    });
  } catch (err) {
    console.log('[sendRainbowInfoToRobot] err: \n', err);
  }
}
