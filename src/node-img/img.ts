/**
 * node环境下，保存base64图片到文件
 */
export function saveBase64ImgToFile({ imgUrl, savePath, fs }) {
  const base64Data = imgUrl.replace(/^data:image\/\w+;base64,/, '')
  const dataBuffer = Buffer.from(base64Data, 'base64')

  return new Promise((resolve, reject) => {
    fs.writeFile(savePath, dataBuffer, err => {
      if (err) {
        reject(err)
      } else {
        resolve(base64Data)
      }
    })
  })
}

/**
 * node环境下，本地图片转为base64
 */
export function turnLocalImg2Base64(fs, imgPath) {
  const bitmap = fs.readFileSync(imgPath)

  // base64编码
  const base64str = Buffer.from(bitmap, 'binary').toString('base64')

  return base64str
}

/**
 * node环境下，保存网络图片到本地
 */
export async function saveRemoteImgToLocal({ fs, request, imgUrl, savePath }) {
  await request(imgUrl).pipe(fs.createWriteStream(savePath))
}

/**
 * 获取图片md5
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
        reject()
      }
      const md5Value = crypto
        .createHash('md5')
        .update(data, 'utf8')
        .digest('hex')
      resolve(md5Value)
    })
  })
}
