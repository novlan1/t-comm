/**
 * 更新表格文字
 */
const { updateTencentSheet } = require('../../../lib');
const {
  ACCESS_TOKEN,
  CLIENT_ID,
  OPEN_ID,
} = require('./config');


async function main() {
  try {
    const result = await updateTencentSheet({
      accessToken: ACCESS_TOKEN,
      clientId: CLIENT_ID,
      openId: OPEN_ID,

      bookId: '300000000$HcVvbqHdoKdH', // '300000000$HDrklTrCLcjw',
      // bookId: '300000000$HXFJfWyuynWX',
      // range: 'BB08J2!B16:C16',
      range: 'BB08J2!B16:C16',
      values: [['123', '123123']],
    });
    console.log('result', result);
  } catch (err) {
    console.log('err', err);
  }
}

main();
