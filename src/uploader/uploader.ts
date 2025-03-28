import { merge } from '../lodash-mini/merge';

import { UPLOADER_CONFIG } from './config';
import { requestHashCode, requestUploadFile } from './request';
import { IUploaderOptions } from './types';

export class UploadManager {
  static uploadManager: UploadManager;

  static getInstance() {
    if (!this.uploadManager) {
      this.uploadManager = new UploadManager();
    }
    return this.uploadManager;
  }

  static setConfig(options: IUploaderOptions) {
    const instance = UploadManager.getInstance();

    instance.options = merge(
      {},
      instance.options,
      options,
    );
  }

  hash: string;
  timestamp: number;
  isRequesting: boolean;
  options: IUploaderOptions;

  constructor() {
    this.hash = '';
    this.timestamp = 0;
    this.isRequesting = false;
    this.options = {
      requestHashUrl: UPLOADER_CONFIG.REQUEST_HASH_URL(),
      uploadFileKey: UPLOADER_CONFIG.UPLOAD_FILE_KEY,
      uploadUrlPrefix: UPLOADER_CONFIG.UPLOAD_URL_PREFIX,
    };
  }


  updateHashCode() {
    return new Promise((resolve, reject) => {
      // 后台是两小时过期，这里稍微减去5分钟
      this.isRequesting = true;
      let promise: Promise<any>;
      if (typeof this.options.requestHashUrl === 'function') {
        promise = this.options.requestHashUrl();
      } else {
        promise = requestHashCode(this.options.requestHashUrl);
      }

      promise.then((response) => {
        this.isRequesting = false;
        this.hash = response.hash || response._hash;
        this.timestamp = response.timestamp;

        resolve(this.hash);
      })
        .catch((error) => {
          this.isRequesting = false;
          reject(error);
        });
    });
  }

  requestUpload(file: File): Promise<{url: string}> {
    return new Promise((resolve, reject) => {
      if (this.isRequesting) {
        reject({ errMsg: '正在上传文件，请稍后再试' });
      } else {
        const currTimestamp = new Date().getTime();

        // 后台是两小时过期，这里稍微减去5分钟
        if (!this.hash || (currTimestamp - this.timestamp > 2 * 55 * 60 * 1000)) {
          this.isRequesting = true;

          this.updateHashCode()
            .then(() => {
              requestUploadFile({
                file,
                hashCode: this.hash,
                uploadFileKey: this.options.uploadFileKey,
                url: this.options.uploadUrlPrefix,
              })
                .then((response) => {
                  resolve(response);
                })
                .catch((error) => {
                  reject(error);
                });
            })
            .catch((error) => {
              this.isRequesting = false;
              reject(error);
            });
        } else {
          requestUploadFile({
            file,
            hashCode: this.hash,
            uploadFileKey: this.options.uploadFileKey,
            url: this.options.uploadUrlPrefix,
          })
            .then((response) => {
              resolve(response);
            })
            .catch((error) => {
              reject(error);
            });
        }
      }
    });
  }
}

/**
 * 上传文件
 *
 * 上传的本质：
 *
 * 1. 小程序上传文件是先用 chooseFile 获取一个文件，可以得到
 * 一个临时路径，然后用 uploadFile 上传该临时路径
 *
 * 2. H5 是 input 获取文件，然后用 FormData 上传 File 对象
 * @param {File} file 文件
 * @returns {Promise<{url: string}>} 上传结果
 *
 * @example
 * ```ts
 * import { uploadFile, UploadManager } from 't-comm/lib/uploader'
 *
 * uploadFile(file).then(() => {})
 *
 * // 可以通过 UploadManager 设置上传参数
 * UploadManager.setConfig({
 *   requestHashUrl: `https://${location.hostname}/pvp/share/getsharecfg.php`,
 *   uploadFileKey: 'upload_pic_input',
 *   uploadUrlPrefix: 'https://igame.qq.com/external/uploadpic.php?_hash=',
 * })
 *
 * // 可以通过 UploadManager.getInstance().updateHashCode 主动更新 hashCode
 * UploadManager.getInstance().updateHashCode();
 * ```
 */
export function uploadFile(file: File) {
  return new Promise((resolve, reject) => {
    UploadManager.getInstance().requestUpload(file)
      .then((res: { url: string }) => {
        if (!res.url) {
          reject();
        } else {
          resolve(res);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}
