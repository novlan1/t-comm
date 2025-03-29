/* eslint-disable @typescript-eslint/no-require-imports */
import { getDevopsAccessToken } from './token';

import type { IRemoteInstances, ISecretInfo } from './types';

interface ITemplateReq {
  projectId: string;
  templateId: string;
  host: string;
  secretInfo: ISecretInfo
}


async function getDevopsTemplateList({
  projectId,
  host,
  secretInfo,
}: Pick<ITemplateReq, 'projectId' | 'host' | 'secretInfo'>): Promise<{
    models: Array<{
      templateId: string;
      version: string | number;
    }>
  }> {
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
    .catch((err: unknown) => {
      console.log('[getDevopsTemplateList ] err: ', err);
    });
  return resp.data.data || {};
}

async function getDevopsTemplateLatestVersion({
  projectId,
  templateId,
  host,
  secretInfo,
}: ITemplateReq) {
  const templateList = await getDevopsTemplateList({
    projectId,
    secretInfo,
    host,
  });
  const template = templateList.models.find(item => item.templateId === templateId);
  return template?.version;
}

async function getHeaderAndBaseUrl({
  projectId,
  templateId,
  secretInfo,
  host,
}: ITemplateReq) {
  const { appCode, appSecret, devopsUid } = secretInfo;
  const accessToken = await getDevopsAccessToken({
    secretInfo,
    host,
  });

  const url = `${host}/prod/v4/apigw-app/projects/${projectId}/templates/templateInstances?templateId=${templateId}`;

  return {
    headers: {
      'X-DEVOPS-UID': devopsUid,
      'Content-Type': 'application/json',
      'X-Bkapi-Authorization': JSON.stringify({
        bk_app_code: appCode,
        bk_app_secret: appSecret,
        access_token: accessToken,
      }),
    },
    baseUrl: url,
  };
}

export async function getDevopsTemplateInstances({
  projectId,
  templateId,
  host,
  secretInfo,
  page = 1,
  pageSize = 100,
}: ITemplateReq & {
  page?: number;
  pageSize?: number;
}) {
  const axios = require('axios');

  const { headers, baseUrl } = await getHeaderAndBaseUrl({
    projectId,
    templateId,
    secretInfo,
    host,
  });
  const url = `${baseUrl}&page=${page}&pageSize=${pageSize}`;

  const resp = await axios({
    headers,
    url,
    method: 'GET',
  }).catch((err: unknown) => {
    console.log('[getDevopsTemplateInstances] err: ', err);
  });
  return resp.data;
}


export async function getAllDevopsTemplateInstances(reqParam: ITemplateReq & {
  page?: number | undefined;
  pageSize?: number | undefined;
}) {
  const list: IRemoteInstances = [];
  await innerGetInstances(list, reqParam);
  return list;
}


async function innerGetInstances(allData: Array<any> = [], reqParam: ITemplateReq & {
  page?: number | undefined;
  pageSize?: number | undefined;
}) {
  const resp = await getDevopsTemplateInstances(reqParam);
  const { page, instances = [] } = resp.data || {};
  allData.push(...instances);
  if (!instances.length) return;

  await innerGetInstances(allData, {
    ...reqParam,
    page: page + 1,
  });
}

export async function createDevopsTemplateInstances({
  projectId,
  templateId,
  host,
  pipelineName,
  pipelineParam,
  secretInfo,
  useTemplateSettings = true,
}: ITemplateReq & {
  pipelineName: string;
  pipelineParam: Object;
  useTemplateSettings?: boolean
}) {
  const axios = require('axios');
  const version = await getDevopsTemplateLatestVersion({
    templateId,
    projectId,
    secretInfo,
    host,
  });
  console.log('[createDevopsTemplateInstances] version: ', version);
  const { headers, baseUrl } = await getHeaderAndBaseUrl({
    projectId,
    templateId,
    secretInfo,
    host,
  });

  const url = `${baseUrl}&version=${version}&useTemplateSettings=${useTemplateSettings}`;

  const resp = await axios({
    headers,
    url,
    method: 'post',
    data: [
      {
        pipelineName,
        param: pipelineParam,
      },
    ],
  }).catch((err: unknown) => {
    console.log('[createDevopsTemplateInstances] err: ', err);
  });
  return resp.data;
}


export async function updateDevopsTemplateInstances({
  projectId,
  templateId,
  pipelineId,
  host,
  pipelineName,
  pipelineParam,
  useTemplateSettings = true,
  secretInfo,
}: ITemplateReq & {
  pipelineId: string;
  pipelineName: string;
  pipelineParam: Object;
  useTemplateSettings?: boolean
}) {
  const axios = require('axios');
  const version = await getDevopsTemplateLatestVersion({
    templateId,
    projectId,
    secretInfo,
    host,
  });
  console.log('[updateDevopsTemplateInstances] version: ', version);

  const { headers, baseUrl } = await getHeaderAndBaseUrl({
    projectId,
    templateId,
    secretInfo,
    host,
  });

  const url = `${baseUrl}&version=${version}&useTemplateSettings=${useTemplateSettings}`;

  const resp = await axios({
    headers,
    url,
    method: 'PUT',
    data: [
      {
        pipelineName,
        pipelineId,
        param: pipelineParam,
      },
    ],
  }).catch((err: unknown) => {
    console.log('[updateDevopsTemplateInstances] err: ', err);
  });
  return resp.data;
}
