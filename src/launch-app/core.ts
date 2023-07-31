import { merge } from '../lodash-mini/merge';
import { initEnv } from '../env/env';
import { closeWebView } from '../msdk/msdk';
import { loader } from '../loader/loader';

import type { IEnv } from '../env/types';
import type { ILaunchAppParams } from './types';

/**
 * @description 通过 location.href 来拉起
 * @param {String} scheme  必须，协议
 * @ignore
 */
function launchByHref(scheme?: string) {
  if (!scheme) return;
  const win = (window !== top) && top ? top : window;
  win.location.href = scheme;
}

/**
 * @description 通过可见性来判断是否唤起成功
 * @param {Object} params
 * @param {Function} params.successCallback  可选，唤起成功回调
 * @param {Function} params.failCallback     可选，唤起失败回调
 * @param {int} params.delay                 可选，延迟多少时间后，判断是否拉起成功
 * @ignore
 */
function checkLaunchResultByVisibility({
  successCallback,
  failCallback,
  delay = 3500,
}: {
  successCallback?: Function;
  failCallback?: Function;
  delay?: number;
}) {
  let hasCallback = false;
  let hiddenProperty = 'hidden';

  // visibilityChangeEvent
  if ('hidden' in document) {
    hiddenProperty = 'hidden';
  } else if ('webkitHidden' in document) {
    hiddenProperty = 'webkitHidden';
  } else if ('mozHidden' in document) {
    hiddenProperty = 'mozHidden';
  }
  const visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');

  // eventHandler
  const onVisibilityChange = function () {
    if (document[hiddenProperty as 'hidden']) {
      hasCallback = true;
      successCallback?.();
    }
  };

  document.removeEventListener(visibilityChangeEvent, onVisibilityChange);
  document.addEventListener(visibilityChangeEvent, onVisibilityChange);
  setTimeout(() => {
    if (!hasCallback) {
      failCallback?.();
    }
    document.removeEventListener(visibilityChangeEvent, onVisibilityChange);
  }, delay);
}

/**
 * @description 通过定时器来判断是否唤起成功，适用于安卓
 * @param {Object} params
 * @param {Function} params.successCallback  可选，唤起成功回调
 * @param {Function} params.failCallback     可选，唤起失败回调
 * @ignore
 */
function checkLaunchResultByTimer({
  successCallback,
  failCallback,
  maxTime = 3000,
}: {
  successCallback?: Function;
  failCallback?: Function;
  maxTime?: number;
}) {
  const startTime = Date.now();

  // document.hidden 兼容性
  let hiddenProperty = 'hidden';
  if ('hidden' in document) {
    hiddenProperty = 'hidden';
  } else if ('webkitHidden' in document) {
    hiddenProperty = 'webkitHidden';
  } else if ('mozHidden' in document) {
    hiddenProperty = 'mozHidden';
  }

  // 检查定时器是否准确，若拉起 App，页面运行在后台会导致 setInterval 不准
  // 对于 Android 来说，setTimeout 不受影响，所以选 setInterval
  function check(elsTime: number) {
    if (elsTime > maxTime || document[hiddenProperty as 'hidden']) {
      successCallback?.();
    } else {
      failCallback?.();
    }
  }

  // 启动间隔20ms运行的定时器，并检测累计消耗时间是否超过3000ms，超过则结束
  let count = 0;
  const interval = setInterval(() => {
    count += 1;
    const endTime = Date.now();
    const duration = endTime - startTime;

    if (count >= 100 || duration > maxTime) {
      clearInterval(interval);
      check(duration);
    }
  }, 20);
}

/**
 * @description 在微信内，需要通过微信 JSSDK API 来唤起
 * @param {Object} params
 * @param {String} params.appid              必填，供iOS使用
 * @param {String} params.weixinScheme       必填，scheme://parameter 通过系统接口拉起第三方app。中文或特殊字符需要encode
 * @param {Function} params.successCallback  可选，唤起成功回调
 * @param {Function} params.failCallback     可选，唤起失败回调
 * @ignore
 */
function launchInWeiXin({
  appid,
  weixinScheme,
  successCallback,
  failCallback,
}: {
  appid: string;
  weixinScheme: string;
  successCallback?: Function;
  failCallback?: Function;
}) {
  const sdkUrl = 'https://image-1251917893.file.myqcloud.com/commjs/jweixin-1.6.0.js';
  const invokeParams = {
    schemeUrl: weixinScheme,
    appID: appid,
  };
  const afterInvoke = (res: any) => {
    console.log('[launchInWeiXin] result', { res });
    const isSuccess = res?.err_msg?.indexOf('ok') !== -1;
    if (isSuccess) {
      successCallback?.();
    } else {
      failCallback?.();
    }
  };

  const onBridgeReady = () => {
    loader(sdkUrl, () => {
      WeixinJSBridge.invoke(
        'launchApplication',
        invokeParams,
        afterInvoke,
      );
    });
  };

  // WeixinJSBridge 接口加载后再 invoke
  if (typeof WeixinJSBridge === 'undefined') {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    }
  } else {
    onBridgeReady();
  }
}

