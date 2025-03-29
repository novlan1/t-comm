/**
 * 创建文档
 */
const { createTencentDoc } = require('../../../lib');

const {
  ACCESS_TOKEN,
  CLIENT_ID,
  OPEN_ID,
} = require('./config');


function main() {
  createTencentDoc({
    accessToken: ACCESS_TOKEN,
    clientId: CLIENT_ID,
    openId: OPEN_ID,
    type: 'sheet',
    title: 'test doc',
  }).then((res) => {
    console.log('res', res);
  })
    .catch((err) => {
      console.log('err', err);
    });
}

main();
