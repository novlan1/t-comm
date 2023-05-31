import { getGitCodeLink, getGitMRLink, rmFirstAndLastSlash  } from '../util/git-link';

export function genRobotMsg({
  errorMap,
  mrId,
  mrUrl,
  repoConfig,
  total,
}: {
  errorMap: Record<string, {
    filePath: string;
    line: number;
    number: number;
  }>;
  mrId: string | number;
  mrUrl: string;
  repoConfig: any;
  total: any;
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
        line: `${line}`,
      });

      return `[${key}*${number}](${link})`;
    });

  let detail = detailList.join('，');
  if (detailList.length > 10) {
    detail += ' ...';
  }

  let mrLink = getGitMRLink({
    domain,
    repo,
    id: `${mrId}`,
  });

  if (mrUrl) {
    mrLink = mrUrl;
  }

  const getRepoName = (repo = '') => {
    const list = rmFirstAndLastSlash(repo).split('/');
    return list[list.length - 1];
  };

  const repoName = getRepoName(repo);

  const linkPostfix = mrId ? `#${mrId}` : '';

  const content = `>【Eslint错误】[${repoName}${linkPostfix}](${mrLink}) ${mrId ? 'MR' : ''}存在${total}条ESlint错误：${detail}`;

  return content;
}
