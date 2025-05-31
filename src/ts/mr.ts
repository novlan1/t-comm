import { createMRNote, createMRComment } from '../lint/git';
import { genReportInfo } from '../lint/message';

import { batchSendWxRobotMarkdown } from '../wecom-robot/batch-send';

import { getTSErrorFiles, type TsErrorFile } from './ts-error';

const genTitle = (
  prefix: string,
  checkAll?: boolean,
  name = 'LINT',
) => (`${prefix}【${name}】`);


function genRobotMessage({
  errorFiles,
  workspace,

  mrUrl,
  sourceBranch,
  targetBranch,

  repo,
  repoUrl,

  checkAll,
  buildUrl,
  docLink,
  mentionList,
  postFixList = [],
}: {
  errorFiles: TsErrorFile[];
  workspace: string;

  mrUrl: string;
  sourceBranch: string;
  targetBranch: string;

  repo: string;
  repoUrl: string;

  checkAll: boolean;
  buildUrl: string;
  docLink: string;
  mentionList: string[];
  postFixList?: string[];
}) {
  const reportInfo = genReportInfo({
    workspace,

    mrUrl,
    sourceBranch,
    targetBranch,

    repo,
    repoUrl,

    checkAll,
  });

  if (!errorFiles.length) {
    return [
      genTitle('✅', checkAll, 'TS CHECK'),
      ...reportInfo,
      '未发现代码规范异常',
      ...postFixList,
    ].join('，');
  }

  return [
    [
      genTitle('⚠️', checkAll, 'TS CHECK'),
      // '遵守代码规范是防止项目腐化的第一步',
      ...reportInfo,
      `共${errorFiles.length}个TS类型错误`,
      `可在[流水线](${buildUrl})中查看详情，或本地运行 \`npx tsc --noEmit\` 等命令`,
      docLink ? `[说明文档](${docLink})` : '',
      mentionList.map(mention => `<@${mention}>`).join(''),
      ...(postFixList || []),
    ]
      .filter(item => item)
      .join('，'),
  ].join('\n');
}


export async function checkTSErrorInMrOrAll({
  privateToken,
  gitApiPrefix,
  workspace,

  repo,
  repoUrl,
  mrId,

  mrUrl,
  sourceBranch,
  targetBranch,

  checkAll,
  buildUrl,
  docLink,

  mentionList,
  postFixList,

  chatId = ['ALL'],
  webhookUrl,
  command,
}: {
  privateToken: string;
  gitApiPrefix: string;
  workspace: string;

  repo: string;
  repoUrl: string;
  mrId: string;

  mrUrl: string;
  sourceBranch: string;
  targetBranch: string;

  checkAll: boolean;
  buildUrl: string;
  docLink: string;

  mentionList: string[];
  postFixList?: string[];

  chatId?: string[];
  webhookUrl: string;

  command?: string;
}) {
  const errorFiles = getTSErrorFiles({
    root: workspace,
    command,
  });

  if (mrId && !checkAll) {
    for (const file of errorFiles) {
      await createMRNote({
        privateToken,
        gitApiPrefix,

        projectName: repo,
        mrId,

        body: (`${file.code ? `${file.code} - ` : ''}${file.message}`) || '格式错误',
        line: file.line,
        path: file.file,
      });
    }
  }

  const robotMessage = genRobotMessage({
    errorFiles,
    workspace,

    mrUrl,
    sourceBranch,
    targetBranch,

    repo,
    repoUrl,

    checkAll,
    buildUrl,
    docLink,
    mentionList,
    postFixList,
  });

  if (mrId && !checkAll) {
    try {
      await createMRComment({
        projectName: repo,
        mrId,
        data: robotMessage,
        privateToken,
        gitApiPrefix,
      });
    } catch (err) {
      console.log('[createMRComment] err', err);
    }
  }

  try {
    await batchSendWxRobotMarkdown({
      content: robotMessage,
      chatId,
      webhookUrl,
    });
  } catch (err) {
    console.log('[batchSendWxRobotMarkdown] err', err);
  }

  return errorFiles;
}

