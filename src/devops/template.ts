/* eslint-disable @typescript-eslint/no-require-imports */
import { getDevopsAccessToken } from './token';


async function getDevopsTemplateList({
  projectId,
  secretInfo,
  host,
}) {
  const axios = require('axios');
  const accessToken = await getDevopsAccessToken({
    secretInfo,
    host,
  });
  const { appCode, appSecret, devopsUid } = secretInfo;

  const resp =  await axios({
    url: `${host}/prod/v4/apigw-app/projects/${projectId}/templates`,
    method: 'GET',
    headers: {
      'X-DEVOPS-UID': devopsUid,
      'Content-Type': 'application/json',
      'X-Bkapi-Authorization': JSON.stringify({
        bk_app_code: appCode,
        bk_app_secret: appSecret,
        access_token: accessToken,
      }),
    },
    params: {
      page: 1,
      pageSize: 90,
    },
  })
    .catch((err) => {
      console.log('[getDevopsTemplateList ] err: ', err);
    });
  return resp.data.data || {};
}

export async function getDevopsTemplateLatestVersion({
  templateId,
  projectId,
  secretInfo,
  host,
}) {
  const templateList = await getDevopsTemplateList({
    projectId,
    secretInfo,
    host,
  });
  const template = templateList.models.find(item => item.templateId === templateId);
  return template.version;
}


export async function createDevopsTemplateInstances({
  templateId,
  projectId,
  secretInfo,
  host,
  pipelineName,
  pipelineParam,
  useTemplateSettings = true,
}) {
  const axios = require('axios');
  const accessToken = await getDevopsAccessToken({
    secretInfo,
    host,
  });
  console.log('[createDevopsTemplateInstances] accessToken: ', accessToken);
  const version = await getDevopsTemplateLatestVersion({
    templateId,
    projectId,
    secretInfo,
    host,
  });
  console.log('[createDevopsTemplateInstances] version: ', version);

  const { appCode, appSecret, devopsUid } = secretInfo;

  let url = `${host}/prod/v4/apigw-app/projects/${projectId}/templates/templateInstances?`;
  url += `templateId=${templateId}`;
  url += `&version=${version}`;
  url += `&useTemplateSettings=${useTemplateSettings}`;

  const resp = await axios({
    headers: {
      'X-DEVOPS-UID': devopsUid,
      'Content-Type': 'application/json',
      'X-Bkapi-Authorization': JSON.stringify({
        bk_app_code: appCode,
        bk_app_secret: appSecret,
        access_token: accessToken,
      }),
    },
    url,
    method: 'post',
    data: [
      {
        pipelineName,
        param: pipelineParam,
      },
    ],
  }).catch((err) => {
    console.log('[createDevopsTemplateInstances] err: ', err);
  });
  return resp.data;
}

