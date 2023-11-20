
import { initCommonConfig } from './helper';

export function initConfigV3(app) {
  app.config.compilerOptions.isCustomElement = [
    // 忽略自定义元素标签抛出的报错
    'wx-open-launch-app',
    'wx-open-launch-weapp',
  ];
  initCommonConfig(app);
}


