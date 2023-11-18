const {
  sendOverTimePipelineMessage,
} = require('../../../lib/index');
require('../../utils/env');


function main() {
  const { DEVOPS_APP_SECRET, DEVOPS_HOST } = process.env;

  sendOverTimePipelineMessage({
    params: {
      projectId: 'tip-h5',
      host: DEVOPS_HOST,
      secretInfo: {
        appCode: 'tip-tool',
        appSecret: DEVOPS_APP_SECRET,
        devopsUid: 'guowangyang',
      },
      page: 1,
      pageSize: 1000,
    },
    webhookUrl: '8c2c8108-065f-41eb-8b16-99103b4f04ed',
    chatId: ['ALL'],
    pipelineHost: '',
  });
}

main();
