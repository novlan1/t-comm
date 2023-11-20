import type { AppOptionsType } from '../../types';


export function initStoreV3(options: AppOptionsType) {
  if (!options.vue3Vuex) return;
  const { createStore } = options.vue3Vuex;

  const store = createStore({
    modules: {
      ...options.vxModule,
    },
  });
  return store;
}
