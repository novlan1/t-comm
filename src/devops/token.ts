/* eslint-disable @typescript-eslint/no-require-imports */
import type { ISecretInfo } from './types';


let token = '';

export async function getDevopsAccessToken({
  secretInfo,
  host = '',
}: {
  secretInfo: ISecretInfo,
  host?: string;
}) {
  if (token) return token;

  host = host.replace(/^(http[s]?:\/\/)devops\./, '$1');

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
    .catch((err: unknown) => {
      console.log('[getDevopsAccessToken] err: ', err);
    });

  token = resp.data?.data?.access_token || '';
  console.log('[getDevopsAccessToken] token', token);

  return token;
}
