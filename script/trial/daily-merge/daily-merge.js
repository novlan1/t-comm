const { dailyMerge } = require('../../../lib');
require('../../utils/env');


function main() {
  dailyMerge({
    webhookUrl: 'a04b05f2-c3db-4283-a4cb-825ca8f981a1',
    appName: '和平大众赛',
    projectId: '338897',
    devRoot: '/Users/yang/Documents/xxx/hp-match',

    baseUrl: process.env.GIT_WOA_BASE_URL,
    repoName: 'pmd-mobile/match/hp-match',
    privateToken: process.env.GIT_WOA_PRIVATE_TOKEN,

    isDryRun: true,
  });
}

main();
