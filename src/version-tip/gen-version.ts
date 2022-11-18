/* eslint-disable @typescript-eslint/no-require-imports */
import {
  getGitLastTag,
  getGitCommitsBeforeTag,
  getGitTagTime,
} from '../git';

import { execCommand } from '../util';
import { TAG_MAP } from './config';

function getTimeStampFromDate(date: string) {
  return new Date(date).getTime();
}

function doRelease({ isFirstRelease, root }: {
  isFirstRelease: boolean
  root?: string
}) {
  console.log('[GEN VERSION] Doing standard-version ...');

  if (isFirstRelease) {
    execCommand('npx standard-version --first-release', root);
  } else {
    execCommand('npx standard-version --release-as patch', root);
  }

  console.log('[GEN VERSION] Done standard-version.');
}

/**
 * 是否应该执行 standard-version
 * 返回0，不执行
 * 返回1，执行--first-release
 * 返回2，执行--release-as patch
 * @private
 * @param {string} [] 命令执行目录
 * @returns {number} 是否应该执行 standard-version
 */
export function shouldGenVersion(root?: string, forceGenVersion?: boolean): number {
  const path = require('path');
  const fs = require('fs');

  if (!root) {
    console.log('[GEN VERSION] ERROR: Please input root. Such as process.cwd()');
    return TAG_MAP.NO_TAG;
  }

  const INTERVAL_TIME = 24 * 60 * 60 * 1000;

  const gitPath = path.resolve(root, '.git');
  console.log('[GEN VERSION] GitPath: ', gitPath);
  if (!fs.existsSync(gitPath)) {
    console.log(`[GEN VERSION] ERROR: NOT FOUND .git of ${gitPath}`);
    return TAG_MAP.NO_TAG;
  }

  const tag = getGitLastTag(root);
  console.log(`[GEN VERSION] Tag: ${tag}`);

  if (!tag) {
    return TAG_MAP.FIRST_TAG;
  }
  if (forceGenVersion) {
    return TAG_MAP.MORE_TAG;
  }

  const tagDate = getGitTagTime(tag, root);
  console.log(`[GEN VERSION] Tag Date: ${tagDate}`);

  const commits = getGitCommitsBeforeTag(tag, root);
  console.log(`[GEN VERSION] Commit number: ${commits}`);

  if (Number(commits) < 1) {
    console.log('[GEN VERSION] ERROR: commit number less than 1');
    return TAG_MAP.NO_TAG;
  }

  const tagTimeStamp = getTimeStampFromDate(tagDate);
  console.log(`[GEN VERSION] Tag TimeStamp: ${tagTimeStamp}`);

  if (Date.now() - tagTimeStamp < INTERVAL_TIME) {
    console.log(`[GEN VERSION] ERROR: 间隔小于${INTERVAL_TIME}`);
    return TAG_MAP.NO_TAG;
  }

  return TAG_MAP.MORE_TAG;
}


/**
 * 自动生成version，核心是利用 standard-version 命令
 * @param {object} config 配置信息
 * @param {string} config.root 项目根路径
 * @returns {boolean} 是否执行了 standard-version
 * @example
 *
 * genVersion({
 *   root: process.cwd()
 * })
 *
 */

export function genVersion({
  root,
  forceGenVersion,
}): boolean {
  const genType = shouldGenVersion(root, forceGenVersion);
  if (!genType) return false;
  if (genType === TAG_MAP.FIRST_TAG) {
    doRelease({ isFirstRelease: true, root });
    return true;
  }
  if (genType === TAG_MAP.MORE_TAG) {
    doRelease({ isFirstRelease: false, root });
    return true;
  }
  return false;
}
