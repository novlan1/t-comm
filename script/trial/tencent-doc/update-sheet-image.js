/**
 * 更新表格图片
 */
const { updateTencentSheetImage, uploadTencentDocImage } = require('../../../lib');
const {
  ACCESS_TOKEN,
  CLIENT_ID,
  OPEN_ID,
} = require('./config');

const IMAGE = require('path').resolve(__dirname, 'press-ui-logo.png');


async function main() {
  try {
    const imageData = await uploadTencentDocImage({
      accessToken: ACCESS_TOKEN,
      clientId: CLIENT_ID,
      openId: OPEN_ID,
      image: IMAGE,
    });

    const result = await updateTencentSheetImage({
      accessToken: ACCESS_TOKEN,
      clientId: CLIENT_ID,
      openId: OPEN_ID,

      bookId: '300000000$HDrklTrCLcjw',
      insertImages: {
        sheetID: 'BB08J2',
        images: [
          {
            type: 1,
            imageID: imageData.data.imageID,
            width: 100,
            height: 100,
            row: 6,
            col: 1,
            offsetX: null,
            offsetY: null,
            clip_info: null,
          },
        ],
      },
    });
    console.log('result', result);
  } catch (err) {
    console.log('err', err);
  }
}

main();
