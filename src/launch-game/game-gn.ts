import { initEnv } from '../env/env';

import {
  DEFAULT_WX_JS_SDK,
  GAME_SCHEME_PREFIX_MAP,
  getGPSchemeParam,
  launchCore,
} from './helper';

import type { IBaseLaunchParams } from './types';


/**
 * 拉起 GN
 * @param {object} params 拉起参数
 * @param {string} params.roomId 房间 Id
 * @param {string} params.roomPwd 房间 Pwd
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
 * launchGNGameRoom({
 *   roomId: '12',
 *   roomPwd: '123'
 * })
 * ```
 */
export function launchGNGameRoom({
  roomId = '',
  roomPwd = '',

  context,
  qrCodeLib,
  dialogHandler,
  otherDialogParams,

  wxJSLink = DEFAULT_WX_JS_SDK,
  env = initEnv(),
}: IBaseLaunchParams & {
  roomId: string;
  roomPwd: string;
}) {
  const schemeParam = getGPSchemeParam(roomId, roomPwd);

  return launchCore({
    launchParams: {
      roomId,
      roomPwd,
    },
    schemeParam,

    context,
    qrCodeLib,
    dialogHandler,
    otherDialogParams,

    schemePrefix: GAME_SCHEME_PREFIX_MAP.GN,
    wxJSLink,
    env,
  });
}
