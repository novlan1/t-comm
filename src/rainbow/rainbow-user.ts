import { BASE_URL } from './helper/helper';
import { flatten } from '../base';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const axios = require('axios');

/**
 * 拉取七彩石配置
 * @param {String} key 七彩石的key
 * @param {object} secretInfo 密钥信息
 * @param {string} secretInfo.appId 项目Id
 * @param {string} secretInfo.envName 环境
 * @param {string} secretInfo.groupName 组名称
 * @returns {Promise<object>} 请求Promise
 *
 * @example
 *
 * fetchRainbowConfig('test', {
 *   appId: 'xx',
 *   envName: 'prod',
 *   groupName: 'robot',
 * }).then((resp) => {
 *   console.log(resp)
 * });
 *
 */
export function fetchRainbowConfig(key: string, secretInfo: {
  appID?: string
  appId?: string
  envName: string
  groupName: string
}): Promise<any> {
  const { appID, appId, envName, groupName } = secretInfo;
  return new Promise((resolve, reject) => {
    axios({
      url: `${BASE_URL}/config.v2.ConfigService/PullConfigReq`,
      method: 'POST',
      data: {
        pull_item: {
          app_id: appId || appID,
          group: groupName,
          envName,
        },
      },
    })
      .then((res: {
        data: {
          ret_code: number | string;
          config: {
            items: Array<{
              key_values: Array<{
                key: any;
              }>
            }>
          }
        }
      }) => {
        if (res.data.ret_code) {
          reject(res.data);
          return;
        }

        const keyValues = res.data.config.items[0].key_values;
        const flattenValues = flatten(keyValues, 'key');

        const resData = flattenValues[key]?.value;
        resolve(resData);
      })
      .catch((err: unknown) => {
        reject(err);
      });
  });
}
