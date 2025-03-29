import * as fs from 'fs';
import * as path from 'path';

import { writeFileSync } from '../fs/fs';
import { fetchRainbowConfig } from '../rainbow/rainbow-user';


// 从七彩石获取CI配置
export async function getCIConfig(
  rainbowConfigKey: string,
  rainbowSecretInfo: Parameters<typeof fetchRainbowConfig>[1],
): Promise<any> {
  let res = {};
  const str = await fetchRainbowConfig(rainbowConfigKey, rainbowSecretInfo);
  try {
    res = JSON.parse(str);
  } catch (err) {}
  return res;
}


// 获取robot
export function getRobot({
  config,
  branch,
  env,
}: {
  config: Record<string, any>;
  branch: string;
  env: string;
}) {
  const configRobot = config?.robotMap?.[branch]?.[env];
  if (configRobot) {
    return configRobot;
  }
  // if (env === 'release') return 2;
  return 1;
}


// 写入环境变量
function writeEnv(robot: number, localEnv = '') {
  fs.writeFileSync('.env.local', `
${localEnv}
VUE_APP_AUTHOR=CI Robot ${robot}
`, {
    flag: 'a',
    encoding: 'utf-8',
  });
}


// 写入密钥
function writePrivateKey(root: string, privateKey: string) {
  const nRoot = root || process.cwd();

  writeFileSync(path.resolve(nRoot, 'private.key'), privateKey);
}


export async function writeEnvAndPrivateKey({
  branch,
  env,
  root,

  rainbowConfigKey,
  rainbowAppId,
  rainbowEnvName,
  rainbowGroupName,
}: Record<'branch' | 'env' | 'rainbowConfigKey' | 'rainbowAppId' | 'rainbowEnvName' | 'rainbowGroupName' | 'root', string>) {
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
  const { rainbowPrivateKey, localEnv = '', wxPrivateKey = '' } = config;

  writeEnv(robot, localEnv);
  let privateKey = wxPrivateKey;

  if (!privateKey) {
    console.log('[CI] No Default PrivateKey');
    privateKey = await fetchRainbowConfig(rainbowPrivateKey, rainbowSecretInfo);
  }

  console.log('[CI] privateKey: ', privateKey);
  writePrivateKey(root, privateKey);
}


export async function writeEnvAndPrivateKeyByOptions(options: any) {
  console.log('[options] ', options);
  const {
    branch,
    env,
    root,
    configKey: rainbowConfigKey,
    appid: rainbowAppId,
    envName: rainbowEnvName,
    groupName: rainbowGroupName,
  } = options;

  if (!branch
       || !env
       || !root
       || !rainbowConfigKey
       || !rainbowAppId
       || !rainbowEnvName
       || !rainbowGroupName
  ) {
    console.error('缺少必要参数，请检查！');
    return;
  }

  writeEnvAndPrivateKey({
    branch,
    env,
    root,

    rainbowConfigKey,
    rainbowAppId,
    rainbowEnvName,
    rainbowGroupName,
  });
}
