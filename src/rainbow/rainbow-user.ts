import { BASE_URL } from './helper/helper'
import { flatten } from '../base'

const axios = require('axios')

/**
 * 拉去七彩石配置
 * @param {String} key 七彩石的key
 * @param {object} secretInfo 密钥信息，包含 appID, envName, groupName
 * @returns Any
 *
 * @example
 * ```ts
 * fetchRainbowConfig('test', {appId: 'xx', envName: 'prod', groupName: 'robot'})
 * ```
 */
export function fetchRainbowConfig(key, secretInfo) {
  const { appID, envName, groupName } = secretInfo
  return new Promise((resolve, reject) => {
    axios({
      url: `${BASE_URL}/config.v2.ConfigService/PullConfigReq`,
      method: 'POST',
      data: {
        pull_item: {
          app_id: appID,
          group: groupName,
          envName,
        },
      },
    })
      .then(res => {
        if (res.data.ret_code) {
          reject(res.data)
          return
        }

        const keyValues = res.data.config.items[0].key_values
        const flattenValues = flatten(keyValues, 'key')

        const resData = flattenValues[key]?.value
        resolve(resData)
      })
      .catch(err => {
        reject(err)
      })
  })
}
