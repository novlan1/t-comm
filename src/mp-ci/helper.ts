/* eslint-disable @typescript-eslint/no-require-imports */
import { getGitCommitInfo } from '../git/git';
import { BUNDLE_NAME_MAP } from './config';
import { formatBite } from '../util/format-bite';
import { genRobotMessage } from '../wecom-robot/message';
import type { IUploadResult } from './types';


export function getBundleBuildDesc({
  root,
  env = 'test',
}: {
  root: string;
  env?: string;
}) {
  const commitInfo = getGitCommitInfo(root);
  const buildDesc = genRobotMessage([
    [
      {
        label: '环境',
        content: env || '',
      },
      {
        label: '分支',
        content: commitInfo.branch,
      },
      {
        label: '最后提交',
        content: `${commitInfo.author} - ${commitInfo.message}`,
      },
    ],
  ]);
  return buildDesc;
}

export function getBundleVersion(root: string) {
  const path = require('path');
  const pkgFile = path.resolve(root, './package.json');
  const pkg = require(pkgFile) || {};
  return pkg.version;
}

/**
 * 解析上传结果
 */
export function parseUploadResult(result: IUploadResult) {
  const {
    subPackageInfo,
  } = result;
  subPackageInfo.reverse();
  const list = subPackageInfo.sort((a, b) => {
    const keys = Object.keys(BUNDLE_NAME_MAP);
    if (keys.indexOf(a.name) > -1 || keys.indexOf(b.name) > -1) {
      return keys.indexOf(b.name) - keys.indexOf(a.name);
    }
    return b.size - a.size;
  })
    .map(pkg => `- ${(BUNDLE_NAME_MAP as Record<string, string>)[pkg.name] || pkg.name}: ${formatBite(pkg.size)}`);
  list.unshift('PACKAGE SIZE INFO: ');
  return list;
}

export function flattenSubPackages(result: IUploadResult) {
  const {
    subPackageInfo = [],
  } = result || {};
  return subPackageInfo.reduce((acc: Record<string, any>, item) => {
    acc[item.name] = item;
    return acc;
  }, {});
}
