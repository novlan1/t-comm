import { initEnv } from '../env/env';

import {
  DEFAULT_WX_JS_SDK,
  GAME_SCHEME_PREFIX_MAP,
  LAUNCH_GP_SOURCE_MAP,
  getGPSchemeParam,
  launchCore,
} from './helper';


/**
 * 拉起 GP
 * @param {object} params 拉起参数
 * @param {string} params.roomId 房间 Id
 * @param {string} params.roomPwd 房间 Pwd
 * @param {string} params.source 来源
 * @param {string} [params.wxJSLink] wx js link
 * @param {object} [params.env] 环境对象
 * @param {object} [params.useGPHelperSchemePrefix] 是否使用特殊 scheme
 * @param {object} [params.justLaunchGame] 是否仅拉起 app，不进入房间
 * @returns Promise<boolean | number>
 *
 * @example
 * ```ts
 * launchGPGameRoom({
 *   roomId: '12',
 *   roomPwd: '123'
 * })
 * ```
 */
export function launchGPGameRoom({
  roomId = '',
  roomPwd = '',
  source = LAUNCH_GP_SOURCE_MAP.NORMAL,

  wxJSLink = DEFAULT_WX_JS_SDK,
  env = initEnv(),

  useGPHelperSchemePrefix = false,
  justLaunchGame = false,
}: {
  roomId: string;
  roomPwd: string;
  source?: string | number;

  wxJSLink?: string;
  env?:  Record<string, boolean>;

  useGPHelperSchemePrefix?: boolean;
  justLaunchGame?: boolean;
}) {
  const schemeParam = getGPSchemeParam(roomId, roomPwd, {
    source,
  });

  return launchCore({
    launchParams: {
      roomId,
      roomPwd,
    },
    schemeParam: justLaunchGame
      ? ''
      : schemeParam,
    schemePrefix: useGPHelperSchemePrefix
      ? GAME_SCHEME_PREFIX_MAP.GP_IN_HELPER
      : GAME_SCHEME_PREFIX_MAP.GP,

    wxJSLink,
    env,
  });
}


