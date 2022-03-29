const axios = require('axios')

export function sendToRobot({ webhookUrl, params }): any {
  return new Promise((resolve, reject) => {
    if (!webhookUrl) {
      reject(new Error('缺少webhookUrl！'))
      return
    }

    if (!webhookUrl.startsWith('http') && !webhookUrl.startsWith('https')) {
      reject()
      return
    }

    if (!params.chatid) {
      reject(new Error('缺少chatId，不允许群发！'))
      return
    }

    axios
      .post(webhookUrl, params)
      .then(res => {
        if (res?.data?.errcode !== 0) {
          reject(res)
        } else {
          resolve(res)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}
