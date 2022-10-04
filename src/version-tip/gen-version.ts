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

function doRelease({ isFirstRelease }: {
  isFirstRelease: boolean
}) {
  if (isFirstRelease) {
    execCommand('npx standard-version --first-release');
  } else {
    execCommand('npx standard-version --release-as patch');
  }
}


/**
 * 自动生成version，核心是利用 standard-version 命令
 * @param {object} config 配置信息
 * @param {string} config.root 项目根路径
 *
 * @example
 *
 * genVersion({
 *   root: process.cwd()
 * })
 *
 */

export function genVersion({ root }) {
  const path = require('path');
  const fs = require('fs');

  if (!root) {
    console.log('\x1b[33m%s\x1b[0m', '请输入 root, 可为 process.cwd()');
    return;
  }

  const INTERVAL_TIME = 24 * 60 * 60 * 1000;


  const gitPath = path.resolve(root, '.git');
  if (!fs.existsSync(gitPath)) {
    console.log('\x1b[33m%s\x1b[0m', `未找到 ${gitPath} ，不是 Git 目录。`);
    return;
  }

  const tag = getGitLastTag();
  console.log('\x1B[32m%s\x1B[0m', `tag 为 ${tag}`);

  if (!tag) {
    doRelease({ isFirstRelease: true });
    return true;
  }

  const tagDate = getGitTagTime(tag);
  console.log('\x1B[32m%s\x1B[0m', `tagDate 为 ${tagDate}`);

  const commits = getGitCommitsBeforeTag(tag);
  console.log('\x1B[32m%s\x1B[0m', `commits 为 ${commits}`);

  if (Number(commits) < 1) {
    console.log('\x1b[33m%s\x1b[0m', `commits 为 ${commits}，小于 1`);
    return;
  }

  const tagTimeStamp = getTimeStampFromDate(tagDate);
  console.log('\x1B[32m%s\x1B[0m', `tagTimeStamp 为 ${tagTimeStamp}`);

  if (Date.now() - tagTimeStamp < INTERVAL_TIME) {
    console.log('\x1b[33m%s\x1b[0m', `间隔小于${INTERVAL_TIME}`);
    return;
  }

  doRelease({ isFirstRelease: false });

  return true;
}
