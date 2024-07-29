import { getBranchesByProjectName } from '../tgit/branch';
import { getOneProjectDetail } from '../tgit/project';

import { execCommand } from '../node/node-command';
import { batchSendWxRobotMarkdown } from '../wecom-robot/batch-send';
import { getGitCommitInfo } from '../git/git';
import { shouldInclude, DEFAULT_WHITE_REG } from './helper';


const CHAT_ID = ['ALL'];


function getStartTime() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  const startTime = parseInt(`${date.getTime()}`, 10) - 24 * 60 * 60 * 1000;
  return startTime;
}


async function getBranches({
  baseUrl,
  repoName,
  privateToken,
  whiteBranchReg,
}: {
  baseUrl: string;
  repoName: string;
  privateToken: string;

  whiteBranchReg?: RegExp
}) {
  const res = await getBranchesByProjectName({
    projectName: repoName,
    privateToken,
    baseUrl,
  }).catch((err: Error) => {
    console.log('[getBranches] err', err);
  });

  const list: Array<any> = (res || []).filter((item: any) => {
    const { commit } = item;
    const date  = commit?.committed_date;
    const time = new Date(date).getTime();

    if (time > getStartTime()) return true;
    return false;
  });

  console.log('[Origin Branches]', list.map(item => item?.name));

  const branches = list.filter(branch => shouldInclude(branch.name, whiteBranchReg));
  console.log('[Filter  Branches]', branches.map(item => item?.name));
  return branches;
}


function mergeMainBranch({
  branch = {},
  successBranches = [],
  conflictBranches = [],
  noMergeBranches = [],
  devRoot = '',
  mainBranch = 'develop',
  isDryRun = false,
}: {
  branch: Record<string, any>;
  successBranches: string[];
  conflictBranches: string[];
  noMergeBranches: string[];

  devRoot: string;
  mainBranch?: string;
  isDryRun?: boolean;
}) {
  if (!devRoot) return;

  function tExecCommand(command: string, stdio = 'inherit') {
    console.log('[Exec] ', command);
    execCommand(command, devRoot, stdio);
  }

  const branchName = branch.name;
  const robotBranchStr = `${branchName}<@${branch?.author?.username || ''}>`;

  console.log('[Merging] ', branchName);
  tExecCommand('git clean -df');
  tExecCommand('git reset --hard HEAD');

  tExecCommand(`git checkout ${mainBranch} && git pull && git submodule update --init`, 'inherit');
  tExecCommand(`git checkout "${branchName}" && git reset --hard "origin/${branchName}" && git pull`);

  const originCommitInfo = getGitCommitInfo(devRoot, true);
  console.log('[originCommitInfo]', originCommitInfo);

  try {
    const out = tExecCommand(`git merge ${mainBranch} -m "Merge branch '${mainBranch}' into '${branchName}' by robot"`, 'inherit');
    console.log('[out]', out);
  } catch (err) {
    console.log('[Merge Error]', err);
    conflictBranches.push(robotBranchStr);
    return;
  }

  const nowCommitInfo = getGitCommitInfo(devRoot, true);
  console.log('[nowCommitInfo]', nowCommitInfo);

  if (nowCommitInfo.hash !== originCommitInfo.hash) {
    try {
      if (isDryRun) {
        successBranches.push(branchName);
      } else {
        tExecCommand('git push');
        successBranches.push(branchName);
      }
    } catch (err) {
      console.log('[Push Error]', err);
    }
  } else {
    noMergeBranches.push(branchName);
  }
}

function getMessageContent({
  appName,
  projectId,
  baseUrl,

  successBranches = [],
  conflictBranches = [],
  noMergeBranches = [],
  toConfirmBranches = [],
}: {
  appName: string;
  projectId: string | number;
  baseUrl: string;

  successBranches: string[];
  conflictBranches: string[];
  noMergeBranches: string[];
  toConfirmBranches: string[];
}) {
  const list = [
    `>【${appName || ''}自动合并】[查看](${baseUrl}/search?tab=11&search=by%20robot&order=time&es_sort=desc&project_id=${projectId || ''})`,
    `- 成功合并：${successBranches.join('、')}`,
    `- 存在冲突：${conflictBranches.join('、')}`,
    `- 无需合并：${noMergeBranches.join('、')}`,
  ];

  if (toConfirmBranches.length) {
    list.push(`- 需要确认：${toConfirmBranches.join('、')}`);
  }
  const content = list.join('\n');
  return content;
}

