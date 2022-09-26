/**
 * node环境下，保存base64图片到文件
 *
 * @example
 * ```ts
 * saveBase64ImgToFile({
 *   fs: require('fs'),
 *   imgUrl: 'xx',
 *   savePath: './test.png'
 * })
 * ```
 */
export function saveBase64ImgToFile({ fs, imgUrl, savePath }) {
  const base64Data = imgUrl.replace(/^data:image\/\w+;base64,/, '');
  const dataBuffer = Buffer.from(base64Data, 'base64');

  return new Promise((resolve, reject) => {
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
 *
 * @example
 * ```ts
 * turnLocalImg2Base64(
 *   fs: require('fs'),
 *   imgPath: 'xx',
 * )
 * ```
 */
export function turnLocalImg2Base64(fs, imgPath) {
  const bitmap = fs.readFileSync(imgPath);

  // base64编码
  const base64str = Buffer.from(bitmap, 'binary').toString('base64');

  return base64str;
}

/**
 * node环境下，保存网络图片到本地
 *
 * @example
 * ```ts
 * saveRemoteImgToLocal({
 *   fs: require('fs'),
 *   request: require('request'),
 *   imgUrl: 'xx',
 *   savePath: './test.png'
 * })
 * ```
 */
export async function saveRemoteImgToLocal({ fs, request, imgUrl, savePath }) {
  await request(imgUrl).pipe(fs.createWriteStream(savePath));
}

/**
 * 获取图片md5
 *
 * @example
 * ```ts
 * getImgMd5({
 *  fs: require('fs'),
 *  crypto: require('crypto'),
 *  savePath: './test.png'
 * })
 * ```
 */
export function getImgMd5({ fs, crypto, savePath }) {
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
