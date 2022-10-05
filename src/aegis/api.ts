/* eslint-disable @typescript-eslint/no-require-imports */

function requestPost(...args) {
  const util = require('util');
  const request = require('request');
  const post = util.promisify(request.post);
  return post(...args);
}

/**
 * 获取凭据的通用代码，无需修改
 * @param {object} options 参数
 * @param {string} options.apiKey apiKey
 * @param {string} options.loginName loginName
 * @param {Function} options.getPwdCode getPwdCode
 * @param {Function} options.encrypt encrypt
 * @private
 * @returns {Promise<object>}
 */
export async function getCredential({
  getPwdCode,
  encrypt,
}) {
  const apiKey = process.env.AEGIS_APP_KEY;
  const loginName = process.env.MY_RTX;

  try {
    const res = await requestPost({
      url: 'http://tamapi.woa.com/api/interface/getApiToken',
      json: {
        isFresh: 0,
        loginName,
        apiKey: encrypt(apiKey, loginName),
      },
    });
    const { api_time: apiTime, api_token: apiToken } = res.body.data;
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

export function getCustomEventQuery({
  startTime,
  endTime,
  projectId,
  env = 'production',
}) {
  let envStr = '';
  if (env === 'production') {
    envStr = ' and "env"=\'production\' ';
  }
  return `select delta(count) as allCount from event_url_statistics where time >= ${startTime}s and time <= ${endTime}s and id='${projectId}' ${envStr} group by "name" slimit 1000`;
}


export async function getCustomEventData({
  startTime, // 格式如1655282977
  endTime, // 格式如1655282977
  projectId,
  env = 'production',
  aegisDes,
}) {
  const credential = await getCredential(aegisDes);

  const result = await requestPost({
    url: 'http://tamapi.woa.com/api/interface/monitor/queryData',
    json: {
      Namespace: 'TAM-v1',
      Query: getCustomEventQuery({
        startTime,
        endTime,
        projectId,
        env,
      }),
    },
    headers: {
      ...credential,
    },
  });
  let res: any = {};
  try {
    res = JSON.parse(result.body.Response.Result);
  } catch (e) {}

  const data = res?.results?.[0]?.series || [];
  return data;
}
