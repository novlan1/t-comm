import { sendToRobot } from './helper';

/**
 * 给机器人发送普通消息
 * @param {Object} config 配置内容
 * @param {string} config.webhookUrl - 钩子链接
 * @param {string} config.chatId - 会话id
 * @param {string} config.alias - 别名
 * @param {string} config.content - 内容
 * @returns {Promise<object>} Promise
 *
 * @example
 *
 * sendWxRobotMsg({
 *   webhookUrl: 'xxx',
 *   chatId: 'xxx',
 *   content: 'xxx',
 *   alias: 'xxx',
 * }).then(() => {
 *
 * })
 */
export function sendWxRobotMsg({ webhookUrl, chatId, alias, content }: {
  webhookUrl: string
  content: string
  chatId?: string
  alias?: string
}): Promise<object> {
  return new Promise((resolve, reject) => {
    sendToRobot({
      webhookUrl,
      params: {
        chatid: chatId,
        msgtype: 'text',
        text: {
          content,
          mentioned_list: [alias],
        },
      },
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * 给机器人发送Markdown消息
 * @param {Object} config 配置内容
 * @param {string} config.webhookUrl - 钩子链接
 * @param {string} config.chatId - 会话id
 * @param {string} config.content - 内容
 * @param {Array<object>} config.attachments - 附加内容
 * @returns {Promise<object>} 请求Promise
 * @example
 *
 * sendWxRobotMarkdown({
 *   webhookUrl: 'xxx',
 *   chatId: 'xxx',
 *   content: 'xxx',
 *   attachments: []
 * }).then(() => {
 *
 * })
 */
export function sendWxRobotMarkdown({
  webhookUrl,
  chatId,
  content,
  attachments,
}: {
  webhookUrl: string
  content: string
  chatId?: string
  attachments?: Array<object>
}): Promise<object> {
  return new Promise((resolve, reject) => {
    sendToRobot({
      webhookUrl,
      params: {
        chatid: chatId,
        msgtype: 'markdown',
        markdown: {
          content,
          attachments,
          at_short_name: true,
        },
      },
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * 给机器人发送图片
 * @param {Object} config 配置参数
 * @param {string} config.webhookUrl 钩子链接
 * @param {string} config.chatId 会话id
 * @param {string} config.content 内容
 * @param {string} config.md5Val md5内容
 * @returns {Promise<object>} 请求Promise
 *
 * @example
 *
 * sendWxRobotImg({
 *   webhookUrl: 'xxx',
 *   chatId: 'xxx',
 *   content: 'xxx',
 *   md5Val: 'xxx'
 * }).then(() => {
 *
 * })
 */
export async function sendWxRobotImg({ webhookUrl, chatId, content, md5Val }: {
  webhookUrl: string
  content: string
  md5Val: string
  chatId?: string
}): Promise<object> {
  return new Promise((resolve, reject) => {
    sendToRobot({
      webhookUrl,
      params: {
        chatid: chatId,
        msgtype: 'image',
        image: {
          base64: content,
          md5: md5Val,
        },
      },
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err: any) => {
        console.log('sendWxRobotImg.err:\n ', err?.data);
        reject(err);
      });
  });
}
