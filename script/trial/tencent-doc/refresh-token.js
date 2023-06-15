
const { refreshTencentDocToken } = require('../../../lib');
const {
  CLIENT_ID,
  CLIENT_SECRET,
  REFRESH_TOKEN,
} = require('./config');

async function main() {
  try {
    const result = await refreshTencentDocToken({
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
    });


    console.log('result', result, JSON.stringify(result));
  } catch (err) {
    console.log('err', err);
  }
}

main();
