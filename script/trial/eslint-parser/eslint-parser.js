const path = require('path');

const { parseEslintAndSendRobot } = require('../../../lib');

parseEslintAndSendRobot({
  mrId: '123',
  lintReportFile: path.resolve(process.cwd(), './test/unit/coverage/lint-results-meta.json'),
  repoConfig: {
    domain: 'https://git.com/',
    repo: '/common/',
    branch: '/feature/test-docs/',
  },
  robotInfo: {
    webhookUrl: '400f26b7-4d3a-4d98-ac08-971dd6f89d89',
    chatId: 'wrkSFfCgAA6JOG0Um59U3NEgdryDJqtQ',
  },
});
