import { EventBus } from './e-bus';


export const globalEBus = new EventBus();


/**
 * 挂载统一的eBus，所有实例共用一个
 * @param app Vue3 应用实例
 */
export const initGlobalVue3EBus = function (app: any) {
  if (!app?.config?.globalProperties) {
    return app;
  }

  app.config.globalProperties.$ebus = globalEBus;
  return [app, globalEBus];
};


/**
 * 挂载唯一的eBus，不同实例用不同的
 * @param app Vue3 应用实例
 */
export const initDiffVue3EBus = function (app: any) {
  if (!app?.config?.globalProperties) {
    return app;
  }

  const eBus = new EventBus();
  app.config.globalProperties.$ebus = eBus;
  return [app, eBus];
};

