
const { batchUpdateTencentSheetV3 } = require('../../../lib');
const {
  ACCESS_TOKEN,
  CLIENT_ID,
  OPEN_ID,
} = require('./config');


async function main() {
  try {
    const result = await batchUpdateTencentSheetV3({
      accessToken: ACCESS_TOKEN,
      clientId: CLIENT_ID,
      openId: OPEN_ID,

      bookId: '300000000$HDrklTrCLcjw',
      requests: [
        {
          // addSheetRequest: {
          //   title: 'test',
          // },
          updateRangeRequest: {
            sheetId: 'hjvlvz',
            gridData: {
              startRow: 0,
              startColumn: 0,
              rows: [
                {
                  values: [
                    {
                      cellValue: {
                        text: '123',
                      },
                    },
                    {
                      cellValue: {
                        text: 'test',
                      },
                    },
                    {
                      cellValue: {
                        text: 'test123',
                      },
                    },
                    {
                      cellValue: {
                        link: {
                          url: 'docs.qq.com',
                          text: '超链接',
                        },
                      },
                    },
                  ],
                },
              ],
            },
          },
        }],
    });


    console.log('result', result, JSON.stringify(result));
  } catch (err) {
    console.log('err', err);
  }
}

main();
