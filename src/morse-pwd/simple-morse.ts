let clickCount = 0;
let simpleMorseTimer: ReturnType<typeof setTimeout>;


/**
 * 简单的摩斯密码，只有点击
 * @param param {object} 参数
 *
 * @example
 * ```ts
 * simpleMorse({
 *   target: 5, // 目标值
 *   callback: () => console.log('test'),
 *   timeout: 300, // 超时取消
 *   debug: false,
 * })
 * ```
 */
export function simpleMorse({
  target = 5,
  callback = () => {
    console.log('[Simple Morse]');
  },
  timeout = 300,
  debug = false,
}: {
  callback?: Function;
  target?: number;
  timeout?: number;
  debug?: boolean;
}) {
  clickCount = clickCount + 1;
  clearTimeout(simpleMorseTimer);

  if (debug) {
    console.log('[simpleMorse: clickCount]', clickCount);
  }

  if (clickCount >= target) {
    callback?.();
    clickCount = 0;
  }
  simpleMorseTimer = setTimeout(() => {
    clickCount = 0;
  }, timeout);
}
