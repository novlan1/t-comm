import { saveJsonToLog } from '../../node/fs-util';
import { queryGroupInfo } from '../../rainbow/rainbow-admin';

import { startDevopsPipeline } from '../pipeline';
import {
  createDevopsTemplateInstances,
  updateDevopsTemplateInstances,
} from '../template';


import { DEVOPS_MP_CI_CONFIG } from './config';
import {
  compareFromLogFile,
  genOneFileFromRainbowGroup,
  getPipelineName,
  getPipelineParam,
  getRainbowMpCIFileName,
  getUnusedPipelineList,
  isPipelineUpdated,
  parseRobotMap,
} from './helper';

const { CI_PREFIX_MAP } = DEVOPS_MP_CI_CONFIG;

const usefulPipelineIdList: Array<string> = [];


async function updateOrCreateInstance({
  rainbowMap,
  mpCIKey,
  isWxCI,
  forceUpdate,
  devopsConfig,
  templateIdMap,
  onlyCollectNoUsedPipeline,
}: Record<string, any>) {
  const newConfig = JSON.parse(rainbowMap[mpCIKey].value);
  const robotMapKey = isWxCI ? 'robotMap' : 'qqRobotMap';
  const newInfo = newConfig[robotMapKey] || {};
  const robotMap = parseRobotMap(newInfo);

  for (const robot of Object.keys(robotMap)) {
    const { branch, env } = robotMap[robot];
    const pipelineName = getPipelineName({
      robot,
      env,
      branch,
      ciKey: newConfig.ci.name,
      prefix: isWxCI ? CI_PREFIX_MAP.wx : CI_PREFIX_MAP.qq,
    });
    console.log('[pipelineName]', pipelineName);

    const alreadyPipeline = await isPipelineUpdated({
      pipelineName,
      isWxCI,
      forceUpdate,
      devopsConfig,
      templateIdMap,
    });

    console.log('[alreadyPipeline]', alreadyPipeline);
    let cgiName: Function = createDevopsTemplateInstances;
    const extraParam: Record<string, any> = {};

    if (alreadyPipeline.type === 'CREATE') {
    } else if (alreadyPipeline.type === 'UPDATE') {
      cgiName = updateDevopsTemplateInstances;
      extraParam.pipelineId = (alreadyPipeline as any).pipelineId;
    } else {
      continue;
    }

    if (extraParam.pipelineId) {
      usefulPipelineIdList.push(extraParam.pipelineId);
    }

    if (!onlyCollectNoUsedPipeline) {
      await realUpdateOrCreatePipeline({
        cgiName,
        devopsConfig,
        isWxCI,
        templateIdMap,
        extraParam,
        pipelineName,
        branch,
        env,
        mpCIKey,
        newConfig,
        forceUpdate,
      });
    }
  }
}


async function realUpdateOrCreatePipeline({
  cgiName,
  devopsConfig,
  isWxCI,
  templateIdMap,
  extraParam,
  pipelineName,
  branch,
  env,
  mpCIKey,
  newConfig,
  forceUpdate,
}: Record<string, any>) {
  const res = await cgiName({
    ...devopsConfig,
    templateId: isWxCI ? templateIdMap.WX_MP_CI : templateIdMap.QQ_MP_CI,
    ...extraParam,
    pipelineName,
    pipelineParam: [
      ...getPipelineParam({
        branch,
        env,
        rainbowConfigKey: mpCIKey,
        repo: newConfig.ci.repo,
        isWxCI,
        devopsParams: newConfig.devopsParams || {},
      }),
    ],
  })
    .catch((err: any) => {
      console.log('[cgiName] err', err);
    });

  console.log('[cgiName] res', res);
  const pipelineId = extraParam.pipelineId || res?.data?.successPipelinesId?.[0];

  if (!forceUpdate && pipelineId) {
    await startDevopsPipeline({
      ...devopsConfig,
      pipelineId,
      data: {},
    });
  }
}

async function handleChangedConfig({
  compareRes = {},
  forceUpdate,
}: {
  compareRes: Record<string, any>;
  forceUpdate?: boolean
}) {
  const { ADDED: added, UPDATED: updated, DELETED: deleted, newObj: rainbowMap } = compareRes;
  const filterMpCI = (list: Array<string>) => list.filter(item => item.endsWith('_mp_ci'));
  console.log('[compareRes]', added, updated, deleted);
  let updatedMpCIs: Array<any> = [];

  if (forceUpdate) {
    updatedMpCIs = filterMpCI(Object.keys(rainbowMap));
  } else {
    updatedMpCIs = [
      ...filterMpCI(added),
      ...filterMpCI(updated),
    ];
  }

  return updatedMpCIs;
}


export async function updateDevopsMpCIPipeline({
  isWxCI = true,
  forceUpdate = false,
  onlyCollectNoUsedPipeline = false,
  devopsConfig,
  templateIdMap,
  rainbowGroupSecretInfo,
}: Record<string, any>) {
  const resp = await queryGroupInfo({
    secretInfo: rainbowGroupSecretInfo,
  });
  const rainbowMap = genOneFileFromRainbowGroup(resp);
  const compareRes = compareFromLogFile(getRainbowMpCIFileName(isWxCI), rainbowMap);

  const updatedMpCIs = await handleChangedConfig({
    compareRes,
    forceUpdate,
  });

  for (const mpCIKey of updatedMpCIs) {
    await updateOrCreateInstance({
      rainbowMap,
      mpCIKey,
      isWxCI,
      forceUpdate,
      devopsConfig,
      templateIdMap,
      onlyCollectNoUsedPipeline,
    });
  }

  const unusedPipeline = getUnusedPipelineList({
    isWxCI,
    templateIdMap,
    usefulList: usefulPipelineIdList,
  });

  saveJsonToLog(rainbowMap, getRainbowMpCIFileName(isWxCI));
  saveJsonToLog({ unusedPipeline }, `devops-unused-pipeline-${isWxCI ? 'wx' : 'qq'}.json`);
}

