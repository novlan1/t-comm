import { SecretInfoType } from '../type';
import { nodePost } from '../../util/node-request';

/**
 * 获取凭据的通用代码
 * @ignore
 * @param {object} options 配置
 * @param {string} options.apiKey apiKey
 * @param {string} options.loginName loginName
 * @param {Function} options.getPwdCode getPwdCode
 * @param {Function} options.encrypt encrypt
 * @returns {Promise<{auth: string, apiToken: string, apiTime: string}>} 凭据信息
 */
export async function getCredential({
  apiKey,
  loginName,
  getPwdCode,
  encrypt,
}: SecretInfoType) {
  try {
    const res = await nodePost()({
      url: 'http://tamapi.woa.com/api/interface/getApiToken',
      json: {
        isFresh: 0,
        loginName,
        apiKey: encrypt(apiKey, loginName),
      },
    });

    const {
      api_time: apiTime,
      api_token: apiToken,
    } = res.body.data;

    return {
      auth: getPwdCode(apiKey, apiToken, +apiTime), // 生成授权码
      apiToken,
      apiTime,
    };
  } catch (e) {
    console.warn(e);
    throw new Error('获取凭据失败！');
  }
}
