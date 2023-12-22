import { initApp  } from './helper/init-app/v2';
import { initConfig  } from './helper/init-config/v2';
import { initMixin  } from './helper/init-mixin';
import { initRouter } from './helper/init-router/v2';
import { initStore } from './helper/init-store/v2';
import { initVLazy } from './helper/init-v-lazy/init-v-lazy';


import type { AppOptionsType } from './types';

let router: any;
let store: any;


/**
 * Vue项目初始化
 * @param {object} options 业务自定义配置
 * @param {object} options.App 业务App.vue对象
 * @param {Array<object>} [options.routerMap]  业务路由配置表
 * @param {Function} [options.beforeStart]  钩子函数，业务自定义
 * @param {boolean} [options.i18n] 支持国际化
 * @returns {object} 返回 { router, store }
 */
export function startApp(options: AppOptionsType) {
  if (!options.Vue) {
    console.warn('startApp need Vue');
    return;
  }
  if (!options.App) {
    console.warn('startApp need App');
    return;
  }

  createRouterAndStore(options);

  if (!options.noDependMixins) {
    initMixin(options.Vue, options);
  }
  initConfig(options.Vue);
  initVLazy(options);

  if (typeof options.beforeStart === 'function') {
    options.beforeStart(router, store);
  }

  initApp(options, router, store);

  return { router, store };
}

/**
 * 创建路由和Store
 * @private
 */
function createRouterAndStore(options: any) {
  if (router || store) {
    return;
  }
  router = initRouter(options);
  store = initStore(options);
}


