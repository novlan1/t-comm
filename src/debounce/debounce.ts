/**
 * 防抖，场景：搜索
 *
 * 触发事件后在 n 秒内函数只能执行一次，如果
 * 在 n 秒内又触发了事件，则会重新计算函数执行时间
 *
 * @param {Function} fn 主函数
 * @param {number} time 间隔时间，单位 `ms`
 * @param {boolean} immediate 是否立即执行，默认 `false`
 * @returns 闭包函数
 *
 * @example
 *
 * ```ts
 * function count() {
 *  console.log('xxxxx')
 * }
 * window.onscroll = debounce(count, 500)
 *
 * window.onscroll = debounce(count, 500, true)
 * ```
 */
export function debounce(fn: Function, time: number, immediate = false) {
  let timer: ReturnType<typeof setTimeout>;
  let result: any;

  return function (...args: Array<any>) {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    // const args = [...arguments];

    if (immediate) {
      result = fn.apply(that, args);
    }

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      result = fn.apply(that, args);
    }, time);

    return result;
  };
}


/**
 * 不用生成中间函数的防抖
 *
 * @example
 * ```ts
 * debounceRun(func, args, {
 *   funcKey: 'funcKey',
 *   wait: 500, // 默认 500
 *   throttle: false, // 是否是节流，默认 false
 *   immediate: true, // 是否立即执行，默认 true
 * })
 * ``
 */
export const debounceRun = (() => {
  // 储存方法的 timer 的 map
  const timerMap = new Map();

  return (func: Function, args: any[] = [], options: {
    funcKey?: any;
    wait?: number;
    throttle?: boolean;
    immediate?: boolean;
    debug?: boolean;
  } = {}) => {
    const DEFAULT_OPTIONS = {
      funcKey: null,
      wait: 500,
      throttle: false,
      immediate: true,
      debug: false,
    };

    // 如果没有 funcKey 那么直接使用 func 作为 map 的 key
    const funcKey = options.funcKey || func;
    const wait = options.wait ?? DEFAULT_OPTIONS.wait;
    const throttle = options.throttle ?? DEFAULT_OPTIONS.throttle;
    const immediate = options.immediate ?? DEFAULT_OPTIONS.immediate;
    const debug = options.debug ?? DEFAULT_OPTIONS.debug;

    // 先看看 map 里面是否有 timer，有 timer 代表之前调用过
    let timer = timerMap.get(funcKey);

    if (immediate) {
      func.apply(this, args);
    }

    if (timer) {
      if (debug) {
        console.log('>>> debounceRun cached');
      }
      if (throttle) {
        return;
      }

      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      // 先把这个方法从 map 里面删掉
      timerMap.delete(funcKey);

      func.apply(this, args);

      if (debug) {
        console.log('>>> debounceRun executing func');
      }
    }, wait);

    // 将方法的 timer 存进 map， key 是 funcKey
    timerMap.set(funcKey, timer);
  };
})();
