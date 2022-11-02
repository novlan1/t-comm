// eslint-disable-next-line @typescript-eslint/no-require-imports
const axios = require('axios');
const WECOM_ROBOT_PREFIX = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=';

/**
 * 给机器人发消息的基本方法
 * @private
 * @param {object} config 输入信息
 * @param {string} config.webhookUrl webhook地址
 * @param {object} config.params 详细参数
 * @returns Promise
 */
export function sendToRobot({ webhookUrl, params }: {
  webhookUrl: string
  params: {
    msgtype: string
    chatid?: string
    markdown?: {
      content: string,
      attachments?: Array<object>,
      at_short_name?: boolean
    }
    image?: {
      base64: string
      md5: string
    }
    text?: {
      content: string
      mentioned_list?: Array<string | undefined>
    }
  }
}): Promise<object> {
  return new Promise((resolve, reject) => {
    if (!webhookUrl) {
      reject(new Error('缺少webhookUrl！'));
      return;
    }

    if (!webhookUrl.startsWith('http')) {
      webhookUrl = `${WECOM_ROBOT_PREFIX}${webhookUrl}`;
    }

    axios
      .post(webhookUrl, params)
      .then((res) => {
        if (res?.data?.errcode !== 0) {
          console.log('sendToRobot.err: \n', res?.data);
          reject(res);
        } else {
          resolve(res);
        }
      })
      .catch((err) => {
        console.log('sendToRobot.err: \n', err?.data);
        reject(err);
      });
  });
}
