import { loadVConsole } from './v-console'
import { isPromise } from '../validate/type'


/**
 * 生成 v-console
 * 有几种情况：
 * 1. 不显示
 * 2. 立即显示
 * 3. 异步判断后，确定是否显示
 * @param params 参数
 * @example
 *
 * ```ts
 * genVConsole({
 *   immediateShow: isShowVConsole === 'true'
 *     || isTestEnv()
 *     || noDelay === V_CONSOLE_NO_DELAY.VALUE,
 *   hide: isShowVConsole === 'false' || !!UserInfo.tipUid(),
 *   asyncConfirmFunc: checkIsDevList,
 * });
 * ```
 */
export function genVConsole({
  immediateShow = false,
  hide = false,
  vConsoleConfig = {},
  asyncConfirmFunc,
}: {
  immediateShow?: boolean;
  hide?: boolean;
  vConsoleConfig?: Record<string, any>;
  asyncConfirmFunc?: Function;
}) {

  if (hide) {
    return;
  }

  if (immediateShow) {
    loadVConsole(vConsoleConfig)
  }

  if (isPromise(asyncConfirmFunc)) {
    asyncConfirmFunc?.()?.then(() => {
      loadVConsole(vConsoleConfig)
    })
  }
}
