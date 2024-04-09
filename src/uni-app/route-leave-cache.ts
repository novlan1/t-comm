/**
 * 路由离开前记住缓存，返回后不刷新页面
 *
 * 比如创建赛事页面，如果前往查看规则，返回后，希望保留之前的表单
 *
 * 注意，用了这个 mixin，就不要用 onShow 了，而是用 mounted，
 * 否则可能会重复触发刷新
 *
 * @param {string} config.refresh 刷新方法
 * @returns 返回对象，包含 beforeRouteLeave 和 activated 方法
 */
export function getRouteLeaveCache({
  refresh,
  // cacheRoutes = [],
}: {
  refresh?: string;
  // cacheRoutes?: Array<string>;
}) {
  let randomKey = '';
  const RANDOM_KEY = 'RANDOM_KEY_CREATE';

  return {
    // beforeRouteLeave(to: { name: string }, from: any, next: Function) {
    //   if (cacheRoutes.includes(to.name)) {
    //     randomKey = `${Math.random() * 10000000}`;
    //     localStorage.setItem(RANDOM_KEY, randomKey);
    //   } else {
    //     localStorage.setItem(RANDOM_KEY, '');
    //   }
    //   next();
    // },
    activated() {
      const localRandomKey = localStorage.getItem(RANDOM_KEY);
      localStorage.setItem(RANDOM_KEY, '');
      const useCache = (localRandomKey && localRandomKey == randomKey);

      if (!useCache && refresh) {
        // @ts-ignore
        this[refresh]?.();
      }
    },
    mounted() {
      localStorage.setItem(RANDOM_KEY, '');
    },
    methods: {
      _jumpToCacheRoute() {
        randomKey = `${Math.random() * 10000000}`;
        localStorage.setItem(RANDOM_KEY, randomKey);
      },
    },
  };
}
