import fs from 'fs';
import path from 'path';

import { readFileSync, writeFileSync } from '../fs/fs';
import { execCommand } from '../node/node-command';

import { batchSendWxRobotMarkdown } from '../wecom-robot/batch-send';

import { FILE_TYPE_MAP } from './config';
import { createMRNote, createMRComment } from './git';
import { ignoreSubmoduleInESLint, ignoreSubmoduleInStyleLint } from './helper';
import { genReportInfo, genTitle } from './message';


import type { FileMap, JSErrorFile, SCSSErrorFile } from './types';


const ESLINT_CONFIG_FILE = '.eslintrc.js';


function removeParserOptionsProject(workspace: string) {
  const configFile = path.resolve(workspace, ESLINT_CONFIG_FILE);
  if (!fs.existsSync(configFile)) {
    console.log('不存在配置文件');
    return;
  }

  const content = readFileSync(configFile);

  const reg = /\s+project:\s+'[^']+json',/;
  const newContent = content.replace(reg, '');
  if (newContent && newContent !== content) {
    console.log('已删除 parserOptions.project');
    writeFileSync(configFile, newContent);
  }
}


function parseScssFiles(scssErrorFiles: SCSSErrorFile[], workspace: string): any[] {
  if (!scssErrorFiles?.length) {
    return [];
  }

  const parsedFiles = scssErrorFiles.reduce((acc: any[], item) => {
    item.warnings?.forEach((messageItem: any) => {
      acc.push({
        filePath: item.source,
        parsedFilePath: path.relative(workspace, item.source),
        ...messageItem,
        message: messageItem.text,
        ruleId: messageItem.rule,
      });
    });
    return acc;
  }, []);

  return parsedFiles;
}


function parseJSFiles(jsErrorFiles: JSErrorFile[], workspace: string) {
  if (!jsErrorFiles?.length) {
    return [];
  }

  const parsedFiles = jsErrorFiles.reduce((acc: any[], item) => {
    item.messages?.forEach((messageItem: any) => {
      acc.push({
        filePath: item.filePath,
        parsedFilePath: path.relative(workspace, item.filePath),
        ...messageItem,
      });
    });
    return acc;
  }, []);

  return parsedFiles;
}


async function tryCreateMRNote({
  privateToken,
  gitApiPrefix,

  errorFiles,
  projectName,

  mrId,
  workspace,

  isScss,
}: {
  privateToken: string;
  gitApiPrefix: string;

  errorFiles: Array<Record<string, any>>;
  projectName: string;

  mrId: string | number;
  workspace: string;

  isScss?: boolean;
}) {
  const parsedFiles: Array<any> = isScss
    ? parseScssFiles(errorFiles, workspace)
    : parseJSFiles(errorFiles, workspace);

  console.log('[isScss]', isScss);
  console.log('[parsedFiles]', parsedFiles);

  if (!parsedFiles?.length) return;


  for (const file of parsedFiles) {
    await createMRNote({
      projectName,
      mrId,

      body: (`${file.message}\n\n [${file.ruleId}]`) || '格式错误',
      line: file.line,
      path: file.parsedFilePath,
      privateToken,
      gitApiPrefix,
    });
  }
}


