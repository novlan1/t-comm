import { fetchLatestRainbowData } from './api';
import { syncRainbowToCOS } from './sync-to-cos';
import { sendRainbowInfoToRobot } from './robot-msg';

export async function watchRainbowToCosAndSendRobot({
  rainbowSecretInfo: secretInfo,
  cosInfo,

  appName,

  webhookUrl,
  chatId,
  sendToRobotType = 0, // 0 不发送，1 发送变化的部分，2 全部发送
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
