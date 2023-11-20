import { initCommonRouter } from './helper';
import type { AppOptionsType } from '../../types';


export function initRouter(options: AppOptionsType) {
  if (!options.VueRouter) return;

  options.Vue.use(options.VueRouter);

  const routes = initCommonRouter(options);

  const routerMode = options.routerMode ? options.routerMode : 'hash';

  let router;

  if (routerMode === 'hash') {
    router = new (options.VueRouter as any)({
      mode: routerMode,
      fallback: false,
      routes, // routes
      scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
          return savedPosition;
        }
        return { x: 0, y: 0 };
      },
    });
  } else {
    router = new (options.VueRouter as any)({
      mode: routerMode,
      base: process.env.VUE_APP_ROUTER_BASE || '/',
      fallback: false,
      routes,
      scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
          return savedPosition;
        }
        return { x: 0, y: 0 };
      },
    });
  }


  return router;
}
