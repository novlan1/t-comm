import { sendToRobot } from './helper'

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
