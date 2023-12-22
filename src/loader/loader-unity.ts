import { loader as loaderCb } from './little-loader';
import { loadJS as loaderPromise } from './loader';


/**
 * 以 Promise 或者 Callback 的方式加载 js 文件，取决于是否传递 Callback
 * @param {string}  url  js文件路径
 * @param {function}  [cb]  回调
 * @returns {Promise<number>} promise
 */
export const loaderUnity = (source: string, cb: Function, ...args: Array<any>) => {
  if (typeof cb === 'function') {
    return loaderCb.call(this, source, cb, ...args);
  }
  return loaderPromise.call(this, source);
};

export const loader = loaderUnity;
