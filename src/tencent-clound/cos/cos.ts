import { getCOSInstance, onUploadCOSProgress } from './helper';
import type { ICosMeta } from './types';

const pushFiles = ({
  files,
  bucket,
  region,
}: {
  files: Array<{
    key: string;
    path: string;
  }>
  bucket: string;
  region: string;
}) => files.map((file: {
  key: string;
  path: string;
}) => ({
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
 * @returns {Promise<object>} 请求Promise
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
    if (!secretId || !secretKey || !bucket || !region || !files) {
      reject('[Upload COS Error] 参数不全');
      return;
    }

    if (!files.length) {
      reject('[Upload COS Error] 上传文件不能为空');
      return;
    }

    const cos = getCOSInstance(secretId, secretKey);

    const fileList = pushFiles({
      files,
      bucket,
      region,
    });

    cos.uploadFiles(
      {
        files: fileList,
        SliceSize: 1024 * 1024,

        onProgress: onUploadCOSProgress,
        onFileFinish(err: unknown, data: unknown, options: {
          Key: string;
        }) {
          resolve(data);
          console.log(`[uploadCOSFile] 上传${err ? '失败' : '完成'}: ${options.Key}`);
        },
      },
      (err: unknown, data: unknown) => {
        reject(err || data);
      },
    );
  });
}


export function getCOSBucketList({
  secretId,
  secretKey,
  bucket,
  region,
  prefix,
}: {
  secretId: string;
  secretKey: string;
  bucket: string;
  region: string;
  prefix: string;
}): Promise<Array<ICosMeta>> {
  return new Promise((resolve, reject) => {
    if (!secretId || !secretKey || !bucket || !region) {
      reject('[Get COS List Error] 参数不全');
      return;
    }
    const cos = getCOSInstance(secretId, secretKey);

    cos.getBucket({
      Bucket: bucket,
      Region: region,
      Prefix: prefix, /* 非必须 */
    }, (err: unknown, data: {
      Contents: Array<ICosMeta>
    }) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Contents);
      }
    });
  });
}

export function deleteCOSMultipleObject({
  secretId,
  secretKey,
  keys,
  bucket,
  region,
}: {
  secretId: string;
  secretKey: string;
  bucket: string;
  region: string;
  keys: Array<string>;
}) {
  return new Promise((resolve, reject) => {
    if (!secretId || !secretKey || !bucket || !keys) {
      reject('[Delete COS Object Error] 参数不全');
      return;
    }
    if (!keys.length) {
      reject('[Delete COS Object Error] 删除keys不能为空');
      return;
    }

    const cos = getCOSInstance(secretId, secretKey);

    cos.deleteMultipleObject({
      Bucket: bucket,
      Region: region,
      /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
      Objects: keys.map(item => ({ Key: item })),
    }, (err: unknown, data: unknown) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}


