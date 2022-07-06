import { sendWxRobotImg } from './base'
import { saveBase64ImgToFile, getImgMd5 } from '../node-img'

/**
 * 发送企业微信机器人base64图片，其实就是先保存到本地，然后生成md5，最后发送
 * @param param0
 * @returns
 */
export async function sendWxRobotBase64Img({
  img,
  chatId,
  webhookUrl,

  path,
  fs,
  crypto,
}) {
  if (!chatId || !img || !path || !webhookUrl || !fs) return

  const saveFilePath = path.resolve(__dirname, '.temp.png')

  const pureSrc = await saveBase64ImgToFile({
    imgUrl: img,
    fs,
    savePath: saveFilePath,
  })

  const md5Val = await getImgMd5({
    fs,
    crypto,
    savePath: saveFilePath,
  })

  sendWxRobotImg({
    webhookUrl,
    chatId,
    content: pureSrc,
    md5Val,
  })
    .then(() => {})
    .catch(e => {
      console.log('e', e)
    })
}
