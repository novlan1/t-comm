import {
  composeUrlQuery,
  // getUrlPara,
} from '../url/url';
import { initEnv } from '../env/env';
import { loader } from '../loader/little-loader';
import { closeMsdkWebview } from '../msdk/msdk';

function getQRcodeUrl(roomId, roomPwd) {
  const qrCodeUrl = composeUrlQuery(window.location.href, {
    enterGame: true,
    roomId,
    roomPwd,
  });
  return qrCodeUrl;
}


function showQRcode({
  roomId,
  roomPwd,
  context,
  qrCodeLib, // qrcode npm library
  dialogHandler,
  otherDialogParams = {},
}) {
  const qrCodeUrl = getQRcodeUrl(roomId, roomPwd);
  console.info('[showQRcode] url', qrCodeUrl);

  if (!dialogHandler) return;

  qrCodeLib.toDataURL(qrCodeUrl)
    .then((url) => {
      dialogHandler.show({
        context,
        title: '提示',
        content: '请长按二维码再次打开链接并进入比赛',
        confirmText: '关闭',
        cancelText: '',
        src: url,
        ...(otherDialogParams || {}),
      });
      console.info(url);
    })
    .catch((err) => {
      console.error(err);
    });
}


export const launchGNGameRoom = ({
  roomId,
  roomPwd,
  context,
  qrCodeLib,
  dialogHandler,
  otherDialogParams,
  wxJSLink = 'https://res.wx.qq.com/open/js/jweixin-1.4.0.js',
  env = initEnv(),
}) => {
  const time = Math.floor(new Date().getTime() / 60000);
  const schemeParam = `rmid=${roomId}&rmPwd=${roomPwd}&t=${time}`;
  const schemeUrl = `gnyx1110329808://?type=Contest&${schemeParam}`;

  console.info('[launchGNGameRoom] schemeUrl: ', schemeUrl);
  console.info('[launchGNGameRoom] env', env);


  return new Promise((resolve, reject) => {
    if (env.isWeixin) {
      loader(wxJSLink, () => {
        window.WeixinJSBridge.invoke(
          'launchApplication', {
            schemeUrl,
            extInfo: schemeParam,
            parameter: schemeParam,
          },
          (res) => {
            console.info('res', res);

            if (res.err_msg.indexOf('ok') === -1) {
              if (res.err_msg.indexOf('permission') > -1
              || res.err_msg.indexOf('access_denied') > -1
              ) {
                showQRcode({
                  roomId,
                  roomPwd,
                  context,
                  qrCodeLib,
                  dialogHandler,
                  otherDialogParams,
                });
              } else {
                reject();
              }
            } else {
              resolve(1);
            }
          },
        );
      });

      return;
    }

    // const fakelink = `fakelink://&type=Contest&${schemeParam}`;

    // // if (uin) {
    // //   fakelink += `&uin=${uin}`;
    // // }

    // const ddzIngame = window.sessionStorage.getItem('ddz_ingame') || '';

    // if (ddzIngame == '1' || (!getUrlPara('msdkEncodeParam') && env.isMsdk)) {
    //   console.info('accesstoken!', env.isMsdk, window.msdkCloseWebview, env.isIOS, fakelink);
    //   if (env.isIOS) {
    //     console.info('ios', fakelink);
    //     // @ts-ignore
    //     window.location = fakelink;
    //   } else {
    //     console.info('not ios', fakelink);
    //     confirm(fakelink);
    //   }
    //   return;
    // }

    if (env.isInGame) {
      window.location.href = schemeUrl;

      setTimeout(() => {
        closeMsdkWebview(env);
      }, 1000);
      return;
    }

    window.location.href = schemeUrl;

  //   watchHiddenAndReport({
  //     childId,
  //   });
  //   resolve();
  });
};
