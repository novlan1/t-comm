import { getVLazyOptions } from '../../../v-lazy/v-lazy';


export function initVLazy(options: any) {
  if (!options.VueLazyLoad) return;

  options.Vue.use(options.VueLazyLoad, getVLazyOptions());
}

