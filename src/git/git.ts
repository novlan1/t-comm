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
export function getGitCurBranch(root?: string) {
  const res = execCommand('git symbolic-ref --short -q HEAD', root);
  return res;
}


/**
 * 获取提交信息
 * @returns {Object} 提交对象
 *
 * @example
 * getGitCommitInfo()
 * {
 *   author: 'novlan1',
 *   message: ' 优化一部分文档',
 *   hash: '0cb71f9',
 *   date: '2022-10-02 10:34:31 +0800',
 *   timeStamp: '1664678071',
 *   branch: 'master'
 * }
 */
export function getGitCommitInfo(root?: string) {
  const command = 'git log --no-merges -1 \
  --date=iso --pretty=format:\'{"author": "%aN","message": "%s", "hash": "%h", "date": "%ad", "timeStamp": "%at"},\' \
  $@ | \
  perl -pe \'BEGIN{print "["}; END{print "]\n"}\' | \
  perl -pe \'s/},]/}]/\'';
  const stdout = execCommand(command, root);

  const info = Object.assign({}, JSON.parse(stdout)[0], {
    branch: getGitCurBranch(root),
  });

  const message = (info.message.split(':')[1] || info.message.split('：')[1] || '').trim();
  const res = Object.assign({}, info, {
    message: message || info.message,
  });
  return res;
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
  return tag;
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
