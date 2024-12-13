import { fetchLatestOneRainbowData } from '../rainbow-to-cos/api';
import type { ISecretInfo, IAddedMap } from './type';


export function getHistoryModeConfigDiff({
  secretInfo,
  appName,
  key,
}: {
  secretInfo: ISecretInfo;
  appName: string;
  key: string;
}) {
  return new Promise<{
    equal: boolean;
    addedMap: IAddedMap;
    deletedMap: IAddedMap;
  }>((resolve, reject) => {
    fetchLatestOneRainbowData({
      secretInfo,
      appName,
      key,
    }).then((res) => {
      const { equal, config, originConfig } = res;
      if (equal) {
        resolve({
          equal,
          addedMap: {},
          deletedMap: {},

        });
        return;
      }

      const { addedMap, deletedMap } = findDiff(config, originConfig);
      resolve({
        equal,
        addedMap,
        deletedMap,
      });
    })
      .catch((err) => {
        reject(err);
      });
  });
}


const parsedConfig = (obj: Record<string, Array<any>>) => Object.keys(obj).reduce((
  acc: Record<string, Array<string>>,
  domain,
) => {
  const list = obj[domain];
  const names = list.map((item: Record<string, string>) => item.packageName).filter(item => item);

  acc[domain] = names;
  return acc;
}, {});


const getDiff = (current: IAddedMap, another: IAddedMap) => {
  let targetMap: IAddedMap = {};

  Object.keys(current).forEach((domain) => {
    const list = current[domain];
    list.forEach((name) => {
      const exist = another[domain]?.includes(name);
      if (!exist) {
        targetMap = {
          ...targetMap,
          [domain]: [
            ...(targetMap[domain] || []),
            name,
          ],
        };
      }
    });
  });

  return targetMap;
};


function findDiff(config: any, originConfig: any) {
  const parsed = parsedConfig(config.data);
  const originParsed = parsedConfig(originConfig.data);

  const addedMap = getDiff(parsed, originParsed);
  const deletedMap = getDiff(originParsed, parsed);

  return {
    addedMap,
    deletedMap,
  };
}
