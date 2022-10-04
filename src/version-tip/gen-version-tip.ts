/* eslint-disable @typescript-eslint/no-require-imports */


function generatePublishInfo({
  appName,
  version: targetVersion,
  homepage,
  repoLink,
  issueLink,
  changeLogFilePath,
}) {
  const fs = require('fs');
  if (!fs.existsSync(changeLogFilePath)) {
    console.log(
      '\x1b[33m%s\x1b[0m',
      `未找到 ${changeLogFilePath} ，请先生成 changeLog。`,
    );
    return '';
  }
  const changelogStr = fs.readFileSync(changeLogFilePath, 'utf8');
  const currentVersion = changelogStr.match(new RegExp(
    `(?<=### \\[${targetVersion}\\].*\n).*?(?=\n##+ \\[?\\d+.\\d+.\\d+)`,
    's',
  ));

  if (!currentVersion || !currentVersion[0]) {
    console.log(
      '\x1b[33m%s\x1b[0m',
      `未找到${targetVersion}对应的 changelog 发布信息`,
    );
    return '';
  }

  const npmStr = ''; // '- npm：[${appName}](https://npmjs.com/package/${appName})\n'
  const issueStr = `${issueLink && `- issue: [issue](${issueLink})\n`}`;

  const changelog = currentVersion[0].replace(
    /\n\*(\s.*)/g,
    (a, b) => `\n-${b}`,
  );

  const template = `### ${appName} 更新\n\n\n\n- 版本：<font color="comment">${targetVersion}</font>\n${npmStr}${
    repoLink && `- Git：[${repoLink}](${repoLink})\n`
  }${issueStr}${homepage && `- 文档：[${homepage}](${homepage})\n`}\n\n`;

  const content = template.concat(changelog).replaceAll('###', '\n\n###');

  return content;
}

/**
 * 生成版本信息，可以用来发送到群聊中
 * @param {object} config 配置信息
 * @param {string} config.changeLogFilePath changelog文件地址
 * @param {object} config.appInfo package.json信息
 * @return {string} 版本信息
 * @example
 *
 * const appInfo = require(`${rootPath}/package.json`);
 * const changeLogFilePath = `${rootPath}/CHANGELOG.md`;
 *
 * const content = genVersionTip({
 *   changeLogFilePath,
 *   appInfo,
 * });
 */
export function genVersionTip({ changeLogFilePath, appInfo }: {
  changeLogFilePath: string
  appInfo: {
    name: string
    version?: string
    homepage?: string
    bugs?: {
      url: string
    }
    repository?: {
      url: string
    }
  }
}): string {
  const { name: appName, version, homepage = '', bugs, repository } = appInfo;

  let issueLink = '';
  let repoLink = '';
  if (bugs?.url) {
    issueLink = bugs.url;
  }
  if (repository?.url) {
    repoLink = repository.url;
  }

  return generatePublishInfo({
    appName,
    version,
    homepage,
    repoLink,
    issueLink,
    changeLogFilePath,
  });
}
