const { startDevopsPipeline } = require('../../../lib/index');
require('../../utils/env');


function main() {
  const { DEVOPS_APP_SECRET, DEVOPS_HOST } = process.env;

  startDevopsPipeline({
    pipelineId: 'p-b1e80478a51a44e2a3bacbb5ce6319ec',
    projectId: 'tip-h5',
    host: DEVOPS_HOST,
    secretInfo: {
      appCode: 'tip-tool',
      appSecret: DEVOPS_APP_SECRET,
      devopsUid: 'guowangyang',
    },
    data: {
      abc: 'abcabc',
      ddd: 'ddddddd',
    },
  }).then((resp) => {
    console.log('resp', resp);
  })
    .catch((err) => {
      console.log('err', err);
    });
}

main();