export async function checkLint({
  privateToken,
  gitApiPrefix,
  workspace,

  mrUrl,
  mrId,
  buildUrl,

  repo,
  repoUrl,

  sourceBranch,
  targetBranch,

  docLink,
  webhookUrl,

  chatId = ['ALL'],
  checkAll,
  mentionList = [],

  lintFiles = Object.keys(FILE_TYPE_MAP),
  throwError = true,

  ignoreSubmodules = true,
}: {
  privateToken: string;
  gitApiPrefix: string;
  workspace: string;

  mrUrl?: string;
  mrId?: string;
  buildUrl: string;

  repo: string;
  repoUrl?: string;
  sourceBranch?: string;
  targetBranch?: string;

  docLink: string
  webhookUrl: string;

  chatId?: string[];
  checkAll?: boolean;
  mentionList?: string[];

  lintFiles?: string[];
  throwError?: boolean;
  ignoreSubmodules?: boolean;
}) {
  if (!checkAll && (!sourceBranch || !targetBranch)) {
    throw new Error('增量模式，必须提供 sourceBranch 和 targetBranch！');
  }

  if (ignoreSubmodules) {
    ignoreSubmoduleInESLint(workspace);
    ignoreSubmoduleInStyleLint(workspace);
  }

  const fileMap: FileMap = Object.keys(FILE_TYPE_MAP)
    .filter(item => lintFiles.includes(item))
    .reduce((acc, key) => ({
      ...acc,
      [key]: FILE_TYPE_MAP[key as keyof typeof FILE_TYPE_MAP],
    }), {});


  if (!checkAll) {
    const {
      diffFilesMap,
    } = getDiffFile({
      sourceBranch: sourceBranch!,
      targetBranch: targetBranch!,
      workspace,
    });


    Object.keys(fileMap).forEach((key) => {
      fileMap[key as keyof typeof fileMap].lintKeyword = diffFilesMap[key];
    });
  }

  const innerExecCommand = (key: string, info: {
    lintKeyword: string;
    outputFileName: string;
    isStyle?: boolean;
    isVue?: boolean;
  }) => {
    console.log(`正在执行 lint ${key} ...`);
    if (info.isVue) {
      removeParserOptionsProject(workspace);
    }

    const outputFile = path.resolve(workspace, info.outputFileName);

    if (info.isStyle) {
      try {
        // inherit 无法真正捕获错误
        const lintResult = execCommand(`npx stylelint ${info.lintKeyword} --quiet -o ${outputFile} --formatter json || true`, workspace, 'pipe');
        console.log('[StyleLint] result: \n', lintResult);
      } catch (err) {
        console.log('[StyleLint] error: ', err);
      }
    } else {
      try {
        const lintResult = execCommand(`npx eslint ${info.lintKeyword} --quiet -o ${outputFile} --format json || true`, workspace, 'pipe');
        console.log('[ESLint] result: \n', lintResult);
      } catch (err) {
        console.log('[ESLint] error: ', err);
      }
    }
    return outputFile;
  };

  Object.keys(fileMap).forEach((key) => {
    const outputFile = innerExecCommand(key, fileMap[key as keyof typeof fileMap]);
    fileMap[key].outputFile = outputFile;
  });

  const { errorMap } = parseResult({
    fileMap,
  });

  Object.keys(fileMap).forEach((key) => {
    fileMap[key as keyof typeof fileMap].errorFiles = errorMap[key as keyof typeof errorMap].errorFiles;
    fileMap[key as keyof typeof fileMap].total = errorMap[key as keyof typeof errorMap].total;
  });

  let commentSuccess = false;
  if (mrId) {
    const message = genRobotMessage({
      fileMap,

      checkAll,
      mrUrl,
      sourceBranch,
      targetBranch,

      buildUrl,
      docLink,

      repo,
      repoUrl,

      mentionList,
      workspace,
    });

    try {
      commentSuccess = await createMRComment({
        projectName: repo,
        mrId,
        data: message,
        privateToken,
        gitApiPrefix,
      });
    } catch (err) {
    }

    console.log('[commentSuccess]', commentSuccess);
  }


  const getPostFix = () => {
    if (!mrId) return '';
    return commentSuccess ? '评论成功' : '评论失败';
  };

  const robotMessage = genRobotMessage({
    fileMap,

    postFix: getPostFix(),
    mrUrl,
    sourceBranch,
    targetBranch,

    buildUrl,
    docLink,
    checkAll,

    repo,
    repoUrl,

    mentionList,
    workspace,
  });

  console.log('[robotMessage]: \n', robotMessage);

  try {
    await batchSendWxRobotMarkdown({
      content: robotMessage,
      chatId,
      webhookUrl,
    });
  } catch (err) {
    console.log('[batchSendWxRobotMarkdown] err', err);
  }


  if (mrId) {
    for (const key of Object.keys(fileMap)) {
      await tryCreateMRNote({
        projectName: repo,
        mrId,
        errorFiles: fileMap[key].errorFiles || [],
        workspace,
        privateToken,
        gitApiPrefix,
        isScss: fileMap[key].isStyle,
      });
    }
  }
  const hasError = !!Object.values(fileMap).find(item => item.total);
  if (throwError && hasError) {
    throw new Error('Lint 检查不通过！');
  }

  return fileMap;
}


function getErrorInfo(result: Array<{
  errorCount?: number;
}>) {
  const errorFiles = result.filter(item => item.errorCount);
  const total = errorFiles.reduce((acc, file) => {
    acc += file.errorCount || 0;
    return acc;
  }, 0);

  return {
    total,
    errorFiles,
  };
}


const readyFile = (file: string) => {
  if (!fs.existsSync(file)) {
    writeFileSync(file, [], true);
    return [];
  }
  return readFileSync(file, true);
};


