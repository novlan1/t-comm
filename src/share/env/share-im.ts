import { loadJS } from '../../loader/loader';
import { WX_JS_SDK } from '../../wx/config';
import { configWx } from '../../wx/wx-config';

import {
  DEFAULT_API_LIST,
  DEFAULT_OPEN_TAG_LIST,
  QQ_JS_SDK,
  ShareConfig,
} from '../config';
import { initCommShareTip } from '../helper';

import type { IGetWxSignaturePromise } from '../../wx/types';


export function initQQShare({
  shareObject,
}: {
  shareObject: Record<string, any>;
}) {
  initCommShareTip();

  // https://open.mobile.qq.com/api/common/index
  loadJS(QQ_JS_SDK).then(() => {
    window?.mqq?.ui?.setOnShareHandler((type: number) => {
      if ([0, 1, 2, 3, 11].indexOf(+type) > -1) {
        const param = {
          title: shareObject.title,
          desc: shareObject.desc,
          share_type: type,
          share_url: shareObject.link,
          image_url: shareObject.icon,
          back: true,
          uinType: 0,
        };
        const callback = function () {
          shareObject?.callback?.(); // alert(result.retCode);
        };
        window?.mqq?.ui?.shareMessage(param, callback);
      }
    });
  });
}

export function hideQQShareBtn() {
  loadJS('QQ_JS_SDK').then(() => {
    window?.mqq?.ui?.setWebViewBehavior?.({
      actionButton: 0, // 隐藏 webview右上角按钮
    });
  });
}

export function initWeixinShare({
  shareObject,
  getWxSignaturePromise,
  apiList = DEFAULT_API_LIST,
  openTagList = DEFAULT_OPEN_TAG_LIST,
}: {
  shareObject: Record<string, any>;
  getWxSignaturePromise: IGetWxSignaturePromise;
  apiList?: Array<string>;
  openTagList?: Array<string>;
}) {
  initCommShareTip();


  configWx({
    apiList,
    openTagList,
    getWxSignaturePromise,
  })
    .then(() => {
      const { wx } = window;

      // 处理分享参数
      const tmp = {
        title: shareObject.title,
        desc: shareObject.desc,
        link: shareObject.link,
        imgUrl: shareObject.icon,
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success(info: any) {
          shareObject.callback?.();
          console.warn('success', info);
        },
        cancel() {
        },
        fail(info: any) {
          console.warn('fail', info);
        },
      };
      if (tmp.link.indexOf('?') === -1) {
        tmp.link = `${tmp.link}?sharect=${new Date().getTime()}`;
      } else if (tmp.link.indexOf('sharect') === -1) {
        tmp.link = `${tmp.link}&sharect=${new Date().getTime()}`;
      }

      wx?.onMenuShareTimeline?.(tmp);
      wx?.onMenuShareAppMessage?.(tmp);
      wx?.onMenuShareQQ?.(tmp);
      wx?.onMenuShareQZone?.(tmp);
      // 请注意，原有的 wx.onMenuShareTimeline、wx.onMenuShareAppMessage、wx.onMenuShareQQ、wx.onMenuShareQZone 接口，
      // 即将废弃。请尽快迁移使用客户端6.7.2及JSSDK 1.4.0以上版本支持的 wx.updateAppMessageShareData、wx.updateTimelineShareData接口。
      // 2019.11.14 npm weixin-sdk-js还未更新到1.4.0，更新后需要改下
      // wx.updateAppMessageShareData(tmp)
      // wx.updateTimelineShareData(tmp)
      // 文档地址 https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html

      wx?.ready(() => {
        wx?.updateAppMessageShareData?.(tmp);
        console.warn(tmp);
        wx?.updateTimelineShareData?.(tmp);
      });
    })
    .catch((error) => {
      console.log('initWeixinShare error : ', error);
    });
}

export function hideWeixinShareBtn() {
  const { getWxSignaturePromise } = ShareConfig.shareObject;
  if (!getWxSignaturePromise) return;

  configWx({
    apiList: ['checkJsApi', 'hideMenuItems'],
    getWxSignaturePromise,
  })
    .then(() => {
      const { wx } = window;
      wx?.ready?.(() => {
        wx.hideMenuItems({
          menuList: [
            'menuItem:share:qq', // 隐藏分享QQ好友、
            'menuItem:share:QZone', // 隐藏分享QQ空间、
            'menuItem:share:appMessage', // 隐藏分享微信好友、
            'menuItem:share:timeline', // 隐藏分享微信朋友圈
            'menuItem:share:wework', // 隐藏分享企业微信
          ],
        });
      });
    })
    .catch((error) => {
      console.log('[hideShareBtn] error : ', error);
    });
}

/**
 * 设置小程序分享
 * @description 设置小程序分享信息，用户需要手动点击右上角转发功能进行分享
 */
export function initMiniProgramShare({
  shareObject,
}: {
  shareObject: Record<string, any>;
}) {
  initCommShareTip();
  // 设置小程序分享图片和文案
  loadJS(WX_JS_SDK).then(() => {
    window.wx.miniProgram.postMessage({
      data: {
        cmd: 'share',
        shareParams: shareObject,
      },
    });
  });
}

