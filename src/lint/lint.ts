import fs from 'fs';
import path from 'path';
import axios from 'axios';

import { batchSendWxRobotMarkdown } from '../wecom-robot/batch-send';
import { writeFileSync, readFileSync } from '../fs/fs';
import { execCommand } from '../node/node-command';

import type { JSErrorFile, SCSSErrorFile } from './types';


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


async function createMRNote({
  privateToken,
  gitApiPrefix,

  projectName,
  mrId,

  body,
  path,
  line,

  lineType = 'new',

  // 严重程度 可选值 0、1、2、3
  // 0 : "default"（默认）1 : "slight"（轻微）
  // 2 : "normal"（一般）3 : "serious"（严重
  risk = 3,

  // 需解决 可选值 0、1、2
  // 0 : "default"（默认）
  // 1 : "unresolved"（未解决）
  // 2 : "resolved"（已解决）
  resolveState = 1,

  // 默认值为 true，发通知给相关用户
  notifyEnabled = true,

}: {
  privateToken: string;
  gitApiPrefix: string;

  projectName: string;
  mrId: string | number;

  body: any;
  path: string;
  line: number;

  lineType?: string;
  risk?: 0 | 1 | 2 | 3;

  resolveState?: 0 | 1 | 2;
  notifyEnabled?: boolean;

}) {
  return new Promise((resolve, reject) => {
    axios({
      url: `${gitApiPrefix}/projects/${encodeURIComponent(projectName)}/merge_requests/${mrId}/notes?private_token=${privateToken}`,
      method: 'POST',
      data: {
        body,
        path,
        line,
        line_type: lineType,
        risk,
        resolve_state: resolveState,
        notify_enabled: notifyEnabled,
      },
    }).then((res) => {
      resolve(res.data);
    })
      .catch((err) => {
        console.log('err', err);
        reject(err);
      });
  });
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


async function createMRComment({
  projectName,
  mrId,
  data,
  privateToken,
  gitApiPrefix,
}: {
  projectName: string;
  mrId: string | number;
  data: any;
  privateToken: string;
  gitApiPrefix: string;
}): Promise<any> {
  return new Promise((resolve, reject) => {
    axios({
      url: `${gitApiPrefix}/projects/${encodeURIComponent(projectName)}/merge_request/${mrId}/comments?private_token=${privateToken}`,
      method: 'POST',
      data: {
        note: data,
      },
    }).then((res) => {
      resolve(res.data);
    })
      .catch((err) => {
        console.log('err', err);
        reject(err);
      });
  });
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
}) {
  let jsKeyword = '--ext .js,.ts .';
  let vueKeyword = '--ext .vue .';
  let sassKeyword = '"**/*.{css,scss}"';

  if (sourceBranch && targetBranch) {
    const {
      jsTsFiles,
      vueFiles,
      scssFiles,
    } = getDiffFile({
      sourceBranch,
      targetBranch,
      workspace,
    });

    jsKeyword =  jsTsFiles.join(' ');
    vueKeyword = vueFiles.join(' ');
    sassKeyword = scssFiles.join(' ');
  }

  const outputJs = path.resolve(workspace, 'lint-js.json');
  const outputVue = path.resolve(workspace, 'lint-vue.json');
  const outputScss = path.resolve(workspace, 'lint-scss.json');


  console.log('正在执行 lint js/ts ...');
  execCommand(`npx eslint ${jsKeyword} --quiet -o ${outputJs} --format json || true`, workspace, 'inherit');

  removeParserOptionsProject(workspace);

  console.log('正在执行 lint vue ...');

  execCommand(`npx eslint ${vueKeyword} --quiet -o ${outputVue} --format json || true`, workspace, 'inherit');

  console.log('正在执行 lint css/scss ...');

  execCommand(`npx stylelint ${sassKeyword} --quiet -o ${outputScss} --formatter json || true`, workspace, 'inherit');

  const {
    jsTotal,
    jsErrorFiles,

    vueTotal,
    vueErrorFiles,

    scssTotal,
    scssErrorFiles,
  } = parseResult({
    outputJs,
    outputVue,
    outputScss,
  });

  let commentSuccess = false;
  if (mrId) {
    const message = genRobotMessage({
      jsTotal,
      jsErrorFiles,

      vueTotal,
      vueErrorFiles,

      scssTotal,
      scssErrorFiles,

      checkAll,
      mrUrl,
      sourceBranch,
      targetBranch,

      buildUrl,
      docLink,

      repo,
      repoUrl,

      mentionList,
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
  }


  console.log('[commentSuccess]', commentSuccess);

  const getPostFix = () => {
    if (!mrId) return '';
    return commentSuccess ? '评论成功' : '评论失败';
  };

  const robotMessage = genRobotMessage({
    jsTotal,
    jsErrorFiles,

    vueTotal,
    vueErrorFiles,

    scssTotal,
    scssErrorFiles,

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
  });


  await batchSendWxRobotMarkdown({
    content: robotMessage,
    chatId,
    webhookUrl,
  });

  if (mrId) {
    await tryCreateMRNote({
      projectName: repo,
      mrId,
      errorFiles: jsErrorFiles,
      workspace,
      privateToken,
      gitApiPrefix,
    });
    await tryCreateMRNote({
      projectName: repo,
      mrId,
      errorFiles: vueErrorFiles,
      workspace,
      privateToken,
      gitApiPrefix,
    });
    await tryCreateMRNote({
      projectName: repo,
      mrId,
      errorFiles: scssErrorFiles,
      isScss: true,
      workspace,
      privateToken,
      gitApiPrefix,
    });
  }
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

function parseResult({
  outputJs,
  outputVue,
  outputScss,
}: {
  outputJs: string;
  outputVue: string;
  outputScss: string;
}) {
  const readyFile = (file: string) => {
    if (!fs.existsSync(file)) {
      writeFileSync(file, [], true);
      return [];
    }
    return readFileSync(file, true);
  };

  const jsResult = readyFile(outputJs);
  const vueResult = readyFile(outputVue);
  const scssResult = readyFile(outputScss);

  console.log('\n');
  console.log('[jsResult] \n', JSON.stringify(jsResult, null, 2));
  console.log('[vueResult] \n', JSON.stringify(vueResult, null, 2));
  console.log('[scssResult] \n', JSON.stringify(scssResult, null, 2));
  console.log('\n');

  const {
    total: jsTotal,
    errorFiles: jsErrorFiles,
  } = getErrorInfo(jsResult);

  const {
    total: vueTotal,
    errorFiles: vueErrorFiles,
  } = getErrorInfo(vueResult);

  const parsed = scssResult.filter((item: Record<string, any>) => item.warnings?.length).map((item: any) => ({
    ...item,
    errorCount: item.warnings.filter((warn: Record<string, any>) => warn.severity === 'error').length,
  }));

  const {
    total: scssTotal,
    errorFiles: scssErrorFiles,
  } = getErrorInfo(parsed);


  return {
    jsTotal,
    jsErrorFiles,

    vueTotal,
    vueErrorFiles,

    scssTotal,
    scssErrorFiles,
  };
}

function genRobotMessage({
  jsTotal,
  jsErrorFiles,

  vueTotal,
  vueErrorFiles,

  scssTotal,
  scssErrorFiles,

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
}: {
  jsTotal: number;
  jsErrorFiles: JSErrorFile[];

  vueTotal: number;
  vueErrorFiles: JSErrorFile[];

  scssTotal: number;
  scssErrorFiles: SCSSErrorFile[]

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
}) {
  const genTitle = (prefix: string) => (`${prefix}${checkAll ? '【LINT】全量模式' : '【LINT】增量模式'}`);
  const postFixList = postFix ? [postFix] : [];
  const mrInfo = [
    mrUrl ? `[${mrUrl}](${mrUrl})` : '',
    (sourceBranch && targetBranch) ? `${sourceBranch} => ${targetBranch}` : '',
  ].filter(item => item);

  const repoInfo = (checkAll && repo && repoUrl) ? [`[${repo}](${repoUrl})`] : [];

  if (!jsTotal && !vueTotal && !scssTotal) {
    return [
      genTitle('✅'),
      ...mrInfo,
      ...repoInfo,
      '未发现代码规范异常',
      ...postFixList,
    ].join('，');
  }

  return [
    [
      genTitle('⚠️'),
      // '遵守代码规范是防止项目腐化的第一步',
      ...mrInfo,
      ...repoInfo,
      `可在[流水线](${buildUrl})中查看详情，或本地运行 \`npx eslint --fix file\` 等命令`,
      `[说明文档](${docLink})`,
      mentionList.map(mention => `<@${mention}>`).join(''),
      ...postFixList,
    ]
      .filter(item => item)
      .join('，'),

    [`- **JS/TS 错误**：${jsTotal ? `${jsErrorFiles.length}个文件${jsTotal}个错误` : '无'}`],
    [`- **Vue 错误**：${vueTotal ? `${vueErrorFiles.length}个文件${vueTotal}个错误` : '无'}`],
    [`- **SCSS/CSS 错误**：${scssTotal ? `${scssErrorFiles.length}个文件${scssTotal}个错误` : '无'}`],
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

  const jsTsFiles = list.filter(item => item.endsWith('.js') || item.endsWith('.ts'));
  const vueFiles = list.filter(item => item.endsWith('.vue'));
  const scssFiles = list.filter(item => item.endsWith('.scss') || item.endsWith('.css'));

  return {
    jsTsFiles,
    vueFiles,
    scssFiles,
  };
}

