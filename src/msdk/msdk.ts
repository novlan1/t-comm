import { initEnv } from '../env/env';

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

export function closeMsdkWebview() {
  const env = initEnv();

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
  }
}

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

