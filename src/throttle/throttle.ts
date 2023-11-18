/**
 * 节流
 *
 * 连续触发事件但是在 n 秒中只执行一次函数
 * @param {Function} fn 主函数
 * @param {number} time 间隔时间，单位 `ms`
 * @returns 闭包函数
 *
 * @example
 *
 * ```ts
 * function count() {
 *  console.log('xxxxx')
 * }
 * window.onscroll = throttle(count, 500)
 * ```
 */
export function throttle(fn, time) {
  let timer;

  return function (...args) {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    // const args = [...arguments];

    if (!timer) {
      setTimeout(() => {
        timer = null; // 注意，一定要先置为null，再执行fn
        fn.apply(that, args);
      }, time);
    }
  };
}


