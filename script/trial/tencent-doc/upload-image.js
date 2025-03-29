/**
 * 上传图片
 */
const IMAGE = require('path').resolve(__dirname, 'press-ui-logo.png');

const { uploadTencentDocImage } = require('../../../lib');

const {
  ACCESS_TOKEN,
  CLIENT_ID,
  OPEN_ID,
} = require('./config');


async function main() {
  try {
    const result = await uploadTencentDocImage({
      accessToken: ACCESS_TOKEN,
      clientId: CLIENT_ID,
      openId: OPEN_ID,
      image: IMAGE,
    });
    console.log('result', result);
  } catch (err) {
    console.log('err', err);
  }
}

main();
