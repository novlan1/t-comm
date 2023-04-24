/* eslint-disable @typescript-eslint/no-require-imports */
import { fetchRainbowConfig } from './rainbow-user';

export async function writeEnvFromRainbow({
  envPath,
  rainbowAppId,
  rainbowKey,

  envName,
  groupName,
}) {
  let appId = rainbowAppId;

  if (!appId) {
    readLocalEnv(envPath);
    appId = process.env.RAINBOW_APP_ID;
  }

  if (!appId) {
    throw new Error('缺少 RAINBOW_APP_ID');
  }

  const str = await fetchRainbowConfig(rainbowKey, {
    appId,
    envName,
    groupName,
  }).catch((err) => {
    console.log('[fetchRainbowConfig] err', err);
  });

  require('fs').writeFileSync(envPath, str, {
    encoding: 'utf-8',
  });

  readLocalEnv(envPath);

  return true;
}

function readLocalEnv(envPath) {
  require('dotenv').config({ path: envPath });
}


