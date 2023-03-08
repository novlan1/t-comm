import { getWeatherRobotContent } from './weather';
import { batchSendWxRobotMarkdown } from '../wecom-robot/batch-send';

/**
 * 获取天气信息并发送
 * @param {object} options 配置
 * @param {string} options.webhookUrl 机器人hook地址
 * @param {string} [options.chatId] 会话Id
 * @param {string} [options.force] 是否在和之前获取数据相同时，也发送
 * @returns {Promise<Object>} 请求Promise
 */
export async function sendWeatherRobotMsg({
  webhookUrl,
  chatId,
  force = false,
}) {
  const { content, isSame } = await getWeatherRobotContent();

  console.log('[sendWeatherRobotMsg] 天气是否有变化: ', !isSame);

  if (!isSame || force) {
    return batchSendWxRobotMarkdown({
      webhookUrl,
      chatId,
      content,
    });
  }
}
