require('../../utils/env');
const { getHistoryModeConfigDiffAndSendRobot  } = require('../../../lib');

function main() {
  getHistoryModeConfigDiffAndSendRobot({
    secretInfo: {
      appId: process.env.RAINBOW_APP_ID,
      envName: 'Default',
      groupName: 'devops',
    },
    appName: 'FrontOpenConfig',
    key: 'rd_platform_history_mode_sub_projects',
    chatId: ['ALL'],
    webhookUrl: 'abcc06e8-0afa-4efe-9375-34d774386cc4',
    mentions: ['guowangyang', 'yaoming'],
  }).then((res) => {
    console.log('fetchLatestOneRainbowData.res', res);
  })
    .catch((err) => {
      console.log('fetchLatestOneRainbowData.err', err);
    });
}

main();
