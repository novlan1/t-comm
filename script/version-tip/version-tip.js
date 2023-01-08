/**
 * 测试version-tip功能
 * 可以修改package.json中的version，来查看不同效果
 */
const { genVersionTip, batchSendWxRobotMarkdown } = require('../../lib/index');

const pkg = require('../../package.json');

function main() {
  const content = genVersionTip({
    appInfo: pkg,
    showNpmLink: true,
    readmeFilePath: './CHANGELOG.md',
  });
  batchSendWxRobotMarkdown({
    content,
    chatId: 'ALL',
    webhookUrl: 'T_COMM_ROBOT___a07e58be-696b-482a-a3c7-e2e0ff41c56c', // t-comm更新robot
  });
}

main();
