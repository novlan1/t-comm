import { initEnv } from '../env/env';

import {
  DEFAULT_WX_JS_SDK,
  GAME_SCHEME_PREFIX_MAP,
  launchCore,
} from './helper';

import type { IBaseLaunchParams } from './types';


function getMJSchemeParam({
  seriesId,
  gameId,
  uin,
}: {
  gameId: string;
  seriesId: string;
  uin: string;
}) {
  const schemeParam = `firmMatch=1&seriesid=${seriesId}&gameid=${gameId}&uin=${uin}`;

  return schemeParam;
}


/**
 * 拉起 MJ
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
 * launchMJGameRoom({
 *   seriesId: '12',
 *   gameId: '123',
 *   uin: '222',
 * })
 * ```
 */
export function launchMJGameRoom({
  seriesId = '',
  gameId = '',
  uin = '',

  context,
  qrCodeLib,
  dialogHandler,
  otherDialogParams,

  wxJSLink = DEFAULT_WX_JS_SDK,
  env = initEnv(),
}: IBaseLaunchParams & {
  gameId: string;
  seriesId: string;
  uin: string;
}) {
  const schemeParam = getMJSchemeParam({
    seriesId,
    gameId,
    uin,
  });

  return launchCore({
    launchParams: {
      seriesId,
      gameId,
      uin,
    },
    schemeParam,

    context,
    qrCodeLib,
    dialogHandler,
    otherDialogParams,

    schemePrefix: GAME_SCHEME_PREFIX_MAP.MJ,
    wxJSLink,
    env,
  });
}


