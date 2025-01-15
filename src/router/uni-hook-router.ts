/**
 * 拦截路由
 *
 * @example
 * ```ts
 * uniHookRouter({
 *   navigateToHooks: [
 *     () => console.log('1')
 *   ],
 *    navigateBackHooks: [
 *      () => console.log('2')
 *    ],
 *    redirectToHooks: [
 *      () => console.log('3')
 *    ],
 *    debug: true,
 * })
 * ```
 */
export function uniHookRouter({
  navigateToHooks,
  navigateBackHooks,
  redirectToHooks,

  tryUniInterCeptor = true,
  debug = false,
}: {
  navigateToHooks?: Array<Function>;
  navigateBackHooks?: Array<Function>;
  redirectToHooks?: Array<Function>;

  tryUniInterCeptor?: boolean;
  debug?: boolean;
}) {
  const originNavigateTo = uni.navigateTo;
  const originNavigateBack = uni.navigateBack;
  const originReplaceTo = uni.redirectTo;


  const toDebug = (name: string, callbacks?: Array<Function>) => ({
    invoke(...args: Array<any>) {
      callbacks?.forEach(cb => cb?.(...args));
      if (debug) {
        console.log(`>>> uniHookRouter ${name} invoke`);
      }
    },
    success() {
      if (debug) {
        console.log(`>>> uniHookRouter ${name} success`);
      }
    },
    fail() {
      if (debug) {
        console.log(`>>> uniHookRouter ${name} fail`);
      }
    },
    complete() {
      if (debug) {
        console.log(`>>> uniHookRouter ${name} complete`);
      }
    },
  });

  if (tryUniInterCeptor && typeof uni.addInterceptor === 'function') {
    uni.addInterceptor('navigateTo', {
      ...toDebug('navigateTo', navigateToHooks),
    });

    uni.addInterceptor('navigateBack', {
      ...toDebug('navigateBack', navigateBackHooks),
    });

    uni.addInterceptor('redirectTo', {
      ...toDebug('redirectTo', redirectToHooks),
    });

    return;
  }

  if (originNavigateTo) {
    uni.navigateTo = (...args: Array<any>) => {
      navigateToHooks?.forEach(cb => cb?.(...args));
      originNavigateTo(...args);
    };
  }

  if (originNavigateBack) {
    uni.navigateBack = (...args: Array<any>) => {
      navigateBackHooks?.forEach(cb => cb?.(...args));
      originNavigateBack(...args);
    };
  }

  if (originReplaceTo) {
    uni.redirectTo = (...args: Array<any>) => {
      redirectToHooks?.forEach(cb => cb?.(...args));
      originReplaceTo(...args);
    };
  }
}
