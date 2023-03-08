/* eslint-disable @typescript-eslint/no-require-imports */
import { hyphenate } from '../../base/string';
import { RAINBOW_VALUE_TYPE_MAP } from './value-type';
import { getJsonLogDir } from '../../util/fs-util';

export function getSaveFileName({
  appName,
  groupName,
  envName,
  key,
  valueType,
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
}) {
  const saveFileName = getSaveFileName({
    appName,
    groupName,
    envName,
    key,
    valueType,
  });

  const { bucket, region, dir } = cosInfo;

  return `https://${bucket}.cos.${region}.myqcloud.com/${dir}/${saveFileName}`;
}

