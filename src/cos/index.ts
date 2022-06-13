const pushFiles = ({ files, bucket, region }) =>
  files.map(file => ({
    Bucket: bucket,
    Region: region,
    Key: file.key,
    FilePath: file.path,
  }))

/**
 * COS上传
 * @param config - files\secretId\secretKey\COS\bucket\region
 * @param COS - require('cos-nodejs-sdk-v5')
 */
export const uploadCOSFile = function ({
  files,
  secretId,
  secretKey,
  COS,
  bucket,
  region,
}) {
  const cos = new COS({
    SecretId: secretId,
    SecretKey: secretKey,
  })
  const fileList = pushFiles({
    files,
    bucket,
    region,
  })

  return new Promise((resolve, reject) => {
    cos.uploadFiles(
      {
        files: fileList,
        SliceSize: 1024 * 1024,
        onProgress(info) {
          const percent = parseInt(`${info.percent * 10000}`, 10) / 100
          const speed =
            parseInt(`${(info.speed / 1024 / 1024) * 100}`, 10) / 100
          console.log(`进度：${percent}%; 速度：${speed}Mb/s;`)
        },
        onFileFinish(err, data, options) {
          resolve(data)
          console.log('err', err)
          console.log(`${options.Key}上传${err ? '失败' : '完成'}`)
        },
      },
      (err, data) => {
        reject()
        console.log('err', err)
        console.log('upload res -> ', err || data)
      },
    )
  })
}
