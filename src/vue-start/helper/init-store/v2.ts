export function initStore(options: any) {
  if (!options.Vuex) return;

  options.Vue.use(options.Vuex);

  const store = new options.Vuex.Store({
    modules: {
      ...options.vxModule,
    },
  });
  return store;
}
