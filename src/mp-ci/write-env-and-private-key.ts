import * as fs from 'fs';
import * as path from 'path';
import { fetchRainbowConfig } from '../rainbow/rainbow-user';


// 从七彩石获取CI配置
export async function getCIConfig(rainbowConfigKey, rainbowSecretInfo): Promise<any> {
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
function writeEnv(robot, localEnv = '') {
  fs.writeFileSync('.env.local', `
${localEnv}
VUE_APP_AUTHOR=CI Robot ${robot}
`, {
    flag: 'a',
    encoding: 'utf-8',
  });
}


// 写入密钥
function writePrivateKey(root, privateKey) {
  const nRoot = root || process.cwd();

  fs.writeFileSync(path.resolve(nRoot, 'private.key'), privateKey, {
    encoding: 'utf-8',
  });
}


export async function writeEnvAndPrivateKey({
  branch,
  env,
  root,

  rainbowConfigKey,
  rainbowAppId,
  rainbowEnvName,
  rainbowGroupName,
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


