import { initEnv } from '../env/env';

import { callJsBrowserAdapter } from './msdk';

export function launchMiniProgramInSlugSdk(appId: string, path: string) {
  if (typeof window.customBrowserInterface === 'undefined') {
    callJsBrowserAdapter().then(() => {
      window.customBrowserInterface?.openMiniProgram(appId, path);
    });
  } else {
    window.customBrowserInterface.openMiniProgram(appId, path);
  }
}

export function launchMiniProgramInGame({
  appId = '',
  path = '',
  type = 0,
  isWxMp = true,
}) {
  const env = initEnv();
  if (env.isSlugSdk) {
    return launchMiniProgramInSlugSdk(appId, path);
  }

  let param = {};
  if (isWxMp) {
    param = {
      MsdkMethod: 'WGLaunchMiniApp',
      userName: appId,
      path,
      type,
    };
  } else {
    param = {
      MsdkMethod: 'WGLaunchQQMiniApp',
      miniProgramAppid: appId,
      miniProgramPath: path,
      type,
    };
  }


  const paramStr = JSON.stringify(param);

  if (typeof window.msdkShare === 'undefined') {
    callJsBrowserAdapter().then(() => {
      window.msdkShare(paramStr);
    });
  } else {
    window.msdkShare(paramStr);
  }
}
