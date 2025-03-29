import axios from 'axios';

import { UPLOADER_CONFIG } from './config';

/**
 * 请求 hashCode
 * @ignore
 */
export function requestHashCode(url = UPLOADER_CONFIG.REQUEST_HASH_URL()): Promise<{
  hash: string;
  timestamp: number;
}> {
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url,
    }).then((res) => {
      if (res?.data?._hash) {
        const hash = res.data._hash;
        resolve({ hash, timestamp: new Date().getTime() });
      } else {
        reject({ errMsg: '上传功能初始化失败，请重试!' });
      }
    })
      .catch(() => {
        reject({ errMsg: '上传功能初始化失败，请重试!' });
      });
  });
}

/**
 * 请求上传文件
 * @ignore
 */
export function requestUploadFile({
  file,
  hashCode,
  uploadFileKey = UPLOADER_CONFIG.UPLOAD_FILE_KEY,
  url = UPLOADER_CONFIG.UPLOAD_URL_PREFIX,
}: {
  file: File;
  hashCode: string;
  uploadFileKey?: string;
  url?: string;
}): Promise<{
    url: string;
  }> {
  if (['mp-weixin', 'mp-qq'].includes(process.env.UNI_PLATFORM || '')) {
    return requestUploadFileInMp({
      file,
      hashCode,
      url,
    });
  }
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append(uploadFileKey, file);

    const reqUrl = `${url}${hashCode}`;
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: false, // 实时修改配置。这个api要设置为false
    };

    axios.post(reqUrl, formData, config).then((rsp) => {
      if (rsp?.data?.url && rsp.data.url.length > 0) {
        resolve(rsp.data);
      } else {
        reject(new Error(rsp.data.msg || JSON.stringify(rsp)));
      }
    })
      .catch((e) => {
        reject(e);
      });
  });
}


function requestUploadFileInMp({
  hashCode,
  file,
  url: prefixUrl,
}: {
  file: File;
  hashCode: string;
  url: string;
}): Promise<{
    url: string;
  }>  {
  return new Promise((resolve, reject) => {
    const widthHeight = '';
    const url = `${prefixUrl}${hashCode}&width_height=${widthHeight}`;

    uni.uploadFile({
      url,
      // @ts-ignore
      filePath: file.path,
      name: 'upload_pic_input',
      formData: {
        _hash: hashCode,
      },
      success(res: any) {
        if (res.data) {
          let data = { url: '', r: 0 };
          try {
            data = JSON.parse(res.data);
          } catch (err) {}

          if (data.r == 0) {
            resolve({
              url: data.url,
            });
            return;
          }

          reject(res);
        } else {
          reject(res);
        }
      },
      fail(res: any) {
        reject(res);
      },
    });
  });
}
