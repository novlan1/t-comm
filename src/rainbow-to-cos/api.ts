/* eslint-disable @typescript-eslint/no-require-imports */
import { queryGroupInfo } from '../rainbow/rainbow-admin';
import { getSaveFileName } from './helper/helper';
import { readJsonLog, saveJsonToLog } from '../node/fs-util';
import type { ISecretInfo, ILocalConfig, IRemoteConfig } from './types';

const readCOSConfig = (saveFileName: string): ILocalConfig => {
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
}: {
  secretInfo: ISecretInfo;
  appName: string;
}): Promise<{
    config: Array<IRemoteConfig>;
    originConfig: ILocalConfig;
    equal: boolean;
  }> {
  return new Promise((resolve) => {
    const { groupName, envName } = secretInfo || {};
    const saveFileName = getSaveFileName({
      appName,
      groupName,
      envName,
      key: 'all_data',
      valueType: 4,
    });

    const originConfig = readCOSConfig(saveFileName);

    queryGroupInfo({
      secretInfo,
    }).then((res = []) => {
      const configList = res.map(config => ({
        key: config.key,
        value: config.value,
        valueType: config.value_type,
      }));

      const equal = JSON.stringify(configList, null, 0) === JSON.stringify(originConfig, null, 0);
      console.log(`[fetchLatestRainbowData] 七彩石配置是否有更新 ${appName}·${groupName}·${envName}: ${!equal}`);

      saveJsonToLog(configList, saveFileName);

      resolve({
        config: configList,
        originConfig,
        equal,
      });
    });
  });
}


