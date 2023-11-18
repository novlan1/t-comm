import { isPromise } from '../validate/type';


/**
 * 将函数转成 Promise
 * @param {function} promiseLike 任意函数，可以为 Promise
 * @returns Promise 函数
 * @example
 * ```
 * const bar = () => 1;
 * toPromise(bar()).then(res => console.log(res)); // 1

 * function foo() {
 *   return new Promise(resolve => setTimeout(() => resolve(2), 1000));
 * }
 * toPromise(foo()).then(res => console.log(res)); // 2
 *
 * ```
 */
export function toPromise(promiseLike: any) {
  if (isPromise(promiseLike)) {
    return promiseLike;
  }
  return Promise.resolve(promiseLike);
}
