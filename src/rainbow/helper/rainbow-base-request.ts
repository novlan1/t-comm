import { SecretInfo } from '../index.type'
import { genRainbowHeaderSignature } from './rainbow-signature'
import { BASE_URL } from './helper'

const axios = require('axios')

interface ReqParam {
  url: string
  data: object
  secretInfo: SecretInfo
}

/**
 *
 * @param config - 配置信息
 * @returns 接口信息
 */
export function baseRequestRainbow({
  url,
  data: reqData,
  secretInfo,
}: ReqParam) {
  const baseUrl = BASE_URL
  const { appID, userID, secretKey, envName, groupName } = secretInfo
  const realSig = genRainbowHeaderSignature({
    appID,
    userID,
    secretKey,
  })

  return new Promise((resolve, reject) => {
    axios({
      url: `${baseUrl}${url}`,
      data: {
        app_id: appID,
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
      .then(res => {
        if (!res.data.ret_code) {
          resolve(res.data)
        } else {
          reject(res.data)
        }
      })
      .catch(e => {
        reject(e)
      })
  })
}
