

class PollingRequest {
  maxRequest: number;
  maxPollingTime: number;
  timeInterval: number;

  timer: any;


  /**
   * 轮询
   * @constructor
   * @param {number} [maxPollingTime=10] 最大轮询次数
   * @param {number} [timeInterval=2000] 轮询间隔
   * @example
   *
   * ```ts
   * const polling = new PollingRequest(10);
   * const cb = () => {
   *   this.onGetTeamList(true);
   * };
   * polling.polling(cb);
   * ```
   */
  constructor(maxPollingTime = 10, timeInterval = 2000) {
    this.maxRequest = 0;
    this.maxPollingTime = maxPollingTime;
    this.timeInterval = timeInterval;
    this.timer = null;
  }

  /**
   * 重置，即取消轮询
   */
  reset() {
    this.maxRequest = 0;
    clearInterval(this.timer);
  }

  /**
   * 开始轮询
   * @param {function} func 轮询方法
   */
  polling(func: Function) {
    this.timer = setInterval(() => {
      this.maxRequest += 1;

      if (this.maxRequest > this.maxPollingTime) {
        clearInterval(this.timer);
        this.maxRequest = 0;
      } else {
        func?.();
      }
    }, this.timeInterval);
  }
}

// 这种导出可以用 jsdoc 生成文档
// export class XXX 不可以
export { PollingRequest };
