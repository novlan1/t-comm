const { getOneProjectDetail } = require('../../../lib');
require('../../utils/env');

console.log('process.env', process.env);
function main() {
  getOneProjectDetail({
    projectName: 'pmd-mobile/match/pro',
    privateToken: process.env.GIT_WOA_PRIVATE_TOKEN,
    baseUrl: process.env.GIT_WOA_BASE_URL,
  }).then((res) => {
    console.log('res', res);
  })
    .catch((err) => {
      console.log('err', err);
    });
}

main();
