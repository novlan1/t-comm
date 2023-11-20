export type AppOptionsType = {
  Vue: any;
  App: any
  VueRouter?: any;
  Vuex?: any;
  VueLazyLoad?: any;

  // config: ConfigType,
  routerMap?: Array<any>;
  vxModule?: Object;
  vxModuleGetter?: Object;
  beforeStart?: Function;
  i18n?: any;
  routerMode?: 'hash' | 'history';
  projectMixins?: any;

  // 项目是否需要依赖BaseMixins
  noDependMixins?: boolean;
  loginType: string;
  loginFunction?: Function;
  uinHandler?: Function
  SimpleVueRouter?: boolean;
  prerender?: boolean;
  notfound?: string;

  vue3Router?: {
    createRouter: Function;
    createWebHashHistory: Function;
  };
  vue3Vuex?: {
    createStore: Function;
  }
};

