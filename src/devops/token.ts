/* eslint-disable @typescript-eslint/no-require-imports */

let token = '';

export async function getDevopsAccessToken({
  secretInfo,
  host = '',
}) {
  if (token) return token;
  if (host.startsWith('https://devops.')) {
    host = host.replace('https://devops.', 'https://');
  }
  const axios = require('axios');
  const { appCode, appSecret } = secretInfo;

  const resp = await axios({
    url: `${host}/auth_api/token/`,
    method: 'post',
    data: {
      app_code: appCode,
      app_secret: appSecret,
      env_name: 'prod',
      grant_type: 'client_credentials',
    },
  })
    .catch((err) => {
      console.log('[getDevopsAccessToken] err: ', err);
    });

  token = resp.data?.data?.access_token || '';
  console.log('[getDevopsAccessToken] token', token);

  return token;
}