async function sendSendMsg(content: string, webhookUrl: string) {
  await batchSendWxRobotMarkdown({
    content,
    chatId: CHAT_ID,
    webhookUrl,
  });
}


/**
 * 每日合并
 *
 * @export
 * @async
 * @param {object} param0 参数
 * @param {string} param0.webhookUrl 机器人地址
 * @param {string} param0.appName 项目名称
 * @param {string} param0.devRoot 项目根路径
 * @param {string} param0.baseUrl 基础请求 url
 * @param {string} param0.repoName 仓库名称
 * @param {string} param0.privateToken 密钥
 * @param {boolean} [param0.isDryRun=false] 是否演练
 * @param {string} [param0.mainBranch='develop'] 主分支
 * @param {Regexp} [param0.whiteBranchReg=/^release\|develop\|hotfix\\/.+$/] 不处理的分支正则
 * @returns {*}
 * @example
 *
 * ```ts
 * dailyMerge({
 *   webhookUrl: 'xx',
 *   appName: 'xx',
 *   projectId: 'xx',
 *   devRoot: 'xx',
 *
 *   baseUrl: 'xx',
 *   repoName: 'xx',
 *   privateToken: 'xx',
 *
 *   isDryRun: false,
 * })
 * ```
 */
export async function dailyMerge({
  webhookUrl,
  appName,
  devRoot,

  baseUrl,
  repoName,
  privateToken,

  isDryRun = false,
  mainBranch = 'develop',

  whiteBranchReg = DEFAULT_WHITE_REG,
}: {
  webhookUrl: string;
  appName: string;
  devRoot: string;

  baseUrl: string;
  repoName: string;
  privateToken: string;

  isDryRun?: boolean;
  mainBranch?: string;

  whiteBranchReg?: RegExp;
}) {
  console.log('\nSTART Daily Merge =====>');
  if (!baseUrl) {
    console.error('Please Input Base Url');
    return;
  }

  if (!repoName) {
    console.error('Please Input Repo Name');
    return;
  }

  const branches = await getBranches({
    baseUrl,
    repoName,
    privateToken,

    whiteBranchReg,
  });

  if (!branches || !branches.length) {
    console.log('[no branch to merge]');
    sendSendMsg(`>【${appName || ''}自动合并】未找到需要合并的分支`, webhookUrl);
    return;
  }

  const successBranches: Array<string> = [];
  const conflictBranches: Array<string> = [];
  const noMergeBranches: Array<string> = [];


  branches.forEach((branch) => {
    mergeMainBranch({
      branch,
      successBranches,
      conflictBranches,
      noMergeBranches,
      mainBranch,
      devRoot,
      isDryRun,
    });
  });

  const toConfirmBranches = branches.find((branch) => {
    const all = [
      ...successBranches,
      ...conflictBranches,
      ...noMergeBranches,
    ];

    return !all.includes(branch);
  });

  const projectDetail: any = await getOneProjectDetail({
    baseUrl,
    projectName: repoName,
    privateToken,
  });
  const projectId = projectDetail.id || '';

  console.log('[projectDetail]', projectDetail);

  const content = getMessageContent({
    appName,
    projectId,
    baseUrl,
    successBranches,
    conflictBranches,
    noMergeBranches,
    toConfirmBranches,
  });

  console.log('[successBranches]', JSON.stringify(successBranches));
  console.log('[conflictBranches]', JSON.stringify(conflictBranches));
  console.log('[noMergeBranches]', JSON.stringify(noMergeBranches));

  console.log('[robot message]', content);

  if (!webhookUrl) {
    console.log('[No webhookUrl]');
    return;
  }
  await sendSendMsg(content, webhookUrl);

  console.log('<===== END ');
}


