import { urlToBase64 } from '../../dom-to-image/dom-to-image';
import { initEnv } from '../../env/env';
import { callJsBrowserAdapter } from '../../msdk/msdk';

import {
  DEFAULT_SHOW_TYPE_IN_GAME,
  SHARE_TYPE_MAP,
  ShareConfig,
} from '../config';
import { calBase64Size, initCommShareUI, showCommShareUI } from '../helper';

import { msdkShareV5 } from './share-msdk-v5';

import type { IGetMiniProgramOpenLink } from '../types';

function shareInMSDK(param: any) {
  if (typeof window.msdkShare === 'undefined') {
    callJsBrowserAdapter().then(() => {
      window.msdkShare(param);
    });
  } else {
    window.msdkShare(param);
  }
}

function shareInSlugSDK({
  funcName,
  scene,
  title,
  desc,
  url,
  imgUrl,
}: {
  funcName: string;
  scene?: number | string;
  title?: string;
  desc?: string;
  url?: string
  imgUrl?: string;
}) {
  if (typeof window.msdkShare === 'undefined') {
    callJsBrowserAdapter().then(() => {
      window.customBrowserInterface?.[funcName]?.(
        scene,
        title,
        desc,
        url,
        imgUrl,
      );
    });
  } else {
    window.customBrowserInterface?.[funcName]?.(
      scene,
      title,
      desc,
      url,
      imgUrl,
    );
  }
}

function openWeixinOpenLink({
  failedCallback,
  getMiniProgramOpenLink,
}: {
  failedCallback: Function;
  getMiniProgramOpenLink?: IGetMiniProgramOpenLink;
}) {
  if (typeof getMiniProgramOpenLink === 'undefined') {
    failedCallback?.();
    return;
  }
  getMiniProgramOpenLink()
    .then((response) => {
      if (response?.open_link) {
        window.location.href = response.open_link;
      } else {
        failedCallback?.();
      }
    })
    .catch(() => {
      failedCallback?.();
    });
}


