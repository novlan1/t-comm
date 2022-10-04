/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * node环境下，保存base64图片到文件
 * @param {object} config 输入配置
 * @param {string} config.imgUrl base64图片Url
 * @param {string} config.savePath 保存路径，最好是绝对路径
 * @returns {Promise<string>} 去掉前缀的base64图片地址
 *
 * @example
 *
 * saveBase64ImgToFile({
 *   imgUrl: 'xx',
 *   savePath: '/test.png'
 * }).then((base64Data) => {
 *   console.log(base64Data)
 * })
 *
 */
export function saveBase64ImgToFile({ imgUrl, savePath }: {
  imgUrl: string
  savePath: string
}): Promise<string> {
  return new Promise((resolve, reject) => {
    const fs = require('fs');
    const base64Data = imgUrl.replace(/^data:image\/\w+;base64,/, '');
    const dataBuffer = Buffer.from(base64Data, 'base64');

    fs.writeFile(savePath, dataBuffer, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(base64Data);
      }
    });
  });
}

/**
 * node环境下，本地图片转为base64
 * @param {string} savePath 本地图片保存路径
 * @returns {string} base64图片地址
 *
 * @example
 *
 * const base64str = turnLocalImg2Base64('/temp.png')
 *
 */
export function turnLocalImg2Base64(imgPath) {
  const fs = require('fs');
  const bitmap = fs.readFileSync(imgPath);

  // base64编码
  const base64str = Buffer.from(bitmap, 'binary').toString('base64');

  return base64str;
}

/**
 * node环境下，保存网络图片到本地
 * @param {object} config 输入配置
 * @param {string} config.imgUrl 网络图片地址
 * @param {string} config.savePath 本地图片保存路径，建议绝对路径
 * @returns {Promise<object>} 请求Promise
 *
 * @example
 *
 * saveRemoteImgToLocal({
 *   imgUrl: 'xx',
 *   savePath: './test.png'
 * }).then(() => {
 *
 * })
 */
export async function saveRemoteImgToLocal({ imgUrl, savePath }: {
  imgUrl: string
  savePath: string
}): Promise<object> {
  const fs = require('fs');
  const request = require('request');
  return await request(imgUrl).pipe(fs.createWriteStream(savePath));
}

/**
 * 获取图片md5
 * @param {object} options 配置信息
 * @param {string} options.savePath 本地图片地址，建议绝对路径
 * @returns {Promise<string>} 图片md5值
 *
 * @example
 * getImgMd5({
 *  savePath: '/test.png'
 * }).then(md5 => {
 *   console.log(md5)
 * })
 * ```
 */
export function getImgMd5({ savePath }: {
  savePath: string
}): Promise<string> {
  const fs = require('fs');
  const crypto = require('crypto');

  return new Promise((resolve, reject) => {
    fs.readFile(savePath, (err, data) => {
      if (err) {
        reject();
      }
      const md5Value = crypto
        .createHash('md5')
        .update(data, 'utf8')
        .digest('hex');
      resolve(md5Value);
    });
  });
}
