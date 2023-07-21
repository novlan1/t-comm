import { getEnvUAType } from '../env/env';
import { removeUrlParams } from '../url/remove-param';
import {
  initQQShare,
  initWeixinShare,
  initMiniProgramShare,
  initMsdkShare,
  initGHelperShare,
  initInGameShare,
} from './share-diff-env';
import { DEFAULT_SHARE_ICON, ShareConfig } from './config';
import { initCustomDialog } from '../dialog/custom-dialog';
import type { IShareObject } from './types';


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

  // 分享链接：移除 reporttk 参数
  const link = obj.link || window.location.href;
  obj.link = removeUrlParams(link, ['reporttk']);
  obj.wzydShareText = obj.wzydShareText || '点击“...”分享链接';

  ShareConfig.setShareObject(obj);

  const {
    getWxSignaturePromise = () => Promise.resolve({}),
    getMiniProgramOpenLink = () => Promise.resolve({}),
  } = obj;
  const appId = obj.appId || '';

  const { shareObject } = ShareConfig;

  // 提到函数中，方便测试
  const env = getEnvUAType();
  if (env.isMsdk) {
    initMsdkShare({
      getMiniProgramOpenLink,
      appId,
      shareObject,
    });
  } else if (env.isGHelper) {
    initGHelperShare({
      shareObject,
    });
  } else if (env.isQQ) {
    initQQShare({
      shareObject,
    });
  } else if (env.isMiniProgram) {
    initMiniProgramShare({
      shareObject,
    });
  } else if (env.isWeixin) {
    initWeixinShare({
      shareObject,
      getWxSignaturePromise,
    });
  } else if (env.isSlugSdk) {
    initInGameShare({
      shareObject,
      getMiniProgramOpenLink,
      appId,
    });
  }
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
  }
}

/**
 * 打开自定义的分享UI组件
 */
export function openShareUI() {
  const { shareUiObj } = ShareConfig;

  const env = getEnvUAType();
  if (env.isInGame || env.isGHelper) {
    shareUiObj?.openShareUI?.();
  } else if (env.isQQ || env.isWeixin) {
    shareUiObj?.showCommShareTip?.();
  } else {
    showWindowNavigatorShareDialog();
  }
}
