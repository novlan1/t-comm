/* eslint-disable @typescript-eslint/no-require-imports */
import { getGitCommitInfo } from '../git/git';
import { BUNDLE_NAME_MAP } from './config';
import { formatBite } from '../util/format-bite';


export function getBundleBuildDesc({
  root,
  env = 'test',
}) {
  const commitInfo = getGitCommitInfo(root);
  const buildDesc = `环境: ${env || ''}, 分支: ${commitInfo.branch}，最后提交: ${commitInfo.author} - ${commitInfo.message}`;
  return buildDesc;
}

export function getBundleVersion(root) {
  const path = require('path');
  const pkgFile = path.resolve(root, './package.json');
  const pkg = require(pkgFile) || {};
  return pkg.version;
}

/**
 * 解析上传结果
 */
export function parseUploadResult(result) {
  const {
    subPackageInfo,
  } = result;
  subPackageInfo.reverse();
  const list = subPackageInfo.sort((a, b) => {
    const keys = Object.keys(BUNDLE_NAME_MAP);
    if (keys.indexOf(a) > -1 || keys.indexOf(b) > -1) {
      return keys.indexOf(b) - keys.indexOf(a);
    }
    return b.size - a.size;
  })
    .map(pkg => `- ${BUNDLE_NAME_MAP[pkg.name] || pkg.name}: ${formatBite(pkg.size)}`);
  list.unshift('PACKAGE SIZE INFO: ');
  return list;
}
