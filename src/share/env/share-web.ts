import { initEnv } from '../../env/env';
import { removeUrlParams } from '../../url/remove-param';
import { initCustomDialog, showCustomDialog } from '../../dialog/custom-dialog';

import { initMsdkShare, initInGameShare } from './share-in-game';
import {
  initQQShare,
  initWeixinShare,
  initMiniProgramShare,
  hideQQShareBtn,
  hideWeixinShareBtn,
} from './share-im';
import { initGHelperShare, initPvpShare, initTipShare, hidePvpShareBtn } from './share-app';
import { showCommShareTip } from '../helper';
import { DEFAULT_SHARE_ICON, ShareConfig, DEFAULT_SHOW_TYPE_IN_GAME } from '../config';

import type { IShareObject } from '../types';


export function initShare(params: IShareObject = {
  getWxSignaturePromise: () => Promise.resolve({}),
  getMiniProgramOpenLink: () => Promise.resolve({}),
}) {
  const obj = params;
  obj.title = obj.title || document.getElementsByTagName('title')?.[0]?.innerText;
  obj.desc = obj.desc || obj.title;
  obj.icon = obj.icon || DEFAULT_SHARE_ICON;
  obj.type = obj.type || null;
  obj.path = obj.path || null;
  obj.forceHistoryMode = obj.forceHistoryMode || null;
  if (!obj.showTypeInGame?.length) {
    obj.showTypeInGame = DEFAULT_SHOW_TYPE_IN_GAME as any;
  }

  // 分享链接：移除 reporttk 参数
  const link = obj.link || window.location.href;
  obj.link = removeUrlParams(link, ['reporttk']);
  obj.wzydShareText = obj.wzydShareText || '点击“...”分享链接';

  ShareConfig.setShareObject(obj);

  const {
    getWxSignaturePromise = () => Promise.resolve({}),
    getMiniProgramOpenLink = () => Promise.resolve({}),
  } = obj;

  const { shareObject } = ShareConfig;

  // 提到函数中，方便测试
  const env = initEnv();
  const callbackList = [
    {
      condition: env.isMsdk,
      callback() {
        initMsdkShare({
          getMiniProgramOpenLink,
          shareObject,
        });
      },
    },
    {
      condition: env.isGHelper,
      callback() {
        initGHelperShare({
          shareObject,
        });
      },
    },
    {
      condition: env.isQQ,
      callback() {
        initQQShare({
          shareObject,
        });
      },
    },
    {
      condition: env.isMiniProgram,
      callback() {
        initMiniProgramShare({
          shareObject,
        });
      },
    },
    {
      condition: env.isWeixin,
      callback() {
        initWeixinShare({
          shareObject,
          getWxSignaturePromise,
        });
      },
    },
    {
      condition: env.isPvpApp,
      callback() {
        initPvpShare({ shareObject });
      },
    },
    {
      condition: env.isTipApp,
      callback() {
        initTipShare({ shareObject });
      },
    },
    {
      condition: env.isSlugSdk,
      callback() {
        initInGameShare({
          shareObject,
          getMiniProgramOpenLink,
        });
      },
    },
  ];

  for (const item of callbackList) {
    if (item.condition) {
      item.callback();
      break;
    }
  }

  // if (env.isMsdk) {
  //   initMsdkShare({
  //     getMiniProgramOpenLink,
  //     appId,
  //     shareObject,
  //   });
  // } else if (env.isGHelper) {
  //   initGHelperShare({
  //     shareObject,
  //   });
  // } else if (env.isQQ) {
  //   initQQShare({
  //     shareObject,
  //   });
  // } else if (env.isMiniProgram) {
  //   initMiniProgramShare({
  //     shareObject,
  //   });
  // } else if (env.isWeixin) {
  //   initWeixinShare({
  //     shareObject,
  //     getWxSignaturePromise,
  //   });
  // } else if (env.isSlugSdk) {
  //   initInGameShare({
  //     shareObject,
  //     getMiniProgramOpenLink,
  //     appId,
  //   });
  // }
}

function showWindowNavigatorShareDialog() {
  const { shareObject } = ShareConfig;

  if (typeof window?.navigator?.share === 'function') {
    window.navigator.share({
      url: shareObject.link,
      text: shareObject.title,
      title: shareObject.title,
    })
      .then(() => {
        console.log('NavigatorShare success');
      })
      .catch(() => {
        console.log('NavigatorShare fail');
      });
  } else {
    initCustomDialog({
      title: '温馨提示',
      content: '请复制链接到微信或手机QQ内打开参与活动',
      confirmText: '我知道了',
    });
    showCustomDialog();
  }
}

/**
 * 打开自定义的分享UI组件
 */
export function openShareUI() {
  const { shareUiObj } = ShareConfig;

  const env = initEnv();
  if (env.isInGame || env.isGHelper) {
    shareUiObj?.openShareUI?.();
  } else if (env.isQQ || env.isWeixin) {
    showCommShareTip();
  } else {
    showWindowNavigatorShareDialog();
  }
}


export function hideShareBtn() {
  const env = initEnv();

  if (env.isQQ) { // 手Q
    hideQQShareBtn();
  } else if (env.isMiniProgram) { // 微信小程序 webview 环境
    // 由于是内嵌形式，不支持实时与小程序通信，不能动态关闭小程序的转发功能
  } else if (env.isWeixin) { // 微信 webview 环境
    hideWeixinShareBtn();
  } else if (env.isPvpApp) { // 王者人生 App
    hidePvpShareBtn();
  }
}
