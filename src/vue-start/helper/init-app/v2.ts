import type { AppOptionsType } from '../../types';

export function initApp(options: AppOptionsType, router, store) {
  const app = new options.Vue({
    el: '#app',
    i18n: options.i18n,
    router,
    store,
    render: h => h(options.App),
    mounted() {
      if (options.prerender) {
        document.dispatchEvent(new Event('render-event'));
      }
    },
  });

  (window as any).app = app;
}
