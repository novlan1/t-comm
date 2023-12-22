/**
 * 防抖，场景：搜索
 *
 * 触发事件后在 n 秒内函数只能执行一次，如果
 * 在 n 秒内又触发了事件，则会重新计算函数执行时间
 *
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
 * window.onscroll = debounce(count, 500)
 * ```
 */
export function debounce(fn: Function, time: number) {
  let timer: ReturnType<typeof setTimeout>;

  return function (...args: Array<any>) {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    // const args = [...arguments];
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(that, args);
    }, time);
  };
}

