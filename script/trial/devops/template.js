const { createDevopsTemplateInstances } = require('../../../lib/index');
require('../../utils/env');

async function main() {
  const { DEVOPS_APP_SECRET, DEVOPS_HOST } = process.env;

  createDevopsTemplateInstances({
    templateId: 'f7b13cf8929343a1bd56949e5463dfc4',
    projectId: 'tip-h5',
    host: DEVOPS_HOST,
    pipelineName: 'test-1-123',
    pipelineParam: [],
    secretInfo: {
      appCode: 'tip-tool',
      appSecret: DEVOPS_APP_SECRET,
      devopsUid: 'guowangyang',
    },
  }).then((resp) => {
    console.log('resp', resp);
    require('fs').writeFileSync('./log/instance.json', JSON.stringify(resp.data, null, 2), {
      encoding: 'utf-8',
    });
  })
    .catch((err) => {
      console.log('err', err);
    });
}

main();
