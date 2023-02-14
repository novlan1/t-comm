import {
  DEFAULT_BUILD_SETTING,
} from './config';

export function init({
  ciLib,
  appId,
  type = 'miniProgram',
  projectPath,
  privateKeyPath,
  ignores = ['node_modules/**/*'],
}) {
  const projectCI = new ciLib.Project({
    appid: appId,
    type,
    projectPath,
    privateKeyPath,
    ignores,
  });
  return projectCI;
}

export async function preview(args) {
  let tryTimes = 0;
  const MAX_TRY_TIMES = 3;

  try {
    await tryPreview(args);
  } catch (err) {
    if (tryTimes < MAX_TRY_TIMES) {
      tryTimes += 1;

      await tryPreview(args);
    }
  }
}


async function tryPreview({
  ciLib,
  projectCI,
  desc,
  robot,
  setting = DEFAULT_BUILD_SETTING,
  dest,
}) {
  const previewResult = await ciLib.preview({
    project: projectCI,
    desc,
    setting,
    qrcodeFormat: 'image',
    qrcodeOutputDest: dest,
    robot,
    // pagePath: 'pages/index/index', // 预览页面
    // searchQuery: 'a=1&b=2',  // 预览参数 [注意!]这里的`&`字符在命令行中应写成转义字符`&`
  });

  console.log('PreviewResult:\n', previewResult);

  return previewResult;
}


async function tryUpload({
  ciLib,
  projectCI,
  version,
  desc,
  robot,
  setting = DEFAULT_BUILD_SETTING,
}) {
  const uploadResult = await ciLib.upload({
    project: projectCI,
    version,
    desc,
    robot,
    setting,
  });

  console.log('UploadResult:\n', uploadResult);
}


export async function upload(args) {
  let tryTimes = 0;
  const MAX_TRY_TIMES = 3;

  try {
    await tryUpload(args);
  } catch (err) {
    if (tryTimes < MAX_TRY_TIMES) {
      tryTimes += 1;

      await tryUpload(args);
    } else {
      throw new Error(err as any);
    }
  }
}


