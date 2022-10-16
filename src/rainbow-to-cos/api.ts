/* eslint-disable @typescript-eslint/no-require-imports */
import { queryGroupInfo } from '../rainbow/rainbow-admin';
import { getSavePath, getSaveDir } from './helper/helper';


const readCOSConfig = (savePath) => {
  const fs = require('fs');
  let content = [];
  try {
    let str = '[]';
    if (fs.existsSync(savePath)) {
      str = fs.readFileSync(savePath, {
        encoding: 'utf-8',
      });
    }
    content = JSON.parse(str);
  } catch (err) {
    console.log('readCOSConfig.err: \n', err);
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
    const savePath = getSavePath({
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

    const originConfig = readCOSConfig(savePath);

    queryGroupInfo({
      secretInfo,
    }).then((res = []) => {
      const config = res.map(config => ({
        key: config.key,
        value: config.value,
        valueType: config.value_type,
      }));

      const equal = JSON.stringify(config, null, 0) === JSON.stringify(originConfig, null, 0);
      console.log(`七彩石配置是否有更新 ${appName}·${groupName}·${envName}: ${!equal}`);

      fs.writeFileSync(savePath, JSON.stringify(config, null, 2));

      resolve({
        config,
        originConfig,
        equal,
      });
    });
  });
}


