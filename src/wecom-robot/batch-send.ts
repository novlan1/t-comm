import { sendWxRobotBase64Img } from './send-img';
import { sendWxRobotMsg, sendWxRobotMarkdown } from './base';

/**
 * 根据chatId批量发送机器人消息
 * - 如果传入的chatId不是数组，会转为数组
 * - chatId 不能为空，要群发的话，可以设为 ALL
 * @param {Function} sendFn 机器人发送消息的方法，如 sendWxRobotBase64Img
 * @param {Array<string> | string} chatId 会话Id
 * @param {object} args 发送消息的其他参数
 * @ignore
 */
function batchSendRobotByChatId(sendFn, chatId, args = {}) {
  if (!chatId) {
    console.error('Error: chatId 不能为空');
    return;
  }
  if (!Array.isArray(chatId)) {
    chatId = [chatId];
  }

  for (const id of chatId) {
    const chatId = id === 'ALL' ? undefined : id;
    sendFn({
      ...(args || {}),
      chatId,
    });
  }
}


/**
 * 批量发送企业微信机器人base64图片
 * @param {object} config 配置信息
 * @param {string} config.img base64图片
 * @param {string} config.chatId 会话Id
 * @param {string} config.webhookUrl webhook地址
 * @returns {Promise<object>} 请求Promise
 * @example
 *
 * batchSendWxRobotBase64Img({
 *   img: 'xxx',
 *   chatId: 'xxx', // or ['xxx], or ['ALL'], or 'ALL'
 *   webhookUrl: 'xxx',
 * }).then(() => {
 *
 * })
 *
 */
export function batchSendWxRobotBase64Img({
  img,
  chatId,
  webhookUrl,
}) {
  return batchSendRobotByChatId(sendWxRobotBase64Img, chatId, {
    img,
    webhookUrl,
  });
}


export function batchSendWxRobotMsg({
  content,
  alias,
  chatId,
  webhookUrl,
}) {
  return batchSendRobotByChatId(sendWxRobotMsg, chatId, {
    content,
    alias,
    webhookUrl,
  });
}


export function batchSendWxRobotMarkdown({
  content,
  attachments,
  chatId,
  webhookUrl,
}: {
  webhookUrl: string
  content: string
  chatId?: string
  attachments?: Array<object>
}) {
  return batchSendRobotByChatId(sendWxRobotMarkdown, chatId, {
    content,
    attachments,
    webhookUrl,
  });
}
