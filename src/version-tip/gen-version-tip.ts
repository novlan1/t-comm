/* eslint-disable @typescript-eslint/no-require-imports */
import { replaceAllPolyfill } from '../base/string/replace-all';
import { MAX_CONTENT_LENGTH } from './config';
import { optimizeRobotContent } from '../wecom-robot/optimize-robot-content';
import type { IAppInfo } from './types';

function optimizeContent(content = '') {
  return optimizeRobotContent({
    content,
    maxLen: MAX_CONTENT_LENGTH,
  });
}

export function parseChangeLog({
  changelogStr,
  targetVersion,
}: {
  changelogStr: string,
  targetVersion: string,
}) {
  // 非大版本（1.0.0，2.0.0等），比如 1.1.1
  // 不是第一个版本
  let currentVersion = changelogStr.match(new RegExp(
    `(?<=### \\[${targetVersion}\\].*\n).*?(?=\n##+ \\[?\\d+.\\d+.\\d+)`,
    's',
  ));

  // 大版本
  // 不是第一个版本
  if (!currentVersion?.[0]) {
    currentVersion = changelogStr.match(new RegExp(
      `(?<=## \\[${targetVersion}\\].*\n).*?(?=\n##+ \\[?\\d+.\\d+.\\d+)`,
      's',
    ));
  }

  // changeLog 的另一种形式，lerna 生成的
  if (!currentVersion?.[0]) {
    changelogStr = changelogStr.replace(/<\/?small>/g, '');
    currentVersion = changelogStr.match(new RegExp(
      `(?<=## ${targetVersion}.*\n).*?(?=\n##+ ?\\d+.\\d+.\\d+)`,
      's',
    ));
  }

  // 非大版本
  // 第一个版本
  if (!currentVersion?.[0]) {
    currentVersion = changelogStr.match(new RegExp(
      `(?<=### ${targetVersion}.*\n).*`,
      's',
    ));
  }

  // 大版本
  // 第一个版本
  if (!currentVersion?.[0]) {
    currentVersion = changelogStr.match(new RegExp(
      `(?<=## ${targetVersion}.*\n).*`,
      's',
    ));
  }

  if (!currentVersion?.[0]) {
    console.log(`[GEN VERSION TIP] ERROR: NOT FOUND CHANGELOG INFO OF ${targetVersion} `);
    return '';
  }

  const changelog = currentVersion[0].replace(
    /\n\*(\s.*)/g,
    (a, b) => `\n-${b}`,
  );

  return changelog;
}


function getChangeLog({
  targetVersion,
  changeLogFilePath,
}: {
  targetVersion: string;
  changeLogFilePath: string;
}) {
  const fs = require('fs');
  if (!fs.existsSync(changeLogFilePath)) {
    console.log(`[GEN VERSION TIP] ERROR: NOT FOUND ${changeLogFilePath}. PLEASE GENERATE CHANGELOG. `);
    return '';
  }

  const changelogStr = fs.readFileSync(changeLogFilePath, 'utf8');

  return parseChangeLog({
    changelogStr,
    targetVersion,
  });
}


function generatePublishInfo({
  appName,
  version: targetVersion,
  homepage,
  repoLink,
  issueLink,
  readmeFilePath: changeLogFilePath,
  showNpmLink = false,
}: {
  appName: string;
  version: string;
  homepage: string;
  repoLink: string;
  issueLink: string;
  readmeFilePath: string,
  showNpmLink?: boolean,
}) {
  replaceAllPolyfill();

  const versionStr = `- 版本：<font color="comment">${targetVersion}</font>\n`;
  const npmStr = showNpmLink ? `- npm: [${appName}](https://npmjs.com/package/${appName})\n` : '';
  const issueStr = issueLink ? `- issue: [${issueLink}](${issueLink})\n` : '';

  const pRepoLink = repoLink.replace(/^git\+/, '').replace(/\.git$/, '');
  const repoStr = repoLink ? `- Git: [${pRepoLink}](${pRepoLink})\n` : '';

  const homepageStr = homepage ? `- 文档：[${homepage}](${homepage})\n` : '';


  const template = `### ${appName} 更新\n\n\n\n${versionStr}${npmStr}${repoStr}${issueStr}${homepageStr}\n\n`;

  const changelog = getChangeLog({
    targetVersion,
    changeLogFilePath,
  });

  // @ts-ignore
  const content = template.concat(changelog).replaceAll('###', '\n\n###');

  return optimizeContent(content);
}

/**
 * 生成版本信息，可以用来发送到群聊中
 * @param {object} config 配置信息
 * @param {string} config.readmeFilePath changelog文件地址
 * @param {object} config.appInfo package.json信息
 * @returns {string} 版本信息
 * @example
 *
 * const appInfo = require(`${rootPath}/package.json`);
 * const readmeFilePath = `${rootPath}/CHANGELOG.md`;
 *
 * const content = genVersionTip({
 *   readmeFilePath,
 *   appInfo,
 * });
 */
export function genVersionTip({
  readmeFilePath,
  appInfo,
  showNpmLink = false,
}: {
  showNpmLink?: boolean
  readmeFilePath: string
  appInfo: IAppInfo
}): string {
  const { name: appName, version, homepage = '', bugs, repository } = appInfo;
  console.log('[GEN VERSION TIP] APP INFO VERSION:', version);

  let issueLink = '';
  let repoLink = '';
  if (bugs?.url) {
    issueLink = bugs.url;
  }
  if (repository?.url) {
    repoLink = repository.url;
  }

  return generatePublishInfo({
    showNpmLink,
    appName,
    version,
    homepage,
    repoLink,
    issueLink,
    readmeFilePath,
  });
}
