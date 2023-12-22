/* eslint-disable @typescript-eslint/no-require-imports */
import { uploadCOSFile } from '../tencent-cloud/cos';
import { getSavePath, getSaveFileName } from './helper/helper';
import { writeFileSync } from '../fs/fs';

import type {  ICosInfo, ISecretInfo, IRemoteConfig } from './types';


function pushCOSFiles(list: Array<{
  cosKey: string;
  savePath: string;
}>) {
  const files = list.map(item => ({
    key: item.cosKey,
    path: item.savePath,
  }));
  return files;
}


function getCOSKeyAndSavePath({
  configList,
  secretInfo,
  appName,
  cosDir,
}: {
  configList: Array<IRemoteConfig>
  secretInfo: ISecretInfo;
  appName: string;
  cosDir: string;
}) {
  const { groupName, envName } = secretInfo || {};

  return configList.map((config) => {
    const { key, valueType } = config;
    const savePath = getSavePath({
      appName,
      groupName,
      envName,
      key,
      valueType,
    });

    const saveFileName = getSaveFileName({
      appName,
      groupName,
      envName,
      key,
      valueType,
    });

    return {
      ...config,
      cosKey: `${cosDir}/${saveFileName}`,
      savePath,
    };
  });
}

function removeTmpFiles(cosKeyList: Array<{
  savePath: string;
}>) {
  const fs = require('fs');
  cosKeyList.forEach((item) => {
    fs.unlinkSync(item.savePath);
  });
}

export async function syncRainbowToCOS({
  configList,
  secretInfo,
  appName,
  cosInfo,
}: {
  configList: Array<IRemoteConfig>
  secretInfo: ISecretInfo;
  appName: string;
  cosInfo: ICosInfo;
}) {
  const cosKeyList = getCOSKeyAndSavePath({
    configList,
    secretInfo,
    appName,
    cosDir: cosInfo.dir,
  });

  cosKeyList.forEach((item) => {
    writeFileSync(item.savePath, item.value);
  });

  const files = pushCOSFiles(cosKeyList);

  await uploadCOSFile({
    files,
    ...cosInfo,
  });

  await removeTmpFiles(cosKeyList);
}

