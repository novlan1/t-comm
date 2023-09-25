const { getGitCommitInfo } = require('../../../lib/git/git');

function main() {
  const mergeCommit = true;
  const res = getGitCommitInfo('/Users/yang/Documents/git/pro', mergeCommit);
  console.log('res', res);
}

main();
