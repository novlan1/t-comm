import { initCommonRouter } from './helper';
import type { AppOptionsType } from '../../types';


export function initRouterV3(options: AppOptionsType) {
  if (!options.vue3Router) return;

  const { createRouter, createWebHashHistory } = options.vue3Router;

  const routes = initCommonRouter(options);
  const routerOptions = {
    history: createWebHashHistory(),
    routes,
  };

  const router = createRouter(routerOptions);
  return router;
}
