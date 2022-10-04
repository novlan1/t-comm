/* eslint-disable @typescript-eslint/no-require-imports */
import { execCommand } from '../util';

/**
 * 获取当前分支
 * @returns {string} 分支名称
 *
 * @example
 *
 * getBranch()
 *
 * // => master
 */
export function getGitCurBranch() {
  const { execSync } = require('child_process');
  const res = execSync('git symbolic-ref --short -q HEAD', {
    encoding: 'utf-8',
    stdio: 'pipe',
  }).replace(/\n/g, '');
  return res;
}


/**
 * 获取提交信息
 * @returns {Object} 提交对象
 *
 * @example
 * getCommitInfo()
 * {
 *   author: 'novlan1',
 *   message: ' 优化一部分文档',
 *   hash: '0cb71f9',
 *   date: '2022-10-02 10:34:31 +0800',
 *   timeStamp: '1664678071',
 *   branch: 'master'
 * }
 */
export function getGitCommitInfo() {
  const { execSync } = require('child_process');
  const command = 'git log --no-merges -1 \
  --date=iso --pretty=format:\'{"author": "%aN","message": "%s", "hash": "%h", "date": "%ad", "timeStamp": "%at"},\' \
  $@ | \
  perl -pe \'BEGIN{print "["}; END{print "]\n"}\' | \
  perl -pe \'s/},]/}]/\'';
  const stdout = execSync(command, {
    encoding: 'utf-8',
  });

  const info = Object.assign({}, JSON.parse(stdout)[0], {
    branch: execSync('git symbolic-ref --short -q HEAD', {
      encoding: 'utf-8',
    }).replace(/\n$/, ''),
  });


  const res = Object.assign({}, info, {
    message:
    info.message.split(':')[1] || info.message.split('：')[1] || '',
  });
  return res;
}


/**
 * 获取最新tag
 * @returns {string} 最新tag
 */
export function getGitLastTag() {
  const fakeFirstTag = execCommand('git tag -l');
  if (!fakeFirstTag) return '';

  // 不能使用`git tag | head -1`，这个命令不准
  const command = 'git describe --abbrev=0';

  const tag = execCommand(command);
  return tag;
}


/**
 * 获取tag到head的提交数目
 * @param {string} tag git标签
 * @returns {string} tag至今的提交数目
 */
export function getGitCommitsBeforeTag(tag) {
  if (!tag) return '0';
  return execCommand(`git log ${tag}...HEAD --no-merges --oneline | wc -l`);
}

/**
 * 获取打标签的时间
 * @private
 * @param {string} tag git标签
 * @returns {string} 标签时间
 */
export function getGitTagTime(tag) {
  if (!tag) return '';
  return execCommand(`git log -1 --format=%ai ${tag} | cat`);
}
