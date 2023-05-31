/* eslint-disable @typescript-eslint/no-require-imports */
import { getDevopsAccessToken } from './token';
import type { ISecretInfo } from './types';

export async function startDevopsPipeline({
  projectId,
  pipelineId,
  secretInfo,
  host,
  data,
}: {
  projectId: string;
  pipelineId: string;
  secretInfo: ISecretInfo;
  host: string;
  data: Object
}) {
  const axios = require('axios');
  const { appCode, appSecret, devopsUid } = secretInfo;
  const accessToken = await getDevopsAccessToken({
    secretInfo,
    host,
  });

  const resp = await axios({
    url: `${host}/prod/v4/apigw-app/projects/${projectId}/build_start?pipelineId=${pipelineId}`,
    method: 'post',
    headers: {
      'X-DEVOPS-UID': devopsUid,
      'Content-Type': 'application/json',
      'X-Bkapi-Authorization': JSON.stringify({
        bk_app_code: appCode,
        bk_app_secret: appSecret,
        access_token: accessToken,
      }),
    },
    data: {
      ...(data || {}),
    },
  })
    .catch((err: unknown) => {
      console.log('[startDevopsPipeline] err: ', err);
    });

  return resp.data;
}
