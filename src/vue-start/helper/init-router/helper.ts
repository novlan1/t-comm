import type { AppOptionsType } from '../../types';


export function initCommonRouter(options: AppOptionsType) {
  // 路由 router
  if (typeof options.routerMap === 'undefined') {
    options.routerMap = [];
  }

  return options.routerMap;
}
