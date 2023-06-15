
const { getTencentDocUserInfo } = require('../../../lib');
const {
  ACCESS_TOKEN,
} = require('./config');

async function main() {
  try {
    const result = await getTencentDocUserInfo({
      accessToken: ACCESS_TOKEN,
    });


    console.log('result', result, JSON.stringify(result));
  } catch (err) {
    console.log('err', err);
  }
}

main();
