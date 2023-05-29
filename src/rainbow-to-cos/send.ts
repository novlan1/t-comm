import { fetchLatestRainbowData } from './api';
import { syncRainbowToCOS } from './sync-to-cos';
import { sendRainbowInfoToRobot } from './robot-msg';

import type { ISecretInfo, ICosInfo } from './types';
import { SendToRobotTypeMap } from './config';

/**
 * 监听rainbow，同步到cos，并发送到机器人
 * @param {object} options 配置
 * @param {object} options.rainbowSecretInfo 七彩石密钥信息
 * @param {object} options.cosInfo 腾讯云信息
 * @param {string} options.appName 七彩石项目名称
 *
 * @param {string} options.webhookUrl 机器人回调
 * @param {string} options.chatId 会话id
 * @param {0|1|2} options.sendToRobotType 发送机器人类型，0 不发送，1 发送变化的部分，2 全部发送
 *
 * @example
 *
 * await watchRainbowToCosAndSendRobot({
 *   rainbowSecretInfo: {
 *     appID: RAINBOW_OPEN_APP_ID,
 *     userID: RAINBOW_OPEN_YGW_USER_ID,
 *     secretKey: RAINBOW_OPEN_YGW_SECRET_KEY,
 *     envName: 'Default',
 *     groupName: 'group',
 *   },
 *   appName: 'configApp',
 *   cosInfo: {
 *     secretId,
 *     secretKey,
 *     bucket: 'bucket',
 *     region: 'ap-guangzhou',
 *     dir: 'rb',
 *   },
 *   webhookUrl: 'xxx',
 *   chatId: 'xxx',
 *   sendToRobotType: 1,
 * });
 *
 */
export async function watchRainbowToCosAndSendRobot({
  rainbowSecretInfo: secretInfo,
  cosInfo,

  appName,

  webhookUrl,
  chatId,
  sendToRobotType = SendToRobotTypeMap.NO_SEND,
}: {
  rainbowSecretInfo: ISecretInfo;
  cosInfo: ICosInfo;

  appName: string;

  webhookUrl: string;
  chatId: string;
  sendToRobotType?: (typeof SendToRobotTypeMap)[keyof typeof SendToRobotTypeMap];
}) {
  const {
    config,
    originConfig,
    equal,
  } = await fetchLatestRainbowData({
    secretInfo,
    appName,
  });

  if (!equal) {
    await syncRainbowToCOS({
      configList: config,
      secretInfo,
      appName,
      cosInfo,
    });
  }

  if (!sendToRobotType) {
    return;
  }

  await sendRainbowInfoToRobot({
    newConfig: config,
    originConfig,
    secretInfo,
    cosInfo,
    appName,

    webhookUrl,
    chatId,
    isGenAll: sendToRobotType === 2,
  });
}
