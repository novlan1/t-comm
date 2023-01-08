/**
 * 导出文档
 */
const { exportTencentDoc } = require('../../../lib');

const {
  ACCESS_TOKEN,
  CLIENT_ID,
  OPEN_ID,
} = require('./config');

const fileId = '300000000$HNFkydcIfNCF';

async function main() {
  try {
    const data = await exportTencentDoc({
      accessToken: ACCESS_TOKEN,
      clientId: CLIENT_ID,
      openId: OPEN_ID,

      fileId,
      exportType: 'sheet',
      waitTime: 0,
    });
    console.log('exportTencentDoc.data', data);
  } catch (err) {

  }
}

main();
