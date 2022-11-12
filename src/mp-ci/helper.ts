/* eslint-disable @typescript-eslint/no-require-imports */
import { getGitCommitInfo } from '../git/git';

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
