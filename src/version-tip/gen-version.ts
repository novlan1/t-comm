/* eslint-disable @typescript-eslint/no-require-imports */
import {
  getGitLastTag,
  getGitCommitsBeforeTag,
  getGitTagTime,
} from '../git';

import { execCommand } from '../util';


function getTimeStampFromDate(date: string) {
  return new Date(date).getTime();
}

function doRelease({ isFirstRelease, root }: {
  isFirstRelease: boolean
  root?: string
}) {
  if (isFirstRelease) {
    execCommand('npx standard-version --first-release', root);
  } else {
    execCommand('npx standard-version --release-as patch', root);
  }
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
export function shouldGenVersion(root?: string): number {
  const path = require('path');
  const fs = require('fs');

  if (!root) {
    console.log('ERROR: 请输入 root, 可为 process.cwd()');
    return 0;
  }

  const INTERVAL_TIME = 24 * 60 * 60 * 1000;

  const gitPath = path.resolve(root, '.git');
  console.log('GitPath: ', gitPath);
  if (!fs.existsSync(gitPath)) {
    console.log(`ERROR: 未找到 ${gitPath} ，不是 Git 目录。`);
    return 0;
  }

  const tag = getGitLastTag(root);
  console.log(`Tag: ${tag}`);

  if (!tag) {
    return 1;
  }

  const tagDate = getGitTagTime(tag, root);
  console.log(`Tag Date: ${tagDate}`);

  const commits = getGitCommitsBeforeTag(tag, root);
  console.log(`Commit number: ${commits}`);

  if (Number(commits) < 1) {
    console.log('ERROR: commit number 小于 1');
    return 0;
  }

  const tagTimeStamp = getTimeStampFromDate(tagDate);
  console.log(`Tag TimeStamp: ${tagTimeStamp}`);

  if (Date.now() - tagTimeStamp < INTERVAL_TIME) {
    console.log(`ERROR: 间隔小于${INTERVAL_TIME}`);
    return 0;
  }

  return 2;
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

export function genVersion({ root }): boolean {
  const genType = shouldGenVersion(root);
  if (!genType) return false;
  if (genType === 1) {
    doRelease({ isFirstRelease: true, root });
    return true;
  }
  if (genType === 2) {
    doRelease({ isFirstRelease: false, root });
    return true;
  }
  return false;
}
