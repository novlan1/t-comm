/* eslint-disable @typescript-eslint/no-require-imports */
import { hyphenate } from '../../base/string';

import { getJsonLogDir, readJsonLog } from '../../node/fs-util';
import { getCosUrlLink } from '../../tencent-cloud/cos/link';

import { RAINBOW_VALUE_TYPE_MAP } from './value-type';

import type { ICosInfo, ILocalConfig } from '../types';
import type { RainbowKeyValueType } from './value-type';


export function getSaveFileName({
  appName,
  groupName,
  envName,
  key,
  valueType,
}: {
  appName: string;
  groupName: string;
  envName: string;
  key: string;
  valueType: RainbowKeyValueType;
}) {
  const ext = RAINBOW_VALUE_TYPE_MAP[valueType]?.ext || 'txt';

  return `${hyphenate(appName)}__${hyphenate(groupName)}__${hyphenate(envName)}__${key}.${ext}`;
}

export function getSavePath({
  appName,
  groupName,
  envName,
  key,
  valueType,
}: {
  appName: string;
  groupName: string;
  envName: string;
  key: string;
  valueType: RainbowKeyValueType;
}) {
  const path = require('path');
  return path.resolve(getJsonLogDir(), getSaveFileName({
    appName,
    groupName,
    envName,
    key,
    valueType,
  }));
}

export function getCOSFilePath({
  appName,
  groupName,
  envName,
  key,
  valueType,
  cosInfo,
}: {
  appName: string;
  groupName: string;
  envName: string;
  key: string;
  valueType: RainbowKeyValueType;
  cosInfo: ICosInfo
}) {
  const saveFileName = getSaveFileName({
    appName,
    groupName,
    envName,
    key,
    valueType,
  });

  const { bucket, region, dir } = cosInfo;

  return getCosUrlLink({
    bucket,
    region,
    dir,
    fileName: saveFileName,
  });
}


export const readCOSConfig = (saveFileName: string): ILocalConfig => {
  let content = [];
  try {
    content = JSON.parse(readJsonLog(saveFileName, '[]'));
  } catch (err) {
    console.log('[readCOSConfig] err: \n', err);
  }
  return content;
};
