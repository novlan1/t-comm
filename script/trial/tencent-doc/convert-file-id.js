/**
 * 执行本文件，将获取腾讯文档对应的fileId
 * 参考: https://docs.qq.com/open/document/app/openapi/v2/file/common/id.html
 */
const { convertTencentFileId } = require('../../../lib');
const {
  ACCESS_TOKEN,
  CLIENT_ID,
  OPEN_ID,
} = require('./config');

const FILE_ID = '300000000$HNFkydcIfNCF';
const TYPE = 1;

function main() {
  convertTencentFileId({
    accessToken: ACCESS_TOKEN,
    clientId: CLIENT_ID,
    openId: OPEN_ID,
    type: TYPE,
    value: FILE_ID,
  }).then((res) => {
    console.log('convertTencentFileId.res', res);
  })
    .catch((err) => {
      console.log('convertTencentFileId.err', err);
    });
}

main();
