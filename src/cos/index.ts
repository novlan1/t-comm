/* eslint-disable @typescript-eslint/no-require-imports */
const pushFiles = ({ files, bucket, region }) => files.map(file => ({
  Bucket: bucket,
  Region: region,
  Key: file.key,
  FilePath: file.path,
}));

/**
 * COS上传
 * @param {object} config 配置信息
 * @param {Array<object>} config.files 文件列表
 * @param {string} config.files.key 文件key
 * @param {string} config.files.path 文件路径
 * @param {string} config.secretId COS secretId
 * @param {string} config.secretKey COS secretKey
 * @param {string} config.bucket COS bucket
 * @param {string} config.region COS region
 * @return {Promise<object>} 请求Promise
 *
 * @example
 *
 * uploadCOSFile({
 *   files: [{
 *     key: 'key1',
 *     path: 'path1',
 *   }, {
 *     key: 'key2',
 *     path: 'path2',
 *   }],
 *   secretId: 'xxx',
 *   secretKey: 'xxx',
 *   bucket: 'xxx',
 *   region: 'xxx',
 * })
 */
export function uploadCOSFile({
  files,
  secretId,
  secretKey,
  bucket,
  region,
}: {
  files: Array<{key: string, path: string}>
  secretId: string
  secretKey: string
  bucket: string
  region: string
}) {
  return new Promise((resolve, reject) => {
    const COS = require('cos-nodejs-sdk-v5');
    const cos = new COS({
      SecretId: secretId,
      SecretKey: secretKey,
    });
    const fileList = pushFiles({
      files,
      bucket,
      region,
    });

    cos.uploadFiles(
      {
        files: fileList,
        SliceSize: 1024 * 1024,
        onProgress(info) {
          const percent = parseInt(`${info.percent * 10000}`, 10) / 100;
          const speed = parseInt(`${(info.speed / 1024 / 1024) * 100}`, 10) / 100;
          console.log(`进度：${percent}%; 速度：${speed}Mb/s;`);
        },
        onFileFinish(err, data, options) {
          resolve(data);
          console.log(`${options.Key}上传${err ? '失败' : '完成'}`);
        },
      },
      (err, data) => {
        reject(err || data);
      },
    );
  });
}
