import { execCommand } from '../node/node-command';
import type { IGitCommitInfo } from './types';

/**
 * 获取当前分支
 * @returns {string} 分支名称
 *
 * @example
 *
 * getGitCurBranch()
 *
 * // => master
 */
export function getGitCurBranch(root?: string) {
  const res = execCommand('git symbolic-ref --short -q HEAD', root);
  return res;
}

/**
 * 获取提交信息
 * @param {string} root 根路径
 * @param {boolean} mergeCommit 是否包含 merge 的提交
 * @param {boolean} splitMessage 是否去掉提交信息的前缀
 * @returns {string} 提交信息
 *
 * @example
 * ```ts
 * getGitCommitMessage()
 * // '优化一部分文档'
 * ```
 */
export function getGitCommitMessage(root?: string, mergeCommit = false, splitMessage = false) {
  const infoMessage = execCommand(
    `git log ${mergeCommit ? '' : '--no-merges'} -1 \
  --format=%s | cat`,
    root,
  );

  if (splitMessage) {
    const message = (infoMessage.split(':')[1] || infoMessage.split('：')[1] || '').trim();
    return message;
  }

  return infoMessage;
}


/**
 * 获取提交信息
 * @param {string} root 根路径
 * @param {boolean} mergeCommit 是否包含 merge 的提交
 * @param {boolean} splitMessage 是否去掉提交信息的前缀
 * @returns {Object} 提交对象
 *
 * @example
 * ```ts
 * getGitCommitInfo()
 * {
 *   author: 'novlan1',
 *   message: ' 优化一部分文档',
 *   hash: '0cb71f9',
 *   date: '2022-10-02 10:34:31 +0800',
 *   timeStamp: '1664678071',
 *   branch: 'master'
 * }
 * ```
 */
export function getGitCommitInfo(root?: string, mergeCommit = false, splitMessage = false): IGitCommitInfo {
  const command = `
  git log ${mergeCommit ? '' : '--no-merges'} -1 \
  --date=iso --pretty=format:'{"author": "%aN", "hash": "%h", "date": "%ad", "timeStamp": "%at"},' \
  $@ | \
  perl -pe 'BEGIN{print "["}; END{print "]\n"}' | \
  perl -pe 's/},]/}]/'`;
  const stdout = execCommand(command, root);
  let info = {
    author: 'UNKNOWN',
    message: 'UNKNOWN',
    hash: 'UNKNOWN',
    date: 'UNKNOWN',
    timeStamp: '0',
    branch: '',
  };

  try {
    // 如果提交信息包括双引号，会解析失败
    info = JSON.parse(stdout)[0];
  } catch (err) {
    console.warn('[getGitCommitInfo] parse error');
  }

  info.branch = getGitCurBranch(root);
  info.message = getGitCommitMessage(root, mergeCommit, splitMessage);

  return info;
}


/**
 * 获取最新tag
 * @returns {string} 最新tag
 */
export function getGitLastTag(root?: string) {
  const fakeFirstTag = execCommand('git tag -l', root);
  if (!fakeFirstTag) return '';

  // 不能使用`git tag | head -1`，这个命令不准
  const command = 'git describe --abbrev=0';

  const tag = execCommand(command, root);
  return tag || '';
}


/**
 * 获取tag到head的提交数目
 * @param {string} tag git标签
 * @returns {string} tag至今的提交数目
 */
export function getGitCommitsBeforeTag(tag: string, root?: string) {
  if (!tag) return '0';
  return execCommand(`git log ${tag}...HEAD --no-merges --oneline | wc -l`, root);
}

/**
 * 获取打标签的时间
 * @private
 * @param {string} tag git标签
 * @returns {string} 标签时间
 */
export function getGitTagTime(tag: string, root?: string) {
  if (!tag) return '';
  return execCommand(`git log -1 --format=%ai ${tag} | cat`, root);
}


/**
 * 获取当前用户
 * @param isPriorGit - 是否优先使用git用户信息
 * @returns user
 */
export function getGitAuthor(isPriorGit = false, root?: string) {
  const envAuthor = process.env.VUE_APP_AUTHOR;
  let gitAuthor = '';
  try {
    gitAuthor = execCommand('git config user.name', root);
  } catch (err) {
    console.log('[getAuthor] err: ', err);
  }
  if (isPriorGit) {
    return gitAuthor || envAuthor || '';
  }
  return envAuthor || gitAuthor || '';
}
