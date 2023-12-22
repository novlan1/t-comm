import * as path from 'path';
import { spawnSync } from 'child_process';

import { getIPAddress, getIPAddressStr } from '../ip/ip';

import { getPublishRootDir, getPublishEnvValue, getPublishBashPath, getPublishModuleName } from './helper';
import { postFile } from './post-file';
import { ENV_MAP, PUBLISH_ENV_MAP, PUBLISH_HOST_ENV } from './config';
import type { IPublishOptions } from './types';

const rootDir = getPublishRootDir();
const PUBLISH_BASH_FILE = getPublishBashPath();


function getDevPwd() {
  const devHostName = getPublishEnvValue(ENV_MAP.DEV_HOST_NAME);
  const devHostPwd = getPublishEnvValue(ENV_MAP.DEV_HOST_PWD);

  return {
    devHostName,
    devHostPwd,
  };
}

function validate({
  dir,
  publishPathProd,
  publishPathTest,
  publishEnv,
}: {
  dir: string;
  publishPathProd: string;
  publishPathTest: string;
  publishEnv: string;
}) {
  if (!dir || typeof dir !== 'string') {
    console.log('[publish] 模块名称不正确，请检查.env.local');
    return 0;
  }

  if (!publishPathProd || typeof publishPathProd !== 'string') {
    console.log('[publish] 正式环境发布路径不正确，请检查.env');
    return 0;
  }

  if (!publishPathTest || typeof publishPathTest !== 'string') {
    console.log('[publish] 测试环境发布路径不正确，请检查.env');
    return 0;
  }
  // 禁止本机发布
  if ((getIPAddress().indexOf('10.45') === 0 || getIPAddress().indexOf('10.20') === 0) && publishEnv === PUBLISH_ENV_MAP.PROD) {
    console.log('[publish] 禁止在本机发布!');
    return 0;
  }
  return true;
}

export async function localPublish(options: IPublishOptions) {
  const dir = getPublishEnvValue(ENV_MAP.VUE_APP_DIR);
  const author = getPublishEnvValue(ENV_MAP.VUE_APP_AUTHOR);
  const publishPathProd = getPublishEnvValue(ENV_MAP.VUE_APP_PATH_PROD);
  const publishPathTest = getPublishEnvValue(ENV_MAP.VUE_APP_PATH_TEST);
  const { publishEnv = PUBLISH_ENV_MAP.TEST } = options;

  if (!validate({
    dir,
    publishPathProd,
    publishPathTest,
    publishEnv,
  })) {
    return;
  }

  console.log('[publish] 准备发布模块:', dir);

  const moduleName = getPublishModuleName(dir);

  const staticDir = 'static';
  const tarName = `static_${moduleName}_${getIPAddressStr()}`;
  const fileSrc = options.fileTar || path.join(rootDir, 'dist', dir, staticDir, `${tarName}.tar`);
  const fileAll = options.fileDir || path.join(rootDir, 'dist', dir, staticDir);

  console.log('[publish] moduleName: ', moduleName);

  await realPublish({
    publishEnv,
    publishPathProd,
    publishPathTest,

    moduleName,
    fileAll,
    fileSrc,
    author,
    dir,
    options,
  });
}

async function realPublish({
  publishEnv,
  publishPathProd,
  publishPathTest,

  moduleName,
  fileAll,
  fileSrc,
  author,
  dir,
  options,
}: {
  publishEnv: string;
  publishPathProd: string;
  publishPathTest: string;

  moduleName: string;
  fileAll: string;
  fileSrc: string;
  author: string;
  dir: string;
  options: IPublishOptions;
}) {
  let desc = '';
  let env: string = PUBLISH_HOST_ENV.TEST;

  const shell: Record<string, any> = {};
  shell.runSync = function (cmd: string, args: Array<string>, options: Record<string, any>) {
    const shellResult = spawnSync(cmd, args, options);
    if (shellResult.status !== 0) {
      console.log('[publish] failed: ', shellResult.stderr);
    }
    return shellResult;
  };


  if (publishEnv === PUBLISH_ENV_MAP.PROD) {
    desc = `${publishPathProd}/${moduleName}`;
    env = PUBLISH_HOST_ENV.PROD;
  } else if (publishEnv === PUBLISH_ENV_MAP.DEV_CLOUD) {
    const {
      devHostName,
      devHostPwd,
    } = getDevPwd();

    if (!devHostName || !devHostPwd) {
      console.log('[publish] failed: ', `没有找到有效的 ${ENV_MAP.DEV_HOST_NAME} 或 ${ENV_MAP.DEV_HOST_PWD}`);
      return;
    }

    if (options?.publishTargetDir) {
      shell.runSync('sh', [PUBLISH_BASH_FILE, fileAll, options.publishTargetDir, devHostName, devHostPwd], {
        stdio: 'inherit',
      });
    } else if (moduleName === 'mobile-official-web') {
      shell.runSync('sh', [PUBLISH_BASH_FILE, fileAll, '/root/html/', devHostName, devHostPwd]);
    } else {
      shell.runSync('sh', [PUBLISH_BASH_FILE, fileAll, `/root/html/${moduleName}/`, devHostName, devHostPwd], {
        stdio: 'inherit',
      });
    }
    return;
  } else {
    desc = `${publishPathTest}/${moduleName}`;
    env = PUBLISH_HOST_ENV.TEST;
  }

  const fileDataInfo = [
    { urlKey: 'src', urlValue: fileSrc },
    { urlKey: 'des', urlValue: desc },
    { urlKey: 'env', urlValue: env },
    { urlKey: 'author', urlValue: author || '' },
  ];

  console.log('[publish] ', { fileDataInfo });

  const files = [{ urlKey: 'src', urlValue: fileSrc }];

  await postFile(fileDataInfo, files, options)
    .then((data: any) => {
      if (data.r == 0) {
        console.log(`[发布成功]........publish ${dir} to ${env} success........\n`);
      } else {
        console.log('[发布失败]', data);
      }
    })
    .catch((err) => {
      console.log('[发布失败]', err);
    });
}
