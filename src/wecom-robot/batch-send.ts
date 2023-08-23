import { sendWxRobotBase64Img } from './send-img';
import { sendWxRobotMsg, sendWxRobotMarkdown } from './base';
import type { Get } from '../types/common';

const SEND_TO_ALL = 'ALL';

interface ISendReq {
  chatId: string | Array<string>;
  webhookUrl: string;
}


/**
 * 根据chatId批量发送机器人消息
 * - 如果传入的chatId不是数组，会转为数组
 * - chatId 不能为空，要群发的话，可以设为 ALL
 * @param {Function} sendFn 机器人发送消息的方法，如 sendWxRobotBase64Img
 * @param {Array<string> | string} chatId 会话Id
 * @param {object} args 发送消息的其他参数
 * @ignore
 */
function batchSendRobotByChatId(sendFn: Function, chatId?: Get<ISendReq, 'chatId'>, args = {}) {
  if (!chatId) {
    console.error('Error: chatId 不能为空');
    return;
  }
  if (!Array.isArray(chatId)) {
    chatId = [chatId];
  }

  if (chatId.indexOf(SEND_TO_ALL) > -1) {
    sendFn({
      ...(args || {}),
      chatId: undefined,
    });
  } else {
    for (const id of chatId) {
      sendFn({
        ...(args || {}),
        chatId: id,
      });
    }
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
}: {
  img: string;
} & ISendReq) {
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
}: {
  content: string;
  alias: string | Array<string>;
} & ISendReq) {
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
  content: string;
  attachments?: Array<object>
} & ISendReq) {
  return batchSendRobotByChatId(sendWxRobotMarkdown, chatId, {
    content,
    attachments,
    webhookUrl,
  });
}
