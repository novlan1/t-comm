/**
 * @module gen-version-tip
 */

async function generatePublishInfo({
  version: targetVersion,
  repoLink,
  appName,
  homepage,
  issueLink,
  readmeFilePath,
}) {
  // eslint-disable-next-line global-require
  const fs = require('fs')
  if (!fs.existsSync(readmeFilePath)) {
    console.log(
      '\x1b[33m%s\x1b[0m',
      `未找到 ${readmeFilePath} ，请使用 npm run changelog 生成。`,
    )
    return ''
  }
  const changelogStr = fs.readFileSync(readmeFilePath, 'utf8')
  const currentVersion = changelogStr.match(
    new RegExp(
      `(?<=### \\[${targetVersion}\\].*\n).*?(?=\n##+ \\[?\\d+.\\d+.\\d+)`,
      's',
    ),
  )

  if (!currentVersion || !currentVersion[0]) {
    console.log(
      '\x1b[33m%s\x1b[0m',
      `未找到${targetVersion}对应的 changelog 发布信息`,
    )
    return ''
  }

  const npmStr = '' // '- npm：[${appName}](https://npmjs.com/package/${appName})\n'
  const issueStr = `${issueLink && `- issue: [issue](${issueLink})\n`}`

  const changelog = currentVersion[0].replace(
    /\n\*(\s.*)/g,
    (a, b) => `\n-${b}`,
  )

  const template = `### ${appName} 更新\n\n\n\n- 版本：<font color="comment">${targetVersion}</font>\n${npmStr}${
    repoLink && `- Git：[${repoLink}](${repoLink})\n`
  }${issueStr}${homepage && `- 文档：[${homepage}](${homepage})\n`}\n\n`

  const content = template.concat(changelog).replaceAll('###', '\n\n###')

  return content
}

export function genVersionTip({ readmeFilePath, appInfo }) {
  const { name: appName, version, homepage = '', bugs, repository } = appInfo

  // const repoName = '';
  let issueLink = ''
  let repoLink = ''
  if (bugs && bugs.url) {
    issueLink = bugs.url
  }
  if (repository && repository.url) {
    repoLink = repository.url
    // repoName = repoLink.match(/(?<=com\/).+/);
  }

  return generatePublishInfo({
    version,
    repoLink,
    appName,
    homepage,
    issueLink,
    readmeFilePath,
  })
}
