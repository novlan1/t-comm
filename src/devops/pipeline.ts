/* eslint-disable @typescript-eslint/no-require-imports */
import { getDevopsAccessToken } from './token';
import type { ISecretInfo } from './types';
import { timeStampFormat } from '../time/time';
import { batchSendWxRobotMarkdown } from '../wecom-robot/batch-send';


const OVER_TIME_CONFIG_LIST = [
  {
    label: '5小时',
    value: 5 * 60 * 60 * 1000,
  },
  {
    label: '2小时',
    value: 2 * 60 * 60 * 1000,
  },
  {
    label: '1小时',
    value: 1 * 60 * 60 * 1000,
  },
  {
    label: '半小时',
    value: 30 * 60 * 1000,
  },
  {
    label: '20分钟',
    value: 20 * 60 * 1000,
  },
  {
    label: '10分钟',
    value: 10 * 60 * 1000,
  },
  // for test
  // {
  //   label: '1分钟',
  //   value: 1 * 10 * 1000,
  // },
];


/**
 * 启动流水线
 * @param {object} params 配置信息
 * @param {string} params.projectId 项目ID
 * @param {string} params.pipelineId 流水线ID
 * @param {object} params.secretInfo 密钥信息
 * @param {string} params.host 请求域名
 * @param {object} params.data 请求数据
 */
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

/**
 * 获取流水线列表
 * @param {object} params 配置信息
 * @param {string} params.projectId 项目ID
 * @param {object} params.secretInfo 密钥信息
 * @param {string} params.host 请求域名
 * @param {number} params.page 第几页
 * @param {number} params.pageSize 每页数据量
 * @returns 流水线列表
 */
export async function getPipelineList({
  projectId,
  secretInfo,
  host,

  page = 1,
  pageSize = 20,
}: {
  projectId: string;
  secretInfo: ISecretInfo;
  host: string;

  page?: number;
  pageSize?: number;
}): Promise<any> {
  const axios = require('axios');
  const { appCode, appSecret, devopsUid } = secretInfo;
  const accessToken = await getDevopsAccessToken({
    secretInfo,
    host,
  });

  const resp = await axios({
    url: `${host}/prod/v4/apigw-app/projects/${projectId}/pipelines/pipeline_list?page=${page}&pageSize=${pageSize}`,
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
  })
    .catch((err: unknown) => {
      console.log('[getPipelineList] err: ', err);
    });

  return resp.data?.data || {};
}


/**
 * 获取全部流水线列表
 * @param {object} params 配置信息
 * @param {string} params.projectId 项目ID
 * @param {object} params.secretInfo 密钥信息
 * @param {string} params.host 请求域名
 * @param {number} params.page 第几页
 * @param {number} params.pageSize 每页数据量
 * @param {Array} list 结果列表，可不传，用于迭代
 * @returns 流水线列表
 */
export async function getAllPipelineList(
  args: Parameters<typeof getPipelineList>[0],
  list: Array<any> = [],
): Promise<any> {
  const page = args.page || 1;
  const res = await getPipelineList({
    ...args,
    page,
  });

  list.push(...(res.records || []));

  if (!res.count || list.length >= res.count) {
    return list;
  }

  return await getAllPipelineList({
    ...args,
    page: page + 1,
  }, list);
}


function findRunningTooLongPipelines(list: Array<any>, time: number, maxTime: number) {
  const res = list
    .filter(item => item.latestBuildStatus === 'RUNNING')
    .filter((item) => {
      const duration = item.currentTimestamp - item.latestBuildStartTime;
      return item.latestBuildStartTime && duration > time && duration <= maxTime;
    });

  return res;
}


function genRobotMessage(dataList: Array<any>, host: string, projectId: string) {
  const list = [
    `【流水线执行时间过长监控】${timeStampFormat(Date.now(), 'yyyy-MM-dd hh:mm:ss')}<@guowangyang>`,
  ];
  console.log('[All Pipeline Length]: ', dataList.length);

  let maxTime = Number.MAX_VALUE;
  let curIndex = 1;
  const overtimePipelines: Array<any> = [];

  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0;i < OVER_TIME_CONFIG_LIST.length;i++) {
    const item = OVER_TIME_CONFIG_LIST[i];
    const pipelines = findRunningTooLongPipelines(dataList, item.value, maxTime);
    overtimePipelines.push(...pipelines);

    maxTime = item.value;

    if (pipelines.length) {
      console.log('[pipelines.length]', `${item.label}: ${pipelines.length}`);
      const pipelineStr = pipelines
        .map(item => `[${item.pipelineName}](${host}/console/pipeline/${projectId}/${item.pipelineId}/history)`)
        .join(', ');
      list.push(`${curIndex}. 超过${item.label}有: ${pipelineStr}`);
      curIndex += 1;
    }
  }

  return {
    overtimePipelines,
    message: list.join('\n'),
  };
}


/**
 * 获取超时的流水线列表，并发送机器人消息
 * @param {object} params 参数
 * @param {object} params.params 获取流水线列表参数
 * @param {string} params.pipelineHost 流水线 host 地址
 * @param {string} params.webhookUrl 回调地址
 * @param {string} params.chatId 会话id
 */
export async function sendOverTimePipelineMessage({
  params,
  pipelineHost,
  webhookUrl,
  chatId,
}: {
  params: any;
  pipelineHost: string;
  webhookUrl: string;
  chatId: Array<string>;
}) {
  const pipelineList = await getAllPipelineList(params);

  const res = genRobotMessage(pipelineList, pipelineHost, params.projectId);
  let { message } = res;
  const { overtimePipelines } = res;

  if (!overtimePipelines.length) {
    console.log('[Not Found OverTime Pipeline]');
    return;
  }

  if (message.length > 4096) {
    message = `${message.slice(0, 4090)}...`;
  }

  await batchSendWxRobotMarkdown({
    content: message,
    chatId,
    webhookUrl,
  });
  return overtimePipelines;
}
