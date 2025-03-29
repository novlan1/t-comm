import { initEnv } from '../env/env';
import { GAME_MAP } from '../launch-app/config';
import { getUrlPara } from '../url/url';

import { getWxGameCircleUrl, launchInWX } from './helper';

import type { IBaseLaunchParams } from './types';


function ddzScheme({
  gameId,
  seriesId,
  uin,
  env,
}: {
  gameId: string | number;
  seriesId: string | number;
  uin: string | number;
  env: Record<string, boolean>;
}) {
  const schemeHost = env.isIOS ? 'wx76fc280041c16519' : 'qqgame.hlddz.scheme';

  let gameUrl = 'https://hlddz.huanle.qq.com/web/play.html?ADTAG=changshangsai&LoginType=Both&DefaultLoginType=WeChat&ParamType=OfflineMatch';
  if (gameId || seriesId) {
    gameUrl += `&SeriesID=${seriesId}&GameID=${gameId}`;
  }

  let schemeParam = `a=1&Operation=OfflineMatch&SeriesID=${seriesId}&GameID=${gameId}`;
  if (uin) {
    gameUrl += `&uin=${uin}`;
    schemeParam += `&uin=${uin}`;
  }

  const schemeUrl = `${schemeHost}://startapp?${schemeParam}`;

  return {
    schemeUrl,
    schemeParam,
    gameUrl,
  };
}


/**
 * 拉起 DDZ
 * @param {object} params 拉起参数
 * @param {string} params.seriesId series id
 * @param {string} params.gameId game id
 * @param {string} params.uin uin
 * @param {object} [params.context] 上下文，可传入组件实例 this
 * @param {object} [params.qrCodeLib] qrcode
 * @param {object} [params.dialogHandler] 弹窗 handler
 * @param {object} [params.otherDialogParams] 弹窗的其他参数
 * @param {string} [params.wxJSLink] wx js link
 * @param {object} [params.env] 环境对象
 * @returns Promise<boolean | number>
 *
 * @example
 * ```ts
 * launchDDZGameRoom({
 *   seriesId: '12',
 *   gameId: '123',
 *   uin: '222',
 * })
 * ```
 */
export const launchDDZGameRoom = ({
  seriesId = '',
  gameId = '',
  uin = '',

  context,
  qrCodeLib,
  dialogHandler,
  otherDialogParams,

  wxJSLink = 'https://res2.wx.qq.com/open/js/jweixin-1.6.0.js',
  env = initEnv(),
}: {
  gameId: string;
  seriesId: string;
  uin: string;
} & IBaseLaunchParams) => {
  const {
    schemeUrl,
    schemeParam,
    gameUrl,
  } = ddzScheme({
    gameId,
    seriesId,
    uin,
    env,
  });

  console.info('[launchDDZGameRoom] schemeUrl: ', schemeUrl);
  console.info('[launchDDZGameRoom] env: ', env);


  return new Promise((resolve, reject) => {
    if (env.isWeixin) {
      launchInWX({
        wxJSLink,
        schemeUrl,
        schemeParam,
        launchParams: {
          gameId,
          seriesId,
          uin,
        },

        context,
        qrCodeLib,
        dialogHandler,
        otherDialogParams,

        resolve,
        reject: () => {
          reject();
          window.location.href = getWxGameCircleUrl(GAME_MAP.HLDDZ.GID);
        },
      });

      return;
    }

    let fakeLink = `fakelink://&Operation=OfflineMatch&SeriesID=${seriesId}&GameID=${gameId}`;

    if (uin) {
      fakeLink += `&uin=${uin}`;
    }

    const ddzInGame = window.sessionStorage.getItem('ddz_ingame');

    if (ddzInGame === '1' || (!getUrlPara('msdkEncodeParam') && env.isMsdk)) {
      console.info('[launchDDZGameRoom] fakeLink: ', fakeLink);

      if (env.isIOS) {
        // @ts-ignore
        window.location = fakeLink;
      } else {
        confirm(fakeLink);
      }
      return;
    }

    if (env.isInGame) {
      const js = `{"MsdkMethod":"WGSendMessageToNative","MsgData":"${fakeLink}"}`;

      setTimeout(() => {
      // 延迟关闭游戏webview
        if (env.isMsdk
          && typeof window.msdkShare === 'function'
          && typeof window.msdkCloseWebview === 'function'
        ) {
          window.msdkShare(js);
          window.msdkCloseWebview();
        }
      }, 1);
      return;
    }


    window.location.href = gameUrl;

    resolve(1);
  });
};


