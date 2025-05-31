import { getGitCurBranch } from '../git/git';


export const genTitle = (
  prefix: string,
  checkAll?: boolean,
  name = 'LINT',
) => (`${prefix}${checkAll ? `【${name}】全量模式` : `【${name}】增量模式`}`);


export const genReportInfo = ({
  workspace,

  mrUrl,
  sourceBranch,
  targetBranch,

  repo,
  repoUrl,

  checkAll = false,
}: {
  workspace: string;

  mrUrl?: string;
  sourceBranch?: string;
  targetBranch?: string;

  repo?: string;
  repoUrl?: string;

  checkAll?: boolean;
}) => {
  const curBranch = getGitCurBranch(workspace);


  const repoAndMrInfo = [
    mrUrl ? `[${mrUrl}](${mrUrl})` : '',
    (sourceBranch && targetBranch) ? `${sourceBranch} => ${targetBranch}` : '',
    (checkAll && repo && repoUrl) ? `[${repo}](${repoUrl})` : '',
    (checkAll && curBranch) ? `分支: ${curBranch}` : '',
  ].filter(item => item);

  return repoAndMrInfo;
};
