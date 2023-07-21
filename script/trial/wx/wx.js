require('../../utils/env');
const {
  // getAccessToken,
  getAPITicket,
  // genSignature,
} = require('../../../lib');

// const appId = process.env.WX_MP_APP_ID;
// const appSecret = process.env.WX_MP_APP_SECRET;
const accessToken = '70_bOnWzTiCoQhWG_GX8xMJysSsCwow54bZJKpRGCca01DIV-9d4etsYzOZGjaejJvlMbLM6BfN3kioaz-yacLZ9GdIs7WMNOx81TxPq6lYhD2maB6l8wVdY9oNKIkFWFaAFAZQZ';
// const ticket = 'sM4AOVdWfPE4DxkXGEs8VPvn47x7T8NnhIdMaLFatYX7z5OlNqOPxhMUgxsZoVgCTZ3V9Avg6hK3Lt-BruBjsw';


function main() {
  // const promise = getAccessToken({
  //   appId,
  //   appSecret,
  // });

  const promise = getAPITicket({
    accessToken,
  });

  // const promise = Promise.resolve(genSignature(
  //   ticket,
  //   'https://novlan1.github.io/press-ui-demo/',
  // ));

  promise.then((res) => {
    console.log('res', res);
  }).catch((err) => {
    console.log('err', err);
  });
}

main();

