/* eslint-disable @typescript-eslint/no-require-imports */
import { getImgMd5, saveBase64ImgToFile } from '../node-img';

import { sendWxRobotImg } from './base';

/**
 * 发送企业微信机器人base64图片，其实就是先保存到本地，然后生成md5，最后发送
 * @param {object} config 配置信息
 * @param {string} config.img base64图片
 * @param {string} config.chatId 会话Id
 * @param {string} config.webhookUrl webhook地址
 * @returns {Promise<object>} 请求Promise
 * @example
 *
 * sendWxRobotBase64Img({
 *   img: 'xxx',
 *   chatId: 'xxx',
 *   webhookUrl: 'xxx',
 * }).then(() => {
 *
 * })
 *
 */
export async function sendWxRobotBase64Img({
  img,
  chatId,
  webhookUrl,
}: {
  img: string
  chatId: string
  webhookUrl: string
}): Promise<object> {
  const path = require('path');
  if (!img || !webhookUrl) return Promise.reject('参数不全');

  const saveFilePath = path.resolve(__dirname, '.temp.png');

  const pureSrc = await saveBase64ImgToFile({
    imgUrl: img,
    savePath: saveFilePath,
  });

  const md5Val = await getImgMd5({
    savePath: saveFilePath,
  });

  return await sendWxRobotImg({
    webhookUrl,
    chatId,
    content: pureSrc,
    md5Val,
  });
}
