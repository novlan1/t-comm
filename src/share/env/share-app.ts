import { ShareConfig } from '../config';

import type { IShareObject } from '../types';


export function initTipShare({
  shareObject,
}: {
  shareObject: IShareObject;
}) {
  const invoke = shareObject.tipInvoke;
  if (!invoke) return;

  const appShareParams = {
    type: '1',
    share_url: shareObject.link,
    image_url: shareObject.icon,
    title: shareObject.title,
    desc: shareObject.desc,
  };
  window.shareCallBack = function () {
    // '{"ret":0,"source_type":2}'
    shareObject.callback?.();
  };
  window.setTitleButtonsCallback = function () {
    invoke('openShare', appShareParams, 'shareCallBack');
  };
  const params = {
    title: document.getElementsByTagName('title')?.[0]?.innerText,
    button: '分享',
  };
  invoke('setTitleButtons', params, 'setTitleButtonsCallback');
}


export function initPvpShare({
  shareObject,
}: {
  shareObject: IShareObject;
}) {
  const invoke = shareObject.pvpInvoke;
  if (!invoke) return;

  const appShareParams = {
    type: '1',
    share_url: shareObject.link,
    image_url: shareObject.icon,
    title: shareObject.title,
    desc: shareObject.desc,
    miniprogram_url: shareObject.miniprogram_link,
  };
  window.shareCallBack = function () {
    // '{"ret":0,"source_type":2}'
    shareObject.callback?.();
  };
  window.setTitleButtonsCallback = function () {
    invoke('openShare', appShareParams, 'shareCallBack');
  };
  const params = {
    title: document.getElementsByTagName('title')?.[0]?.innerText,
    button: '分享',
  };
  invoke('setTitleButtons', params, 'setTitleButtonsCallback');
}


export function initGHelperShare({
  shareObject,
}: {
  shareObject: Record<string, any>
}) {
  if (typeof GameHelper === 'undefined') {
    if (document.addEventListener) {
      document.addEventListener('GameHelperReady', onGameHelperReady, false);
    } else {
      onGameHelperReady();
    }
  } else {
    onGameHelperReady();
  }

  function onGameHelperReady() {
    ShareConfig.setShareUI({
      openShareUI() {
        try {
          GameHelper?.shareWebPage(
            shareObject.title,
            shareObject.desc,
            shareObject.icon,
            shareObject.link,
            shareObject.type,
          );
        } catch (e) {
          console.log(e);
        }
      },
    });
  }
}

export function hidePvpShareBtn() {
  const params = { type: 0, title: '', button: '' };
  const invoke = ShareConfig.shareObject.pvpInvoke;
  invoke?.('setTitleButtons', params); // 设置顶部右侧
}
