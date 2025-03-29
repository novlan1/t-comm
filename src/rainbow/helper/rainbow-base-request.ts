import { BASE_URL } from './helper';
import { genRainbowHeaderSignature } from './rainbow-signature';

import type { ISecretInfo } from '../types';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const axios = require('axios');

interface ReqParam {
  url: string
  data: object
  secretInfo: ISecretInfo
}

/**
 * 基本请求
 * @private
 * @param {object} config - 配置信息
 * @returns {Promise} 请求Promise
 */
export function baseRequestRainbow({
  url,
  data: reqData,
  secretInfo,
}: ReqParam): Promise<object> {
  return new Promise((resolve, reject) => {
    const baseUrl = BASE_URL;
    const { appID, appId, userID, userId, secretKey, envName, groupName } = secretInfo;
    const realSig = genRainbowHeaderSignature({
      appID,
      appId,
      userID,
      userId,
      secretKey,
    });


    axios({
      url: `${baseUrl}${url}`,
      data: {
        app_id: appId || appID,
        env_name: envName,
        group_name: groupName,
        ...reqData,
      },
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...realSig,
      },
    })
      .then((res: {
        data: {
          ret_code?: number | string;
        }
      }) => {
        if (!res.data.ret_code) {
          resolve(res.data);
        } else {
          reject(res.data);
        }
      })
      .catch((e: unknown) => {
        reject(e);
      });
  });
}
