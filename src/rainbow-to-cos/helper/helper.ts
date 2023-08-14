/* eslint-disable @typescript-eslint/no-require-imports */
import { hyphenate } from '../../base/string';
import { RAINBOW_VALUE_TYPE_MAP } from './value-type';
import { getJsonLogDir } from '../../node/fs-util';
import { getCosUrlLink } from '../../tencent-cloud/cos/link';
import type { RainbowKeyValueType } from './value-type';
import type { ICosInfo } from '../types';

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

