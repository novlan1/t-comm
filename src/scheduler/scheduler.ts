import type { IRequest } from './types';


class Scheduler {
  pendingState: Array<IRequest>;
  doingJobs: number;
  maxConcurrency: number;

  /**
   * 异步任务调度器，同一时间只能执行 n 个任务
   * @param {number} [maxConcurrency] 最多同时执行的任务数目，默认为 2
   *
   * @example
   * ```ts
   * let scheduler;
   *
   * export async function login({
   *   userId,
   *   userSig,
   *   tim,
   * }: {
   *   userId: string;
   *   userSig: string;
   *   tim: IChatSDK;
   * }) {
   *   if (!scheduler) {
   *     scheduler = new Scheduler(1);
   *   }
   *
   *   return await scheduler.add(innerLogin.bind(null, {
   *     userId,
   *     userSig,
   *     tim,
   *   }));
   * }
   * ```
   */
  constructor(maxConcurrency = 2) {
    this.pendingState = [];
    this.doingJobs = 0;
    this.maxConcurrency = maxConcurrency;
  }

  add(promiseCreator: IRequest): Promise<any> {
    return new Promise((resolve, reject) => {
    // 关键是给传过来的函数加个回调属性，当resolved的时候，就能返回对应的结果了。
      promiseCreator.resolve = resolve;
      promiseCreator.reject = reject;
      this.pendingState.push(promiseCreator);
      this.doJob();
    });
  }

  unshift(promiseCreator: IRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      // 关键是给传过来的函数加个回调属性，当resolved的时候，就能返回对应的结果了。
      promiseCreator.resolve = resolve;
      promiseCreator.reject = reject;
      this.pendingState.unshift(promiseCreator);
      this.doJob();
    });
  }


  doJob = () => {
    if (this.doingJobs < this.maxConcurrency && this.pendingState.length) {
      this.doingJobs += 1;
      const job = this.pendingState.shift();

      if (!job) {
        return;
      }

      job()
        .then((res: any) => {
          this.doingJobs -= 1;
          job.resolve?.(res);
          this.doJob();
        })
        .catch((e: any) => {
          this.doingJobs -= 1;
          job.reject?.(e);
          this.doJob();
        })
        .finally(() => {});
    }
  };
}

export {
  Scheduler,
};
