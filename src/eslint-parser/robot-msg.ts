import { getGitCodeLink, getGitMRLink, rmFirstAndLastSlash  } from '../util/git-link';

export function genRobotMsg({
  errorMap,
  mrId,
  repoConfig,
  total,
}) {
  const {
    domain,
    repo,
    branch,
  } = repoConfig;

  const detailList = Object.keys(errorMap)
    .map((key) => {
      const { filePath, line, number } = errorMap[key];

      const link = getGitCodeLink({
        domain,
        repo,
        branch,
        localFile: filePath,
        line,
      });

      return `[${key}*${number}](${link})`;
    });

  let detail = detailList.join('，');
  if (detailList.length > 10) {
    detail += '...';
  }

  const mrLink = getGitMRLink({
    domain,
    repo,
    id: mrId,
  });

  const getRepoName = (repo = '') => {
    const list = rmFirstAndLastSlash(repo).split('/');
    return list[list.length - 1];
  };

  const repoName = getRepoName(repo);

  const linkPostfix = mrId ? `#${mrId}` : '';

  const content = `>【Eslint错误】[${repoName}${linkPostfix}](${mrLink}) ${mrId ? 'MR' : ''}存在${total}条ESlint错误：${detail}`;

  return content;
}
