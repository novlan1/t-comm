const { genVersionTip, batchSendWxRobotMarkdown, readEnvVariable } = require('../lib/index');
const pkg = require('../package.json');

function main() {
  const webhookUrl = readEnvVariable('T_COMM_ROBOT_WEBHOOK_URL', './.env.local');
  console.log('webhookUrl: ', webhookUrl);

  const content = genVersionTip({
    appInfo: pkg,
    showNpmLink: true,
    readmeFilePath: './CHANGELOG.md',
  });

  console.log('content:\n', content);

  batchSendWxRobotMarkdown({
    content,
    chatId: 'ALL',
    webhookUrl,
  });
}

main();
