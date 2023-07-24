import { getEnvUAType } from '../env/env';
import { urlToBase64 } from '../dom-to-image/dom-to-image';
import {
  ShareConfig,
  SHARE_TYPE_MAP,
} from './config';
import { initCommShareUI, showCommShareUI, calBase64Size } from './helper';

import type { IGetMiniProgramOpenLink } from './types';


function openWeixinOpenLink({
  shareObject,
  failedCallback,
  getMiniProgramOpenLink,
  appId,
}: {
  shareObject: Record<string, any>;
  failedCallback: Function;
  getMiniProgramOpenLink: IGetMiniProgramOpenLink;
  appId: string
}) {
  const data = shareObject.path.split('?');
  getMiniProgramOpenLink({
    adcfg: {},
    appid: appId,
    path: data.length > 0 ? data[0] : '',
    param_data: data.length > 1 ? data[1] : '',
    jump_type: 4,
  })
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
  appId,
  shareObject,
}: {
  getMiniProgramOpenLink?: IGetMiniProgramOpenLink,
  appId: string,
  shareObject: Record<string, any>,
}) {
  initCommShareUI('msdkShareDelegate');

  ShareConfig.setShareUI({
    openShareUI() {
      showCommShareUI();
    },
  });

  /*
    type：1(微信),2(朋友圈),3(QQ),4(QQ 空间)
  */
  // @ts-ignore
  window.msdkShareDelegate = async function (shareType: number) {
    shareObject.callback?.();
    const type = shareType || 0;
    // msdk分享图片需要转Base64 https://wiki.ssl.msdk.qq.com/Android/webview.html#Android_JSInterface
    const imgData = await urlToBase64(shareObject.icon);
    let typeArr;
    const env = getEnvUAType();
    const imageDataSize = +calBase64Size(imgData);
    console.log('msdkShareDelegate imageDataSize : ', imageDataSize);
    const title = shareObject.title.replace(/\n|\r|"|\\/g, '');
    const desc = shareObject.desc.replace(/\n|\r|"|\\/g, '');
    // msdk分享图片，android图片大小不能超过10k
    if (
      (env.isIos && imageDataSize < 500)
      || (env.isAndroid && imageDataSize < 9)
    ) {
      typeArr = {
        [SHARE_TYPE_MAP.WX_FRIENDS]: `{"MsdkMethod":"WGSendToWeiXinWithUrl","scene":"0","title":"${title}","desc":"${desc}","imgData":"${imgData}","url":"${shareObject.link}","mediaTagName":"MSG_INVITE","messageExt":"${title}"}`,
        [SHARE_TYPE_MAP.WX_TIMELINE]: `{"MsdkMethod":"WGSendToWeiXinWithUrl","scene":"1","title":"${title}","desc":"${desc}","imgData":"${imgData}","url":"${shareObject.link}","mediaTagName":"MSG_INVITE","messageExt":"${title}"}`,
        [SHARE_TYPE_MAP.QQ_FRIENDS]: `{"MsdkMethod":"WGSendToQQ","scene":"2","title":"${title}","desc":"${desc}","imgData":"${imgData}","url":"${shareObject.link}"}`,
        [SHARE_TYPE_MAP.QQ_ZONE]: `{"MsdkMethod":"WGSendToQQ","scene":"1","title":"${shareObject.title}","desc":"${desc}","imgData":"${imgData}","url":"${shareObject.link}"}`,
      };
    } else {
      typeArr = {
        [SHARE_TYPE_MAP.WX_FRIENDS]: `{"MsdkMethod":"WGSendToWeiXinWithUrl","scene":"0","title":"${title}","desc":"${desc}","url":"${shareObject.link}","mediaTagName":"MSG_INVITE","messageExt":"${title}"}`,
        [SHARE_TYPE_MAP.WX_TIMELINE]: `{"MsdkMethod":"WGSendToWeiXinWithUrl","scene":"1","title":"${title}","desc":"${desc}","url":"${shareObject.link}","mediaTagName":"MSG_INVITE","messageExt":"${title}"}`,
        [SHARE_TYPE_MAP.QQ_FRIENDS]: `{"MsdkMethod":"WGSendToQQ","scene":"2","title":"${title}","desc":"${desc}","url":"${shareObject.link}"}`,
        [SHARE_TYPE_MAP.QQ_ZONE]: `{"MsdkMethod":"WGSendToQQ","scene":"1","title":"${title}","desc":"${desc}","url":"${shareObject.link}"}`,
      };
    }

    if (typeof typeArr[type] === 'undefined') {
      return false;
    }

    const param = typeArr[type];

    if (type === SHARE_TYPE_MAP.WX_FRIENDS && shareObject.path && getMiniProgramOpenLink) {
      openWeixinOpenLink({
        shareObject,
        failedCallback: () => {
          try {
          // @ts-ignore
            msdkShare(param);
          } catch (e) {
            console.log('e', e);
            throw e;
          }
        },
        getMiniProgramOpenLink,
        appId,
      });
    } else {
      try {
        // @ts-ignore
        msdkShare(param);
      } catch (e) {
        console.log('e', e);
        throw e;
      }
    }
  };
}


export function initInGameShare({
  shareObject,
  appId,
  getMiniProgramOpenLink,
}: {
  shareObject: Record<string, any>;
  appId: string;
  getMiniProgramOpenLink?: IGetMiniProgramOpenLink;
}) {
  initCommShareUI('slugSDKShareDelegate');

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
    if (typeof window.customBrowserInterface === 'object') {
      switch (type) {
        case SHARE_TYPE_MAP.WX_FRIENDS:
          if (shareObject?.path && getMiniProgramOpenLink) {
            openWeixinOpenLink({
              shareObject,
              failedCallback: () => {
                window.customBrowserInterface?.sendToWeixinWithUrl(
                  2,
                  shareObject.title,
                  shareObject.desc,
                  shareObject.link,
                  shareObject.icon,
                );
              },
              getMiniProgramOpenLink,
              appId,
            });
          } else {
            window.customBrowserInterface?.sendToWeixinWithUrl(
              2,
              shareObject.title,
              shareObject.desc,
              shareObject.link,
              shareObject.icon,
            );
          }
          break;
        case SHARE_TYPE_MAP.WX_TIMELINE:
          window.customBrowserInterface?.sendToWeixinWithUrl(
            1,
            shareObject.title,
            shareObject.desc,
            shareObject.link,
            shareObject.icon,
          );
          break;
        case SHARE_TYPE_MAP.QQ_FRIENDS:
          window.customBrowserInterface?.sendToQQ(
            2,
            shareObject.title,
            shareObject.desc,
            shareObject.link,
            shareObject.icon,
          );
          break;
        case SHARE_TYPE_MAP.QQ_ZONE:
          window.customBrowserInterface?.sendToQQ(
            1,
            shareObject.title,
            shareObject.desc,
            shareObject.link,
            shareObject.icon,
          );
          break;
      }
    } else {
      console.log('未引用sdk');
    }
  };
}

