import * as path from 'path';
import { spawnSync } from 'child_process';

import { getIPAddress, getIPAddressStr } from '../ip/ip';

import { getRootDir, getEnvValue } from './helper';
import { postFile } from './post-file';
import { ENV_MAP, PUBLISH_ENV_MAP, PUBLISH_HOST_ENV } from './config';
import type { IPublishOptions } from './types';

const rootDir = getRootDir();
const PUBLISH_BASH_FILE = path.resolve(__dirname, '../script/publish.sh');


function getDevPwd() {
  const devHostName = getEnvValue(ENV_MAP.DEV_HOST_NAME);
  const devHostPwd = getEnvValue(ENV_MAP.DEV_HOST_PWD);

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
    return;
  }
  return;
}

export async function localPublish(options: IPublishOptions) {
  const dir = getEnvValue(ENV_MAP.VUE_APP_DIR);
  const author = getEnvValue(ENV_MAP.VUE_APP_AUTHOR);
  const publishPathProd = getEnvValue(ENV_MAP.VUE_APP_PATH_PROD);
  const publishPathTest = getEnvValue(ENV_MAP.VUE_APP_PATH_TEST);
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

  const moduleName = dir.split('/')[1];


  const staticDir = 'static';
  const tarName = `static_${moduleName}_${getIPAddressStr()}`;
  const fileSrc = path.join(rootDir, 'dist', dir, staticDir, `${tarName}.tar`);
  const fileAll = path.join(rootDir, 'dist', dir, staticDir);

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
  shell.runSync = function (cmd, args, options) {
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

    if (moduleName === 'mobile-official-web') {
      shell.runSync('sh', [PUBLISH_BASH_FILE, fileAll, '', devHostName, devHostPwd]);
    } else {
      shell.runSync('sh', [PUBLISH_BASH_FILE, fileAll, `${moduleName}/`, devHostName, devHostPwd], {
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
