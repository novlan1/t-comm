/* eslint-disable @typescript-eslint/no-require-imports */
import { uploadCOSFile } from '../cos';
import { getSavePath, getSaveFileName } from './helper/helper';


function pushCOSFiles(list) {
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

function removeTmpFiles(cosKeyList) {
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
}) {
  const fs = require('fs');
  const cosKeyList = getCOSKeyAndSavePath({
    configList,
    secretInfo,
    appName,
    cosDir: cosInfo.dir,
  });

  cosKeyList.forEach((item) => {
    fs.writeFileSync(item.savePath, item.value, {
      encoding: 'utf-8',
    });
  });

  const files = pushCOSFiles(cosKeyList);

  await uploadCOSFile({
    files,
    ...cosInfo,
  });

  await removeTmpFiles(cosKeyList);
}