const parseErrorResult = (key: string, info: {
  outputFile?: string,
  isStyle?: boolean
}) => {
  if (!info.outputFile || !fs.existsSync(info.outputFile)) {
    return {
      total: 0,
      errorFiles: [],
    };
  }

  const content = readyFile(info.outputFile!);
  console.log(`[result] ${key}: \n`, JSON.stringify(content, null, 2));
  let resultTotal = 0;
  let resultErrorFiles: JSErrorFile[] = [];

  if (info.isStyle) {
    const parsed = content.filter((item: Record<string, any>) => item.warnings?.length).map((item: any) => ({
      ...item,
      errorCount: item.warnings.filter((warn: Record<string, any>) => warn.severity === 'error').length,
    }));

    const {
      total,
      errorFiles,
    } = getErrorInfo(parsed);
    resultTotal = total;
    resultErrorFiles = errorFiles;
  } else {
    const {
      total,
      errorFiles,
    } = getErrorInfo(content);
    resultTotal = total;
    resultErrorFiles = errorFiles;
  }

  return {
    total: resultTotal,
    errorFiles: resultErrorFiles,
  };
};

function parseResult({
  fileMap,
}: {
  fileMap: FileMap;
}) {
  const errorMap: {
    [k: string]: {
      total: number;
      errorFiles: JSErrorFile[];
    }
  } = {};

  Object.keys(fileMap).forEach((key) => {
    errorMap[key as keyof typeof errorMap] = parseErrorResult(key, fileMap[key]);
  });


  return {
    errorMap,
  };
}

function genRobotMessage({
  fileMap,

  mrUrl,
  sourceBranch,
  targetBranch,

  buildUrl,
  docLink,

  repo,
  repoUrl,

  postFix,
  checkAll = false,

  mentionList = [],
  workspace,
}: {
  fileMap: FileMap;

  mrUrl?: string;
  sourceBranch?: string;
  targetBranch?: string;

  buildUrl: string;
  docLink: string;

  repo?: string;
  repoUrl?: string;

  postFix?: string;
  checkAll?: boolean;

  mentionList?: string[];
  workspace: string;
}): string {
  const postFixList = postFix ? [postFix] : [];

  const repoAndMrInfo = genReportInfo({
    workspace,

    mrUrl,
    sourceBranch,
    targetBranch,

    repo,
    repoUrl,

    checkAll,
  });

  const allTotal = Object.values(fileMap).reduce((acc, item) => acc + (item.total ?? 0), 0);

  if (!allTotal) {
    return [
      genTitle('✅', checkAll),
      ...repoAndMrInfo,
      '未发现代码规范异常',
      ...postFixList,
    ].join('，');
  }

  const lintErrorMessageList = Object.keys(fileMap)
    .filter(item => !!fileMap[item].total)
    .map((key) => {
      const info = fileMap[key];
      const { total, errorFiles } = info;

      return `- **${key.toUpperCase()} 错误**：${total && errorFiles?.length ? `${errorFiles?.length}个文件${total}个错误` : '无'}`;
    });

  return [
    [
      genTitle('⚠️', checkAll),
      // '遵守代码规范是防止项目腐化的第一步',
      ...repoAndMrInfo,
      `可在[流水线](${buildUrl})中查看详情，或本地运行 \`npx eslint --fix file\` 等命令`,
      docLink ? `[说明文档](${docLink})` : '',
      mentionList.map(mention => `<@${mention}>`).join(''),
      ...postFixList,
    ]
      .filter(item => item)
      .join('，'),
    ...lintErrorMessageList,
  ].join('\n');
}


function getDiffFile({
  sourceBranch,
  targetBranch,
  workspace,
}: {
  sourceBranch: string;
  targetBranch: string;
  workspace: string;
}) {
  execCommand(`git clean -df && git reset --hard HEAD && git checkout ${targetBranch} && git pull && git submodule update --init`, workspace, 'inherit');
  execCommand(`git checkout ${sourceBranch} && git reset --hard "origin/${sourceBranch}" && git pull`, workspace, 'inherit');

  const list = execCommand(`git diff --name-only ${sourceBranch} ${targetBranch}`, workspace,  {
    stdio: 'pipe',
    line: -1,
  }).split('\n')
    .map(item => item.trim())
    .filter(item => item)
    .filter(item => fs.existsSync(path.resolve(workspace, item)));

  console.log('diff list: ', JSON.stringify(list, null, 2));
  const diffFilesMap: Record<string, string> = {};
  Object.keys(FILE_TYPE_MAP).forEach((key: string) => {
    const { reg } = FILE_TYPE_MAP[key as keyof typeof FILE_TYPE_MAP];
    const files = list.filter(item => reg.test(item));
    diffFilesMap[key] = files.join(' ');
  });

  return {
    diffFilesMap,
  };
}