export function initMsdkShare({
  getMiniProgramOpenLink,
  shareObject,
}: {
  getMiniProgramOpenLink?: IGetMiniProgramOpenLink,
  shareObject: Record<string, any>,
}) {
  const { showTypeInGame = DEFAULT_SHOW_TYPE_IN_GAME } = shareObject;
  initCommShareUI('msdkShareDelegate', showTypeInGame);

  ShareConfig.setShareUI({
    openShareUI() {
      showCommShareUI();
    },
  });
  const env = initEnv();

  if (env.isMsdkV5) {
    window.msdkShareDelegate = (type: any) => {
      if (type === 1) {
        openWeixinOpenLink({
          failedCallback: () => {
            msdkShareV5(type, shareObject);
          },
          getMiniProgramOpenLink,
        });
        return;
      }
      try {
        msdkShareV5(type, shareObject);
      } catch (err) {
        console.log('err', err);
      }
    };
    return;
  }
  const useImgUrl = true;
  /*
    type：1(微信),2(朋友圈),3(QQ),4(QQ 空间)
  */
  window.msdkShareDelegate = async function (shareType: number) {
    shareObject.callback?.();
    const type = shareType || 0;
    // msdk分享图片需要转Base64 https://wiki.ssl.msdk.qq.com/Android/webview.html#Android_JSInterface
    const imgData = await urlToBase64(shareObject.icon);

    const imageDataSize = +calBase64Size(imgData);
    console.log('msdkShareDelegate imageDataSize : ', imageDataSize);
    const title = shareObject.title.replace(/\n|\r|"|\\/g, '');
    const desc = shareObject.desc.replace(/\n|\r|"|\\/g, '');
    const typeMap: any = {
      [SHARE_TYPE_MAP.WX_FRIENDS]: {
        MsdkMethod: 'WGSendToWeiXinWithUrl',
        scene: '0',
        title,
        desc,
        url: shareObject.link,
        mediaTagName: 'MSG_INVITE',
        messageExt: 'title',
      },
      // `{"MsdkMethod":"WGSendToWeiXinWithUrl","scene":"0","title":"${title}","desc":"${desc}",
      // "imgData":"${imgData}","url":"${shareObject.link}","mediaTagName":"MSG_INVITE","messageExt":"${title}"}`,
      [SHARE_TYPE_MAP.WX_TIMELINE]: {
        MsdkMethod: 'WGSendToWeiXinWithUrl',
        scene: '1',
        title,
        desc,
        url: shareObject.link,
        mediaTagName: 'MSG_INVITE',
        messageExt: 'title',
      },
      // `{"MsdkMethod":"WGSendToWeiXinWithUrl","scene":"1","title":"${title}","desc":"${desc}",
      // "imgData":"${imgData}","url":"${shareObject.link}","mediaTagName":"MSG_INVITE","messageExt":"${title}"}`,
      [SHARE_TYPE_MAP.QQ_FRIENDS]: {
        MsdkMethod: 'WGSendToQQ',
        scene: '2',
        title,
        desc,
        url: shareObject.link,
      },
      // `{"MsdkMethod":"WGSendToQQ","scene":"2","title":"${title}","desc":"${desc}",
      // "imgData":"${imgData}","url":"${shareObject.link}"}`,
      [SHARE_TYPE_MAP.QQ_ZONE]: {
        MsdkMethod: 'WGSendToQQ',
        scene: '1',
        title,
        desc,
        url: shareObject.link,
      },
      // `{"MsdkMethod":"WGSendToQQ","scene":"1","title":"${shareObject.title}","desc":"${desc}",
      // "imgData":"${imgData}","url":"${shareObject.link}"}`,
    };

    if (useImgUrl) {
      Object.keys(typeMap).forEach((key) => {
        const value = typeMap[key];
        typeMap[key] = JSON.stringify({
          ...value,
          imgUrl: shareObject.icon,
        });
      });
    // msdk分享图片，android图片大小不能超过10k
    } else if (
      (env.isIos && imageDataSize < 500)
      || (env.isAndroid && imageDataSize < 9)
    ) {
      Object.keys(typeMap).forEach((key) => {
        const value = typeMap[key];
        typeMap[key] = JSON.stringify({
          ...value,
          imgData,
        });
      });
    } else {
      Object.keys(typeMap).forEach((key) => {
        const value = typeMap[key];
        typeMap[key] = JSON.stringify({
          ...value,
        });
      });
    }

    if (typeof typeMap[type] === 'undefined') {
      return false;
    }

    const param = typeMap[type];

    if (type === SHARE_TYPE_MAP.WX_FRIENDS &&  getMiniProgramOpenLink) {
      openWeixinOpenLink({
        failedCallback: () => {
          shareInMSDK(param);
        },
        getMiniProgramOpenLink,
      });
    } else {
      try {
        shareInMSDK(param);
      } catch (e) {
        console.log('e', e);
        throw e;
      }
    }
  };
}


export function initInGameShare({
  shareObject,
  getMiniProgramOpenLink,
}: {
  shareObject: Record<string, any>;
  getMiniProgramOpenLink?: IGetMiniProgramOpenLink;
}) {
  const { showTypeInGame = DEFAULT_SHOW_TYPE_IN_GAME } = shareObject;
  initCommShareUI('slugSDKShareDelegate', showTypeInGame);

  ShareConfig.setShareUI({
    openShareUI() {
      showCommShareUI();
    },
  });


  /**
   * type：1(微信),2(朋友圈),3(QQ),4(QQ 空间)
   */
  // @ts-ignore
  window.slugSDKShareDelegate = function (type: number) {
    shareObject.callback?.();
    switch (type) {
      case SHARE_TYPE_MAP.WX_FRIENDS:
        if (getMiniProgramOpenLink) {
          openWeixinOpenLink({
            failedCallback: () => {
              shareInSlugSDK({
                funcName: 'sendToWeixinWithUrl',
                scene: 2,
                title: shareObject.title,
                desc: shareObject.desc,
                url: shareObject.link,
                imgUrl: shareObject.icon,
              });
            },
            getMiniProgramOpenLink,
          });
        } else {
          shareInSlugSDK({
            funcName: 'sendToWeixinWithUrl',
            scene: 2,
            title: shareObject.title,
            desc: shareObject.desc,
            url: shareObject.link,
            imgUrl: shareObject.icon,
          });
        }
        break;
      case SHARE_TYPE_MAP.WX_TIMELINE:
        shareInSlugSDK({
          funcName: 'sendToWeixinWithUrl',
          scene: 1,
          title: shareObject.title,
          desc: shareObject.desc,
          url: shareObject.link,
          imgUrl: shareObject.icon,
        });
        break;
      case SHARE_TYPE_MAP.QQ_FRIENDS:
        shareInSlugSDK({
          funcName: 'sendToQQ',
          scene: 2,
          title: shareObject.title,
          desc: shareObject.desc,
          url: shareObject.link,
          imgUrl: shareObject.icon,
        });
        break;
      case SHARE_TYPE_MAP.QQ_ZONE:
        shareInSlugSDK({
          funcName: 'sendToQQ',
          scene: 1,
          title: shareObject.title,
          desc: shareObject.desc,
          url: shareObject.link,
          imgUrl: shareObject.icon,
        });
        break;
    }
  };
}

