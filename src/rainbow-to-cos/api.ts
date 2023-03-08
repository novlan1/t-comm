/* eslint-disable @typescript-eslint/no-require-imports */
import { queryGroupInfo } from '../rainbow/rainbow-admin';
import { getSaveFileName, getSaveDir } from './helper/helper';
import { readJsonLog, saveJsonToLog } from '../util/fs-util';


const readCOSConfig = (saveFileName) => {
  let content = [];
  try {
    content = JSON.parse(readJsonLog(saveFileName, '[]'));
  } catch (err) {
    console.log('[readCOSConfig] err: \n', err);
  }
  return content;
};


export function fetchLatestRainbowData({
  secretInfo,
  appName,
}): Promise<{
    config: Array<object>
    originConfig: Array<object>
    equal: boolean
  }> {
  return new Promise((resolve) => {
    const fs = require('fs');
    const { groupName, envName } = secretInfo || {};
    const saveFileName = getSaveFileName({
      appName,
      groupName,
      envName,
      key: 'all_data',
      valueType: 4,
    });

    const dir = getSaveDir();
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const originConfig = readCOSConfig(saveFileName);

    queryGroupInfo({
      secretInfo,
    }).then((res = []) => {
      const config = res.map(config => ({
        key: config.key,
        value: config.value,
        valueType: config.value_type,
      }));

      const equal = JSON.stringify(config, null, 0) === JSON.stringify(originConfig, null, 0);
      console.log(`[fetchLatestRainbowData] 七彩石配置是否有更新 ${appName}·${groupName}·${envName}: ${!equal}`);

      saveJsonToLog(config, saveFileName);

      resolve({
        config,
        originConfig,
        equal,
      });
    });
  });
}


