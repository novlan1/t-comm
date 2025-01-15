import { loadVConsole } from './v-console';


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
    loadVConsole(vConsoleConfig);
  }

  if (typeof asyncConfirmFunc === 'function') {
    asyncConfirmFunc?.()?.then(() => {
      loadVConsole(vConsoleConfig);
    })
    // 异常捕获，避免 TAM PROMISE_ERROR 错误上报
      .catch((error: any) => {
        console.log('checkIsDevList', error);
      });
  }
}
