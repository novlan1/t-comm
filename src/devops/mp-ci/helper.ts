import { compareTwoObj } from '../../base/object/compare';
import { getJsonFromLog, saveJsonToLog } from '../../node/fs-util';
import { getAllDevopsTemplateInstances } from '../template';

import { DEVOPS_MP_CI_CONFIG } from './config';

import type { IRemoteInstances } from '../types';


const {
  CI_SEPARATOR,
  VALID_ENVS,
} = DEVOPS_MP_CI_CONFIG;

const remoteInstancesMap: Record<string, IRemoteInstances> = {};

export function genOneFileFromRainbowGroup(list: Array<any>) {
  const obj = list.reduce((acc, item) => {
    acc[item.key] = {
      value: item.value,
      value_type: item.value_type,
    };
    return acc;
  }, {});
  return obj;
}


export function parseRobotMap(obj: Record<string, any> = {}) {
  const branches = Object.keys(obj);
  const res: Record<string, any> = {};

  for (const branch of branches) {
    const envs = Object.keys(obj[branch]);
    for (const env of envs) {
      if (!VALID_ENVS.includes(env)) {
        continue;
      }

      const robotNumber = obj[branch][env];
      res[robotNumber] = {
        branch,
        env,
      };
    }
  }
  console.log('[parseRobotMap] res: ', res);
  return res;
}


/**
 * 获取流水线名称
 * @param {object} config 配置信息
 * @ignore
 *
 * @example
 * getPipelineName({
 *   robot: '26',
 *   env: 'release',
 *   branch: 'feature/team-pvp-kpl',
 *   ciKey: 'convert_wz',
 *   prefix: 'wxci',
 * })
 * // wxci__convert_wz__26__release__feature/team-pvp-kpl
 */
export function getPipelineName({
  robot,
  env,
  branch,
  ciKey,
  prefix,
}: Record<string, any>) {
  return [
    prefix,
    ciKey,
    robot,
    env,
    branch,
  ].join(CI_SEPARATOR);
}


export function parseInstanceName(name: string) {
  const list = name.split(CI_SEPARATOR);
  const {
    0: prefix,
    1: projectShortName,
    2: robotNumber,
    3: env,
    4: branch,
  } = list;
  return {
    prefix,
    projectShortName,
    robotNumber,
    env,
    branch,
  };
}


export function getPipelineParam({
  branch,
  env,
  rainbowConfigKey,
  repo,
  isWxCI,
  devopsParams,
}: Record<string, any>) {
  const res = [
    {
      id: 'rainbowConfigKey',
      required: true,
      type: 'STRING',
      defaultValue: rainbowConfigKey,
      desc: '七彩石配置的key',
      readOnly: false,
    },
    {
      id: 'repo',
      required: true,
      type: 'STRING',
      defaultValue: repo,
      desc: '仓库',
      readOnly: false,
    },
    {
      id: 'branch',
      required: true,
      type: 'STRING',
      defaultValue: branch,
      desc: '分支',
      readOnly: false,
    },
    {
      id: 'env',
      required: true,
      type: 'STRING',
      defaultValue: env,
      desc: '环境',
      readOnly: false,
    },
    {
      id: 'forceNpm',
      required: true,
      type: 'STRING',
      // 从 devopsParams 中获取
      defaultValue: devopsParams?.forceNpm ?? '1',
      desc: '是否强制使用 NPM，默认是',
      readOnly: false,
    },
  ];

  if (isWxCI) {
    res.push(...[
      {
        id: 'needSourceMap',
        required: true,
        type: 'STRING',
        defaultValue: '0',
        desc: '是否需要sourceMap',
        readOnly: false,
      },
      {
        id: 'tamProjectId',
        required: true,
        type: 'STRING',
        defaultValue: '',
        desc: 'Tam上报ID',
        readOnly: false,
      },
      {
        id: 'useDevopsWXCIPlugin',
        required: true,
        type: 'STRING',
        defaultValue: devopsParams?.useDevopsWXCIPlugin || '0',
        desc: '是否使用蓝盾平台小程序CI插件',
        readOnly: false,
      },
    ]);
  } else {
    res.push(...[
      {
        id: 'useNode16',
        required: true,
        type: 'STRING',
        defaultValue: devopsParams?.useDevopsWXCIPlugin == '1' ? '1' : '0',
        desc: '是否使用 node 16 版本',
        readOnly: false,
      },
    ]);
  }
  return res;
}


export function compareFromLogFile(key: string, obj: Record<string, any>) {
  const originFile = getJsonFromLog(key);
  const compareRes = compareTwoObj(originFile, obj);
  return compareRes;
}


export const getTemplateInstanceFileName = (isWxCI: boolean) => `devops-template-instances-${isWxCI ? 'wx' : 'qq'}.json`;
export const getRainbowMpCIFileName = (isWxCI: boolean) => `devops-mp-ci-rainbow-${isWxCI ? 'wx' : 'qq'}.json`;


export async function isPipelineUpdated({
  pipelineName,
  isWxCI,
  forceUpdate,
  devopsConfig,
  templateIdMap,
}: Record<string, any>) {
  const {
    prefix,
    projectShortName,
    robotNumber,
  } = parseInstanceName(pipelineName);
  const name = `${[
    prefix,
    projectShortName,
    robotNumber,
  ].join(CI_SEPARATOR)}${CI_SEPARATOR}`;

  const templateId = isWxCI ? templateIdMap.WX_MP_CI : templateIdMap.QQ_MP_CI;
  let remoteInstances = remoteInstancesMap[templateId] || [];

  if (!remoteInstances.length) {
    remoteInstancesMap[templateId] = await getAllDevopsTemplateInstances({
      ...devopsConfig,
      templateId,
    });
    remoteInstances = remoteInstancesMap[templateId];
    saveJsonToLog(remoteInstances, getTemplateInstanceFileName(isWxCI));
  } else {
    console.log('cache');
  }

  const sameRobotPipeline = remoteInstances.find(item => item.pipelineName.startsWith(name));
  if (sameRobotPipeline) {
    // 如果是强制更新，可以注释掉下面这段
    if (!forceUpdate && sameRobotPipeline.pipelineName === pipelineName) {
      return {
        type: 'NONE',
      };
    }

    return {
      type: 'UPDATE',
      ...sameRobotPipeline,
    };
  }
  return {
    type: 'CREATE',
  };
}


export function getUnusedPipelineList({
  usefulList,
  isWxCI,
  templateIdMap,
}: Record<string, any>) {
  const templateId = isWxCI ? templateIdMap.WX_MP_CI : templateIdMap.QQ_MP_CI;
  const remoteInstances = remoteInstancesMap[templateId] || [];

  return remoteInstances.filter(item => usefulList.indexOf(item.pipelineId) === -1);
}
