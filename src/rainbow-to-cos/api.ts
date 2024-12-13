import { queryGroupInfo } from '../rainbow/rainbow-admin';
import { fetchRainbowConfig } from '../rainbow/rainbow-user';
import { saveJsonToLog } from '../node/fs-util';

import { getSaveFileName, readCOSConfig } from './helper/helper';
import type { ISecretInfo, ILocalConfig, IRemoteConfig } from './types';
import { RainbowKeyValueType } from './helper/value-type';


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


export function fetchLatestOneRainbowData({
  secretInfo,
  appName,
  key,
  valueType = 4,
}: {
  secretInfo: {
    appId: string;
    groupName: string;
    envName: string;
  };
  appName: string;
  key: string;
  valueType?: RainbowKeyValueType
}): Promise<{
    config: Array<IRemoteConfig>;
    originConfig: ILocalConfig;
    equal: boolean;
  }> {
  return new Promise((resolve, reject) => {
    const { groupName, envName } = secretInfo || {};
    const saveFileName = getSaveFileName({
      appName,
      groupName,
      envName,
      key,
      valueType,
    });

    const originConfig = readCOSConfig(saveFileName);

    fetchRainbowConfig(key, secretInfo).then((res) => {
      let config = res;
      try {
        config = JSON.parse(res);
      } catch (err) {
      }
      const equal = JSON.stringify(config, null, 0) === JSON.stringify(originConfig, null, 0);
      console.log(`[fetchLatestOneRainbowData] 是否有更新 ${appName}·${groupName}·${envName}.${key}: ${!equal}`);

      saveJsonToLog(config, saveFileName);

      resolve({
        config,
        originConfig,
        equal,
      });
    })
      .catch((err) => {
        reject(err);
      });
  });
}
