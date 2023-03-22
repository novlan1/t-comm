const { pushUrlCache } = require('../../../lib');

require('../../utils/env');

function main() {
  const {
    OVERSEAS_CLOUD_SECRET_ID: secretId,
    OVERSEAS_CLOUD_SECRET_KEY: secretKey,
  } = process.env;
  console.log('secretKey', secretKey);
  console.log('secretId', secretId);

  pushUrlCache({
    secretId,
    secretKey,
    urls: [
      'https://cyberimage.sgameglobal.com/static/js/chunk-core-js.d2f9f03b.js',
      'https://cyberimage.sgameglobal.com/static/js/runtime.ec954923.js',
    ],
  }).then((res) => {
    console.log('[main] res: ', res.data);
  })
    .catch((err) => {
      console.log('[main] err', err);
    });
}

main();
