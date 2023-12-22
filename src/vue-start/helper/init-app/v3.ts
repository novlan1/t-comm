import type { AppOptionsType } from '../../types';

export function initAppV3(options: AppOptionsType, router: Object, store: Object, createApp: Function) {
  const app = createApp(options.App);

  app.use(router);
  app.use(store);

  (window as any).gApp = app;

  return app;
}
