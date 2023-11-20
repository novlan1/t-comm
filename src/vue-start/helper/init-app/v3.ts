import type { AppOptionsType } from '../../types';

export function initAppV3(options: AppOptionsType, router, store, createApp) {
  const app = createApp(options.App);

  app.use(router);
  app.use(store);

  (window as any).gApp = app;

  return app;
}
