import { initEnv, getEnvUAType } from '../env/env';
import { loader } from '../loader/little-loader';


/**
 * MSDK 浏览器中，向原生发送数据
 * @param {string} data 发送的数据
 * ```ts
 * sendToMsdkNative('123')
 * ```
 */
export function sendToMsdkNative(data = '') {
  const env = initEnv();

  if (env.isMsdk && !env.isMsdkV5) {
    if (typeof window.msdkCallNative === 'function') {
      window.msdkCallNative(data);
    } else if (typeof window.msdkCall === 'function') {
      window.msdkCall('WGSendMessageToNative', `{"MsdkMethod":"WGSendMessageToNative","MsgData":"${data}"}`);
    }
  } else if (env.isAndroid) {
    confirm(data);
  } else if (env.isIOS) {
    window.location.href = encodeURIComponent(data);
  }
}

export function addMsdkNativeCallbackListener(callback: Function) {
  const env = initEnv();
  if (env.isMsdk && !env.isMsdkV5) {
    if (typeof window.setMsdkCallback === 'function') {
      window.setMsdkCallback(callback);
    } else if (typeof window.msdkAddNativeCallbackObserver === 'function') {
      window.msdkAddNativeCallbackObserver(callback);
    }
  }
}

export function removeMsdkNativeCallbackListener(callback: Function) {
  const env = initEnv();
  if (env.isMsdk && !env.isMsdkV5) {
    if (typeof window.msdkRemoveNativeCallbackObserver === 'function') {
      window.msdkRemoveNativeCallbackObserver(callback);
    }
  }
}

/**
 * MSDK 浏览器中，关闭 webView
 * @example
 * ```ts
 * closeMsdkWebview()
 * ```
 */
export function closeMsdkWebview(env?: any) {
  if (!env) {
    env = initEnv();
  }
  console.info('[closeMsdkWebview] env', env);

  // ua需要先判断MSDK V5版本
  if (env.isMsdkV5 && typeof window.msdkCall === 'function') {
    const closeWebView = '{"MsdkMethod":"closeWebView"}';
    window.msdkCall(closeWebView);
  } else if (env.isMsdk) {
    if (typeof window.msdkCloseWebview === 'function') {
      if (!env.isIOS || (env.isIOS && window.msdkiOSHandler)) {
        window.msdkCloseWebview();
      }
    } else if (typeof window.msdkCallNative === 'function') {
      window.msdkCallNative('{"MsdkMethod":"CloseWebview"}');
    }
  } else if (env.isSlugSdk && window.customBrowserInterface) {
    window.customBrowserInterface.closeWebview();
  }
}


/**
 * 关闭 webView，包含 msdk 浏览器和其他浏览器
 * @example
 * ```ts
 * closeWebView()
 * ```
 */
export function closeWebView() {
  console.log('[closeWebView] call close webview');
  const env = initEnv();
  if (env.isMsdk) {
    closeMsdkWebview();
  } else if (env.isSlugSdk) {
    if (window.customBrowserInterface) {
      window.customBrowserInterface.closeWebview();
    }
  } else {
    window.location.href = 'about:blank';
    console.log('[closeWebView] call close webview failed');
  }
}

/**
 * 添加游戏内浏览器jssdk
 * @example
 * ```ts
 * callJsBrowserAdapter();
 * ```
 */
export function callJsBrowserAdapter() {
  return new Promise((resolve) => {
    const env = initEnv();
    if (env.isMsdkV5) {
      loader('https://image-1251917893.file.myqcloud.com/igame/common/js/msdkJsAdapterV5.js', () => {
        resolve(true);
      });
    } else if (env.isMsdk) {
      if (env.isMsdkX) {
        loader('https://image-1251917893.file.myqcloud.com/igame/common/js/msdkJsAdapterV3_embedded.js', () => {
          resolve(true);
        });
      } else {
        loader('https://image-1251917893.file.myqcloud.com/igame/common/js/msdkJsAdapterV3.js', () => {
          resolve(true);
        });
      }
    } else if (env.isSlugSdk) {
      loader('https://image-1251917893.file.myqcloud.com/igame/common/js/browser_adapt_20240702.js', () => {
        resolve(true);
      });
    }
  });
}

/**
 * 设置 MSDK 浏览器退出全屏，需提前加载 sdk
 * @example
 * ```ts
 * callJsReSetFullScreen();
 * ```
 */
export const callJsReSetFullScreen = function () {
  callJsSetFullScreen(false);
};

/**
 * 设置 MSDK 浏览器全屏，需提前加载 sdk
 * @param isFullScreen 是否全屏
 * @example
 * ```ts
 * callJsSetFullScreen();
 * callJsSetFullScreen(false);
 * ```
 */
export const callJsSetFullScreen = function (isFullScreen = true) {
  const { isSlugSdk, isMsdkV5, isMsdk, isMsdkX, isAndroid } = getEnvUAType();

  if (isSlugSdk) {
    if (typeof window.customBrowserInterface === 'object') {
      const method = isFullScreen ? 'hideUi' : 'showUi';
      window.customBrowserInterface[method]();
    }
  } else if (isMsdkV5) {
    const setFullScreenStr = JSON.stringify({
      MsdkMethod: 'setFullScreen',
      isFullScreen: !!isFullScreen,
    });
    // 延时设置全屏
    setTimeout(() => {
      if (isAndroid) {
        window.msdkCall?.(setFullScreenStr);
      } else {
        if (window.WebViewJavascriptBridge) {
          window.msdkCall?.(setFullScreenStr);
        } else {
          document.addEventListener('WebViewJavascriptBridgeReady', () => {
            window.msdkCall?.(setFullScreenStr);
          }, false);
        }
      }
    }, 100);
  } else if (isMsdk && !isMsdkX) {
    const setFullScreenStr = JSON.stringify({
      MsdkMethod: 'WGSetFullScreen',
      isFullScreen: !!isFullScreen,
    });

    if (isAndroid) {
      window.msdkCall?.('WGSetFullScreen', setFullScreenStr);
    } else {
      if (window.WebViewJavascriptBridge) {
        window.msdkCall?.('WGSetFullScreen', setFullScreenStr);
      } else {
        document.addEventListener('WebViewJavascriptBridgeReady', () => {
          window.msdkCall?.('WGSetFullScreen', setFullScreenStr);
        }, false);
      }
    }
  }
};
