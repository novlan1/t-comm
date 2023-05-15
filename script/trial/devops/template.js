const { updateDevopsTemplateInstances } = require('../../../lib/index');
require('../../utils/env');

async function main() {
  const { DEVOPS_APP_SECRET, DEVOPS_HOST } = process.env;

  // createDevopsTemplateInstances({
  //   projectId: 'tip-h5',
  //   templateId: 'f7b13cf8929343a1bd56949e5463dfc4',
  //   host: DEVOPS_HOST,
  //   pipelineName: 'test-1-123',
  //   pipelineParam: [],
  //   secretInfo: {
  //     appCode: 'tip-tool',
  //     appSecret: DEVOPS_APP_SECRET,
  //     devopsUid: 'guowangyang',
  //   },
  // }).then((resp) => {
  //   console.log('resp', resp);
  //   require('fs').writeFileSync('./log/instance.json', JSON.stringify(resp.data, null, 2), {
  //     encoding: 'utf-8',
  //   });
  // })
  //   .catch((err) => {
  //     console.log('err', err);
  //   });

  updateDevopsTemplateInstances({
    pipelineId: 'p-fdf87362de09419aa10cffa35ea76fa6',
    templateId: '864ecf9343fb4748adfdecde92712401',
    projectId: 'tip-h5',
    host: DEVOPS_HOST,
    pipelineName: 'test-1-123',
    pipelineParam: [
      {
        id: 'rainbowConfigKey',
        required: true,
        type: 'STRING',
        defaultValue: 'esport_mp_ci',
        desc: '七彩石配置的key',
        readOnly: false,
      },
    ],
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
