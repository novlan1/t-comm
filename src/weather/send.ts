import { getWeatherRobotContent } from './weather';
import { sendWxRobotMarkdown } from '../wecom-robot/base';

/**
 * 获取天气信息并发送
 * @param {object} options 配置
 * @param {string} options.webhookUrl 机器人hook地址
 * @param {string} [options.chatId] 会话Id
 * @param {string} [options.force] 是否在和之前获取数据相同时，也发送
 * @returns
 */
export async function sendWeatherRobotMsg({
  webhookUrl,
  chatId,
  force = false,
}) {
  const { content, isSame } = await getWeatherRobotContent();
  if (!isSame || force) {
    return sendWxRobotMarkdown({
      webhookUrl,
      chatId,
      content,
    });
  }
}
