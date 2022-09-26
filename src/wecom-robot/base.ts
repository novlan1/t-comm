/**
 * @module wecom-robot/base
 */

import { sendToRobot } from './helper'

/**
 * 给机器人发送普通消息
 * @param config - { webhookUrl, chatId, alias, content }
 * @returns Promise
 */
export function sendWxRobotMsg({ webhookUrl, chatId, alias, content }) {
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
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 给机器人发送Markdown消息
 * @param config - { webhookUrl, chatId, content, attachments }
 * @returns
 */
export function sendWxRobotMarkdown({
  webhookUrl,
  chatId,
  content,
  attachments,
}) {
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
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 给机器人发送图片
 * @param config - { webhookUrl, chatId, content, md5Val }
 * @returns
 */
export async function sendWxRobotImg({ webhookUrl, chatId, content, md5Val }) {
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
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
