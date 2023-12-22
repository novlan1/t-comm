import { initCommonConfig } from './helper';

export function initConfig(app: any) {
  app.config.productionTip = false;

  initCommonConfig(app);

  // 忽略自定义元素标签抛出的报错
  if (app.config.ignoredElements) {
    // uni-app里定义了一系列uni-xxx的自定义标签，需要不影响它
    app.config.ignoredElements = [
      ...app.config.ignoredElements,
      'wx-open-launch-app',
      'wx-open-launch-weapp',
      'wx-open-subscribe',
    ];
  } else {
    app.config.ignoredElements = [
      'wx-open-launch-app',
      'wx-open-launch-weapp',
      'wx-open-subscribe',
    ];
  }
}


