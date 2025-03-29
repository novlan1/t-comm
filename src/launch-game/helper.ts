import { initEnv } from '../env/env';
import { GAME_MAP } from '../launch-app/config';
import { loader } from '../loader/little-loader';
import { closeMsdkWebview } from '../msdk/msdk';
import {
  composeUrlQuery,
} from '../url/url';

import type { IBaseLaunchParams } from './types';


export const GAME_SCHEME_PREFIX_MAP = {
  GP: 'pubgmhd1106467070://?',
  GN: 'gnyx1110329808://?type=Contest&',
  MJ: 'happymjscheme://matchFrom=1?',
};


export const DEFAULT_WX_JS_SDK = 'https://res.wx.qq.com/open/js/jweixin-1.4.0.js';

const gidAppIdMap = {
  [GAME_MAP.HLDDZ.GID]: 'wx76fc280041c16519',
  [GAME_MAP.MJ.GID]: 'wx3bef52104e238bff',
  [GAME_MAP.NARUTO.GID]: 'wx82dd7436af5db835',
  [GAME_MAP.GP.GID]: 'wxc4c0253df149f02d',
} as const;

export function getWxGameCircleUrl(gid: string | number) {
  const appId = gidAppIdMap[gid as keyof typeof gidAppIdMap];
  return ` https://game.weixin.qq.com/cgi-bin/h5/static/gamecenter/detail.html?appid=${appId}&ssid=39&autoinstall=1&type=1#wechat_redirect`;
}

export function getGPSchemeParam(roomId: string | number, roomPwd: string | number) {
  const time = Math.floor(new Date().getTime() / 60000);

  const schemeParam = `rmid:${roomId},rmpw:${roomPwd},t:${time}`;
  return schemeParam;
}

function getQRcodeUrl(launchParams: Record<string, any>) {
  const qrCodeUrl = composeUrlQuery(window.location.href, {
    enterGame: true,
    ...(launchParams || {}),

  });
  return qrCodeUrl;
}


export function launchInWX({
  wxJSLink,
  schemeUrl,
  schemeParam,
  launchParams = {},

  context,
  qrCodeLib,
  dialogHandler,
  otherDialogParams,
  resolve,
  reject,
}: {
  wxJSLink: string;
  schemeUrl: string;
  schemeParam: string;

  resolve: Function;
  reject: Function;
} & IBaseLaunchParams) {
  loader(wxJSLink, () => {
    window.WeixinJSBridge.invoke(
      'launchApplication', {
        schemeUrl,
        extInfo: schemeParam,
        parameter: schemeParam,
      },
      (res: any) => {
        console.info('[launchCore wx] res: ', res);

        if (res.err_msg.indexOf('ok') === -1) {
          if ((res.err_msg.indexOf('permission') > -1
          || res.err_msg.indexOf('access_denied') > -1)
          && qrCodeLib && dialogHandler
          ) {
            showQRcode({
              launchParams,
              context,
              qrCodeLib,
              dialogHandler,
              otherDialogParams,
            });
          } else {
            reject(res);
          }
        } else {
          resolve(res);
        }
      },
    );
  });
}


function showQRcode({
  launchParams,
  context,
  qrCodeLib, // qrcode npm library
  dialogHandler,
  otherDialogParams = {},
}: IBaseLaunchParams) {
  const qrCodeUrl = getQRcodeUrl(launchParams || {});
  console.info('[showQRcode] url', qrCodeUrl);

  if (!dialogHandler || !qrCodeLib) return;

  qrCodeLib.toDataURL(qrCodeUrl)
    .then((url: string) => {
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
    .catch((err: any) => {
      console.error(err);
    });
}


export function launchCore({
  launchParams = {},
  schemeParam,

  context,
  qrCodeLib,
  dialogHandler,
  otherDialogParams,

  schemePrefix = '',
  wxJSLink = 'https://res.wx.qq.com/open/js/jweixin-1.4.0.js',
  env = initEnv(),
}: IBaseLaunchParams & {
  schemePrefix?: string;
  schemeParam?: any;
}) {
  // const time = Math.floor(new Date().getTime() / 60000);

  // const schemeParam = `rmid:${roomId},rmpw:${roomPwd},t:${time}`;
  const schemeUrl = `${schemePrefix}${schemeParam}`;
  console.info('[launchCore schemeUrl]', schemeUrl);

  return new Promise((resolve, reject) => {
    if (env.isWeixin) {
      launchInWX({
        wxJSLink,
        schemeUrl,
        schemeParam,
        launchParams,

        context,
        qrCodeLib,
        dialogHandler,
        otherDialogParams,
        resolve,
        reject,
      });

      return;
    }

    if (env.isInGame) {
      window.location.href = schemeUrl;

      setTimeout(() => {
        closeMsdkWebview(env);
      }, 1000);
      return;
    }

    window.location.href = schemeUrl;

    resolve(1);
  });
}
