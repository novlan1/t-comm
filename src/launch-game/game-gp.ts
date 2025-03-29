import { initEnv } from '../env/env';

import {
  DEFAULT_WX_JS_SDK,
  GAME_SCHEME_PREFIX_MAP,
  getGPSchemeParam,
  launchCore,
} from './helper';


/**
 * 拉起 GP
 * @param {object} params 拉起参数
 * @param {string} params.roomId 房间 Id
 * @param {string} params.roomPwd 房间 Pwd
 * @param {string} [params.wxJSLink] wx js link
 * @param {object} [params.env] 环境对象
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

  wxJSLink = DEFAULT_WX_JS_SDK,
  env = initEnv(),
}: {
  roomId: string;
  roomPwd: string;
  wxJSLink?: string;
  env?:  Record<string, boolean>;
}) {
  const schemeParam = getGPSchemeParam(roomId, roomPwd);

  return launchCore({
    launchParams: {
      roomId,
      roomPwd,
    },
    schemeParam,
    schemePrefix: GAME_SCHEME_PREFIX_MAP.GP,

    wxJSLink,
    env,
  });
}


