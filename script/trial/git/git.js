const { getGitCommitInfo } = require('../../../lib/git/git');

function main() {
  const mergeCommit = true;
  const splitMessage = true;
  const res = getGitCommitInfo('/Users/yang/Documents/git-woa/hp-match', mergeCommit, splitMessage);
  console.log('res', res);
}

main();