/**
 * @description 在手Q内，调用手Q JSSDK API 唤起
 * @param {Object} params
 * @param {Object} params.env                必须，环境信息，内部自动传递
 * @param {String} params.qqAppScheme        必填，仅供 iOS 使用，scheme://parameter 通过系统接口拉起第三方app。中文或特殊字符需要encode
 * @param {String} params.qqAppPackageName   必填，仅供 Android 使用，安装包包名
 * @param {Function} params.successCallback  可选，唤起成功回调
 * @param {Function} params.failCallback     可选，唤起失败回调
 * @ignore
 */
function launchInMobileQQ({
  env,
  isUseSchemeParams,
  qqAppScheme,
  qqAppPackageName,
  successCallback,
  failCallback,
}: {
  env: IEnv;
  isUseSchemeParams?: boolean;
  qqAppScheme?: string;
  qqAppPackageName?: string;
  successCallback?: Function
  failCallback?: Function;
}) {
  // 在手Q下，通过 visibility 事件判断是否成功拉起
  const check = () => {
    checkLaunchResultByVisibility({
      successCallback,
      failCallback,
    });
  };

  // API不支持传参，所以如果 scheme 包含参数，直接拉起
  if (isUseSchemeParams) {
    launchByHref(qqAppScheme);
    check(); // 判断是否拉起

  // 无参数，通过 API 拉起
  } else {
    loader('https://pub.idqqimg.com/qqmobile/qqapi.js?_bid=152', () => {
      const scheme = env.isIos ? qqAppScheme : qqAppPackageName;
      window.mqq.app.launchApp(scheme);
      check(); // 判断是否拉起
    });
  }
}

/**
 * @description 在 iOS 原生浏览器内，直接拉起
 * @param {Object} params
 * @param {Object} params.env                必须，环境信息，内部自动传递
 * @param {String} params.browserAppScheme   必填，scheme://parameter 通过系统接口拉起第三方app。中文或特殊字符需要encode
 * @param {Function} params.successCallback  可选，唤起成功回调
 * @param {Function} params.failCallback     可选，唤起失败回调
 * @ignore
 */
function launchInIOSBrowser({
  browserAppScheme,
  successCallback,
  failCallback,

}: {
  browserAppScheme: string;
  successCallback?: Function;
  failCallback?: Function
}) {
  launchByHref(browserAppScheme);

  // 检查唤起结果
  checkLaunchResultByVisibility({
    successCallback,
    failCallback,
  });
}

/**
 * @description 在 Android 原生浏览器内，直接使用原生支持的 Universal Links 形式，但通过 iframe 形式唤起
 * @param {Object} params
 * @param {String} params.env                必须，环境信息，内部自动传递
 * @param {String} params.browserApkScheme   必填，scheme://parameter 通过系统接口拉起第三方app。中文或特殊字符需要encode
 * @param {Function} params.successCallback  可选，唤起成功回调
 * @param {Function} params.failCallback     可选，唤起失败回调
 * @ignore
 */
function launchInAndroidBrowser({
  browserApkScheme,
  successCallback,
  failCallback,
}: {
  browserApkScheme: string;
  successCallback?: Function;
  failCallback?: Function
}) {
  // 通过 iframe 唤起
  const div = document.createElement('div');
  div.style.visibility = 'hidden';
  div.innerHTML = `<iframe id="scheme" src="${browserApkScheme}" scrolling="no" width="1" height="1"></iframe>`;
  document.body.appendChild(div);

  // 通过定时器是否延时来检查是否成功唤起
  checkLaunchResultByTimer({
    successCallback,
    failCallback,
  });
}

