/* eslint-disable @typescript-eslint/no-require-imports */
import { formatBite } from '../../util/format-bite';

export function getCOSInstance(secretId: string, secretKey: string) {
  const COS = require('cos-nodejs-sdk-v5');
  const cos = new COS({
    SecretId: secretId,
    SecretKey: secretKey,
  });
  return cos;
}

export function onUploadCOSProgress(info: {
  percent: number;
  speed: number;
  total: number;
  loaded: number;
}) {
  const percent = parseInt(`${info.percent * 10000}`, 10) / 100;
  const speed = formatBite(info.speed || 0);
  const total = formatBite(info.total || 0);
  const loaded = formatBite(info.loaded || 0);

  console.log(`[uploadCOSFile] 总共：${total}，已上传：${loaded}，进度：${percent}%，速度：${speed}/s;`);
}
