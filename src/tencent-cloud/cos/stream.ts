import * as fs from 'fs';

import { getCOSInstance, onUploadCOSProgress } from './helper';


export function uploadCOSStreamFile({
  file,
  key,

  secretId,
  secretKey,
  bucket,
  region,
}: {
  secretId: string;
  secretKey: string;
  bucket: string;
  region: string;

  file: {
    path: string;
    size: number;
  };
  key: string;

}) {
  return new Promise((resolve, reject) => {
    const cos = getCOSInstance(secretId, secretKey);
    const reader = fs.createReadStream(file.path);
    cos.putObject({
      Bucket: bucket, /* 填入您自己的存储桶，必须字段 */
      Region: region,  /* 存储桶所在地域，例如 ap-beijing，必须字段 */
      Key: key,  /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
      StorageClass: 'STANDARD',
      Body: reader, // 上传文件对象
      ContentLength: file.size,
      Headers: {
        'x-cos-traffic-limit': 819200, // 限速值设置范围为819200 - 838860800，即100KB/s - 100MB/s，如果超出该范围将返回400错误。
      },
      onProgress: onUploadCOSProgress,
    }, (err: unknown, data: unknown) => {
      if (data) {
        resolve(data);
        return;
      }

      reject(err);
    });
  });
}
