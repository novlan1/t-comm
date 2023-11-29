import { reportToRdPlatform } from '../rd-platform-report/rd-platform-report';
import { getCIConfig, getRobot } from './write-env-and-private-key';
import { MpCI } from './mp-ci';
import { getInnerBundleBuildDesc } from './helper';


function flattenSubPackages(result) {
  const {
    subPackageInfo = [],
  } = result;
  return subPackageInfo.reduce((acc, item) => {
    acc[item.name] = item;
    return acc;
  }, {});
}


async function reportToRd({
  bundleInfo,
  rdProjectId,
  subProject,
  robot,
  lastCommit,

  repo,
  env,
  branch,
  rdHost,

  bkStartUserName,
  bkStartType,
  bkBuildUrl,
  bkPipelineId,
}) {
  if (!bundleInfo || !bundleInfo.__APP__) return;
  const mainBundleSize = parseInt(`${(bundleInfo.__APP__?.size || 0) / 1024}`, 10);
  const totalBundleSize = parseInt(`${(bundleInfo.__FULL__?.size || 0) / 1024}`, 10);

  const reportToRdRes = await reportToRdPlatform({
    data: {
      projectId: rdProjectId,
      project: repo || '',
      subProject,

      bkStartUserName: bkStartUserName || '',
      bkStartType: bkStartType || '',
      bkBuildUrl: bkBuildUrl || '',
      bkPipelineId: bkPipelineId || '',

      env: env || '',
      branch: branch || '',
      mainBundleSize,
      totalBundleSize,
      createTime: Date.now(),
    },
    host: rdHost || '',
    type: 2,
    platform: 2,
  });

  await reportToRdPlatform({
    data: {
      projectId: rdProjectId,
      projectName: repo || '',
      subProjectName: subProject,

      env: env || '',
      branch: branch || '',
      robot,

      lastCommit,

      mainBundleSize,
      totalBundleSize,
      bkBuildUrl: bkBuildUrl || '',

      time: Date.now(),

      isWx: true,
    },
    host: rdHost || '',
    type: 4,
  }).catch((err) => {
    console.log('[reportToRdRecordRes] err', err);
  });

  console.log('[reportToRdRes]', reportToRdRes);
}


export async function mpUploadAndReport({
  branch,
  env,
  root,

  rainbowConfigKey,
  rainbowAppId,
  rainbowEnvName,
  rainbowGroupName,

  rdHost,
  bkStartType,
  bkBuildUrl,
  bkStartUserName,
  bkPipelineId,

  commitInfo,
  version,
  buildDesc,
}) {
  const rainbowSecretInfo = {
    appId: rainbowAppId,
    envName: rainbowEnvName,
    groupName: rainbowGroupName,
  };

  const config = await getCIConfig(rainbowConfigKey, rainbowSecretInfo);
  console.log('[CI] config: ', config);

  const robot = getRobot({
    config,
    branch,
    env,
  });

  const {
    appName,
    appId,
    webhookUrl,
    chatId,
    cosInfo,
    rdProjectId,
    subProject,
    ci: ciConfig,
    mpCISetting,
  } = config;

  const ci = new MpCI({
    appName,
    appId,
    root,
    env,
    robotNumber: robot,

    webhookUrl,
    chatId,

    cosInfo,

    errorLink: bkBuildUrl,

    commitInfo,
    version,
    buildDesc,
    buildSetting: mpCISetting || {},
  });

  await ci.uploadAndPreview();
  const { commitInfo: ciCommitInfo = {} } = ci;

  const bundleInfo = flattenSubPackages(ci.previewResult || {});
  try {
    await reportToRd({
      bundleInfo,
      rdProjectId,
      subProject,
      robot,
      lastCommit: `${ciCommitInfo.author} - ${ciCommitInfo.message} - ${ciCommitInfo.hash}`,

      repo: ciConfig.repo || '',
      env,
      branch,
      rdHost,

      bkStartUserName,
      bkStartType,
      bkBuildUrl,
      bkPipelineId,
    });
  } catch (err) {
    console.log('[reportToRd] err: ', err);
  }


  if (bkStartType !== 'TIME_TRIGGER') {
    await ci.sendRobotMsg();
  }
}


export async function mpUploadAndReportByOptions(options) {
  console.log('[options] ', options);
  const {
    branch,
    env,
    root,

    configKey: rainbowConfigKey,
    appid: rainbowAppId,
    envName: rainbowEnvName,
    groupName: rainbowGroupName,

    rdHost,
    bkStartType,
    bkBuildUrl,
    bkStartUserName,
    bkPipelineId,

    commitAuthor,
    commitMessage,
    commitHash,
    mpVersion,
  } = options;

  if (!branch
     || !env
     || !root

     || !rainbowConfigKey
     || !rainbowAppId
     || !rainbowEnvName
     || !rainbowGroupName

     || !rdHost
     || !bkStartType
     || !bkBuildUrl
     || !bkStartUserName
     || !bkPipelineId

     || !commitAuthor
     || !commitMessage
     || !commitHash
     || !mpVersion
  ) {
    console.error('缺少必要参数，请检查！');
    return;
  }

  mpUploadAndReport({
    branch,
    env,
    root,

    rainbowConfigKey,
    rainbowAppId,
    rainbowEnvName,
    rainbowGroupName,

    rdHost,
    bkStartType,
    bkBuildUrl,
    bkStartUserName,
    bkPipelineId,

    commitInfo: {
      author: commitAuthor,
      message: commitMessage,
      hash: commitHash,
      branch,
    },

    buildDesc: getInnerBundleBuildDesc({
      env,
      branch,
      author: commitAuthor,
      message: commitMessage,
    }),
    version: mpVersion,
  });
}
