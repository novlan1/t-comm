/* eslint-disable @typescript-eslint/no-require-imports */


function execCommand(command: string, root?: string): string {
  if (!root) {
    root = process.cwd();
  }
  const { execSync } = require('child_process');
  return (
    execSync(command, {
      cwd: root,
      encoding: 'utf-8',
      stdio: 'pipe',
    })
      .split('\n')[0]
      ?.trim() || ''
  );
}

/**
 * 获取最新tag
 * @private
 * @returns {string} 最新tag
 */
function getLastTag() {
  const fakeFirstTag = execCommand('git tag -l');
  console.log('\x1B[32m%s\x1B[0m', `fakeFirstTag 为 ${fakeFirstTag}`);
  if (!fakeFirstTag) return '';

  // 不能使用`git tag | head -1`，这个命令不准
  const command = 'git describe --abbrev=0';

  const tag = execCommand(command);
  return tag;
}


/**
 * 获取tag到head的提交数目
 * @private
 * @param {string} tag git标签
 * @returns {string} tag至今的提交数目
 */
function getCommitsBeforeTag(tag) {
  const command = `git log ${tag}...HEAD --no-merges --oneline | wc -l`;
  const commits = execCommand(command);
  return commits;
}

/**
 * 获取打标签的时间
 * @private
 * @param {string} tag git标签
 * @returns {string} 标签时间
 */
function getTagTime(tag) {
  const command = `git log -1 --format=%ai ${tag} | cat`;
  const tagTime = execCommand(command);
  return tagTime;
}


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

  const tag = getLastTag();
  console.log('\x1B[32m%s\x1B[0m', `tag 为 ${tag}`);

  if (!tag) {
    doRelease({ isFirstRelease: true });
    return true;
  }

  const tagDate = getTagTime(tag);
  console.log('\x1B[32m%s\x1B[0m', `tagDate 为 ${tagDate}`);

  const commits = getCommitsBeforeTag(tag);
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