/**
 * @description 兼容微信、手Q、手机原生浏览器、游戏内环境的唤起第三方 APP 方法。用于替代 launch 方法，优化传参以及底层实现。
 * @param {Object} args 必须，参数对象
 * @param {String} args.appid              必须，用于微信内拉起，微信开放平台的 appID，向游戏公众号管理者索取。
 * @param {String} args.weixinScheme       必须，用于微信内拉起，目标 App 的 URL Scheme
 * @param {String} args.browserAppScheme   必须，用于 iOS 原生浏览器拉起，目标 App 的 URL Scheme
 * @param {String} args.browserApkScheme   必须，用于 Android 原生浏览器拉起，目标 App 的 URL Scheme
 * @param {String} args.qqAppScheme        必须，用于 iOS + 手 Q 内拉起，目标 App 的 URL Scheme
 * @param {String} args.qqAppPackageName   必须，用于 Android + 手 Q 内拉起，目标 App 的安卓包名，例如 com.tencent.tmgp.sgame
 * @param {Boolean} args.isUseSchemeParams  可选，默认 false，scheme 是否携带参数，用于手Q内判断切换拉起方式
 * @param {Boolean} args.openMarket         可选，默认 false，若跳转失败，拉起应用下载地址
 * @param {String} args.appMarketUrl       可选，默认空，Appstore 下载地址，例如 https://itunes.apple.com/cn/app/id989673964
 * @param {String} args.apkMarketUrl       可选，默认空，安卓应用下载地址，例如 market://details?id=com.tencent.tmgp.sgame
 * @param {Boolean} args.needRedirect       可选，默认 false，若不跳转下载，是否跳转其他地址
 * @param {String} args.redirectUrl        可选，默认空，跳转其他地址，例如某官网地址
 * @param {String} args.failTips           可选，默认空，若不跳转下载 or 其他地址，而是开启拉起失败提示，该处填写提示内容
 * @param {Function} args.successCallback    可选，默认空，拉起成功回调
 * @param {Function} args.failCallback       可选，默认空，拉起失败回调
 */
export function launchApp(args: ILaunchAppParams = {}) {
  args?.Toast?.showLoading('启动中...');

  const env = initEnv();
  const baseParams = {
    isUseSchemeParams: false, // scheme 是否携带参数
    // 微信内拉起
    appid: '', // 微信开放平台的 appID，向游戏公众号管理者索取。
    weixinScheme: '',
    // 网页内拉起
    browserAppScheme: '', // 用于 iOS 浏览器拉起
    browserApkScheme: '', // 用于 Android 浏览器拉起
    // 手Q内拉起
    qqAppScheme: '',
    qqAppPackageName: '',
    // 唤起失败处理开启优先级：错误回调 > 跳转下载 > 跳转链接 > 弹窗提示
    // 如果跳转失败，拉起下载
    openMarket: false,
    appMarketUrl: '',
    apkMarketUrl: '',
    // 如果不拉起下载，选择跳转
    needRedirect: false,
    redirectUrl: '',
    // 不拉起下载 or 跳转，通过提示
    failTips: '',
    // 错误回调
    failCallback: null,
    // 成功回调
    successCallback: null,
  };

  // 合并默认参数
  const params = merge({}, baseParams, {
    env,
    ...args,
  });

  // 二次封装失败、成功回调
  const customFailCallback = params.failCallback;
  const customSuccCallback = params.successCallback;
  const onSuccHandler = () => {
    args?.Toast?.dismissLoading();
    console.log('[launchApp] onSuccHandler');
    customSuccCallback?.();
  };

  // 错误处理：错误回调 > 跳转下载 > 跳转链接 > 弹窗提示
  const onFailHandler = () => {
    console.log('[launchApp] onFailHandler');
    args?.Toast?.dismissLoading();

    if (customFailCallback) {
      customFailCallback();
    } else if (params.openMarket) {
      if (env.isIOS) {
        params.appMarketUrl && (window.location.href = params.appMarketUrl);
      } else {
        params.apkMarketUrl && (window.location.href = params.apkMarketUrl);
      }
      if (env.isWeixin && !env.isMiniProgram) {
        checkLaunchResultByVisibility({
          successCallback: () => {
          },
          failCallback: () => {
            if (params.failTips) {
              args.Dialog?.showTipsDialog?.(params.failTips);
            }
          },
          delay: 2000,
        });
      }
    } else if (params.needRedirect) {
      params.redirectUrl && (window.location.href = params.redirectUrl);
    } else if (params.failTips !== '') {
      args.Dialog?.showTipsDialog?.(params.failTips);
    }
  };

  params.failCallback = onFailHandler;
  params.successCallback = onSuccHandler;

  // 在游戏内
  if (env.isInGame) {
    closeWebView(); // 关闭当前页面

  // 在微信内
  } else if (env.isWeixin && !env.isMiniProgram) {
    launchInWeiXin(params);

    // 在微信小程序内
  } else if (env.isWeixin && env.isMiniProgram) {
    onFailHandler();

  // 在手Q、QQ浏览器内
  } else if (env.isQQ) {
    launchInMobileQQ(params);

  // 原生浏览器 or 其他
  } else {
    // android
    if (env.isAndroid) {
      launchInAndroidBrowser(params);

    // iOS
    } else {
      launchInIOSBrowser(params);
    }
  }
}
