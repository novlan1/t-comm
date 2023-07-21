import { loadJS } from '../loader/loader';
import { getEnvUAType } from '../env/env';
import { urlToBase64 } from '../dom-to-image/dom-to-image';
import {
  DEFAULT_API_LIST,
  DEFAULT_OPEN_TAG_LIST,
  WX_JS_SDK, QQ_JS_SDK,
  ShareConfig,
} from './config';
import { initCustomDom } from '../dialog/custom-dialog';

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


/**
 * 请求微信鉴权接口
 * @param {*} apiList api列表
 * @param {*} openTagList openTag列表
 * @returns {Promise} 微信鉴权结果
 */
function getWxCfg({
  apiList,
  openTagList,
  getWxSignaturePromise,
}: {
  apiList: Array<string>;
  openTagList: Array<string>;
  getWxSignaturePromise: () => Promise<any>;
}) {
  return new Promise((resolve, reject) => {
    getWxSignaturePromise()
      .then((data: any = {}) => {
        window?.wx?.config({
          beta: true,
          debug: false,
          appId: data.wxappid,
          timestamp: data.timestamp,
          nonceStr: data.noncestr,
          signature: data.signature,
          jsApiList: apiList,
          openTagList,
        });

        window.wx.ready(() => {
          resolve(window.wx);
        });
        window.wx.error((err: any) => {
          console.warn('wx config error : ', err);
          reject(err);
        });
      })
      .catch((error: any) => {
        reject(error);
        console.log('get_share_cfg error : ', error);
      });
  });
}


function configWx({
  apiList,
  openTagList,
  getWxSignaturePromise,
}: {
  apiList: Array<string>;
  openTagList: Array<string>;
  getWxSignaturePromise: () => Promise<any>;
}) {
  return new Promise((resolve, reject) => {
    loadJS(WX_JS_SDK).then(() => {
      getWxCfg({
        apiList,
        openTagList,
        getWxSignaturePromise,
      })
        .then((wx) => {
          resolve(wx);
        })
        .catch((error) => {
          console.log('configWx error : ', error);
          reject(error);
        });
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
  getWxSignaturePromise: () => Promise<any>;
  apiList?: Array<string>;
  openTagList?: Array<string>;
}) {
  initCommShareTip();

  const { wx } = window;

  configWx({
    apiList,
    openTagList,
    getWxSignaturePromise,
  })
    .then(() => {
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

      wx?.onMenuShareTimeline(tmp);
      wx?.onMenuShareAppMessage(tmp);
      wx?.onMenuShareQQ(tmp);
      wx?.onMenuShareQZone(tmp);
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

export function initCommShareTip() {
  let styleContent = '';
  const {
    isWzydShare,
    wzydShareText = '点击“...”分享链接',
  } = ShareConfig.shareObject;

  if (isWzydShare) {
    styleContent = `
    .tip-toc-sharetips {position: fixed;z-index: 9999;height: 100%;width: 100%;left: 0;top: 0;background: rgba(0,0,0,0.5);}
    .tip-toc-share-arrow{background: url("https://image-1251917893.file.myqcloud.com/Esports/user/img/share-tip-arrow.png") no-repeat right center;background-size: .85rem .55rem;width: 100%;height: .55rem;margin-top: .16rem;}
    .tip-toc-share-box{display: flex;position: fixed;top: .66rem;right: .62rem;}
    .tip-toc-sharetips .share-tip {height: .93rem;width: auto;background: url(https://image-1251917893.file.myqcloud.com/Esports/user/img/share-tip-bg.png) no-repeat;background-size: 100% .93rem;color: #fff;font-size: .28rem;position: relative;margin-left: .89rem;}
    .tip-toc-sharetips .share-tip>span{display: block;max-width: 6rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;word-break: break-all;line-height: .93rem;}
    .tip-toc-sharetips .share-tip::before{content: '';position: absolute;top: 0;left: -.89rem;width: .89rem;height: .93rem;background: url(https://image-1251917893.file.myqcloud.com/Esports/user/img/share-tip-left.png) no-repeat;background-size: 100%;}
    .tip-toc-sharetips .share-tip::after{content: '';position: absolute;top: 0;right: -.61rem;width: .62rem;height: .93rem;background: url(https://image-1251917893.file.myqcloud.com/Esports/user/img/share-tip-right.png) no-repeat;background-size: 100%;}
  `;
  } else {
    styleContent = `
    .tip-toc-sharetips {position: fixed;z-index: 9999;height: 100%;width: 100%;left: 0;top: 0;background: rgba(0,0,0,0.7);}
    .tip-toc-sharetips__arrow {position: absolute;top: .58rem;right: .58rem;width: 1.58rem;height: 1.52rem;background: url(https://image-1251917893.file.myqcloud.com/TIP_GameSystem_2020/toC/icon/share-arrow-2.png) center no-repeat;background-size: 1.58rem 1.52rem;}
    .tip-toc-sharetips__tip {padding: 2.1rem 2.2rem 0.1rem 0.2rem;text-align: right;font-size: .36rem;height: 2rem;color: #fff;}
    `;
  }

  let dialogContent = '';

  if (isWzydShare) {
    dialogContent = `<div class="tip-toc-sharetips"><div class="tip-toc-share-arrow" /><div class="tip-toc-share-box"><div class="share-tip"><span>${wzydShareText}</span></div></div></div>`;
  } else {
    dialogContent = '<div class="tip-toc-sharetips"><div class="tip-toc-sharetips__arrow"></div><p class="tip-toc-sharetips__tip">点此分享</p></div>';
  }

  initCustomDom({
    styleId: 'div_share_tip_style',
    styleContent,
    dialogId: 'div_share_tip',
    dialogContent,
  });


  const btn = document.getElementById('div_share_tip');
  btn?.addEventListener(
    'click',
    () => {
      btn.style.display = 'none';
    },
    false,
  );
}

export function initCommShareUI(callback: String) {
  const styleContent = `
  .share-dialog-login{ padding:30px 20px; position:fixed; left:0; right:0; bottom:0;background:#222222; z-index:2001}\
  .share-choose-login {width:100%;margin:20px auto 0;text-align: center;font-size:0;}\
  .share-choose-login a {display:inline-block;vertical-align:middle;width:25%;}\
  .share-type{ width:45px; height:45px; display:block; margin:0 auto;  }\
  .share-type-1{background:url(//game.gtimg.cn/images/sy/2016/miniweb/ingame/commsrc/shareicon.png) no-repeat;background-size:auto 100%;}\
  .share-type-2{background:url(//game.gtimg.cn/images/sy/2016/miniweb/ingame/commsrc/shareicon.png) -45px 0 no-repeat;background-size:auto 100%;}\
  .share-type-3{background:url(//game.gtimg.cn/images/sy/2016/miniweb/ingame/commsrc/shareicon.png) -90px 0 no-repeat;background-size:auto 100%;}\
  .share-type-4{background:url(//game.gtimg.cn/images/sy/2016/miniweb/ingame/commsrc/shareicon.png) -135px 0 no-repeat;background-size:auto 100%;}\
  .share-public-text {display: block;color: #aaa;font-size:14px;line-height:20px;padding-top:6px;}\
  .share-dialog-close{ width:25px; height:25px; display:block; position:absolute; right:10px; top:10px; background:url(//game.gtimg.cn/images/user/cp/a20170922tipYYB/close-b.png) center center no-repeat; background-size:15px 15px; text-indent:-1000em; overflow:hidden}\
  .share-layer{ width:100%; height:100%; position:fixed; left:0; top:0; z-index:2000; background:rgba(0,0,0,0.5) }
  `;

  const dialogContent = `
  <div class="share-dialog-login">\
    <a href="javascript:;" class="share-dialog-close" onclick="document.getElementById('div_share_ui').style.display='none';">关闭</a>\
    <div class="share-choose-login">\
      <a href="javascript:;" onclick="javascript:${callback}(2);">\
        <span class="share-type share-type-1"></span>\
        <span class="share-public-text">朋友圈</span>\
      </a>\
      <a href="javascript:;" onclick="javascript:${callback}(1);">\
        <span class="share-type share-type-2"></span>\
        <span class="share-public-text">微信好友</span>\
      </a>\
      <a href="javascript:;" onclick="javascript:${callback}(3);">\
        <span class="share-type share-type-3"></span>\
        <span class="share-public-text">QQ好友</span>\
      </a>\
      <a href="javascript:;" onclick="javascript:${callback}(4);">\
        <span class="share-type share-type-4"></span>\
        <span class="share-public-text">QQ空间</span>\
      </a>\
    </div>\
  </div>\
  <div class="share-layer" onclick="document.getElementById('div_share_ui').style.display='none';"></div>
  `;
  initCustomDom({
    styleId: 'div_share_ui_style',
    styleContent,
    dialogId: 'div_share_ui',
    dialogContent,
  });
}


export function showCommShareUI() {
  const dom =  document.getElementById('div_share_tip');
  if (dom) {
    dom.style.display = 'block';
  }
}


export function showCommShareTip() {
  const dom =  document.getElementById('div_share_tip');
  if (dom) {
    dom.style.display = 'block';
  }
}

function calBase64Size(base64url: string) {
  let str = base64url.replace('data:image/png;base64,', '');
  const equalIndex = str.indexOf('=');
  if (str.indexOf('=') > 0) {
    str = str.substring(0, equalIndex);
  }
  const strLength = str.length;
  const fileLength = parseInt(`${strLength - (strLength / 8) * 2}`, 10);
  return (fileLength / 1024).toFixed(2);
}


function openWeixinOpenLink({
  shareObject,
  failedCallback,
  postGetMiniProgramOpenLink,
  appId,
}: {
  shareObject: Record<string, any>;
  failedCallback: Function;
  postGetMiniProgramOpenLink: Function;
  appId: string
}) {
  const data = shareObject.path.split('?');
  postGetMiniProgramOpenLink({
    adcfg: {},
    appid: appId,
    path: data.length > 0 ? data[0] : '',
    param_data: data.length > 1 ? data[1] : '',
    jump_type: 4,
  })
    .then((response: {open_link: string}) => {
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
  postGetMiniProgramOpenLink,
  appId,
  shareObject,
}: {
  postGetMiniProgramOpenLink: Function,
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
        1: `{"MsdkMethod":"WGSendToWeiXinWithUrl","scene":"0","title":"${title}","desc":"${desc}","imgData":"${imgData}","url":"${shareObject.link}","mediaTagName":"MSG_INVITE","messageExt":"${title}"}`,
        2: `{"MsdkMethod":"WGSendToWeiXinWithUrl","scene":"1","title":"${title}","desc":"${desc}","imgData":"${imgData}","url":"${shareObject.link}","mediaTagName":"MSG_INVITE","messageExt":"${title}"}`,
        3: `{"MsdkMethod":"WGSendToQQ","scene":"2","title":"${title}","desc":"${desc}","imgData":"${imgData}","url":"${shareObject.link}"}`,
        4: `{"MsdkMethod":"WGSendToQQ","scene":"1","title":"${shareObject.title}","desc":"${desc}","imgData":"${imgData}","url":"${shareObject.link}"}`,
      };
    } else {
      typeArr = {
        1: `{"MsdkMethod":"WGSendToWeiXinWithUrl","scene":"0","title":"${title}","desc":"${desc}","url":"${shareObject.link}","mediaTagName":"MSG_INVITE","messageExt":"${title}"}`,
        2: `{"MsdkMethod":"WGSendToWeiXinWithUrl","scene":"1","title":"${title}","desc":"${desc}","url":"${shareObject.link}","mediaTagName":"MSG_INVITE","messageExt":"${title}"}`,
        3: `{"MsdkMethod":"WGSendToQQ","scene":"2","title":"${title}","desc":"${desc}","url":"${shareObject.link}"}`,
        4: `{"MsdkMethod":"WGSendToQQ","scene":"1","title":"${title}","desc":"${desc}","url":"${shareObject.link}"}`,
      };
    }

    if (typeof typeArr[type] === 'undefined') {
      return false;
    }

    const param = typeArr[type];

    if (type === 1 && shareObject.path) {
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
        postGetMiniProgramOpenLink,
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
  postGetMiniProgramOpenLink,
  appId,
}: {
  shareObject: Record<string, any>;
  postGetMiniProgramOpenLink: Function;
  appId: string;
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
        case 1:
          if (shareObject?.path) {
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
              postGetMiniProgramOpenLink,
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
        case 2:
          window.customBrowserInterface?.sendToWeixinWithUrl(
            1,
            shareObject.title,
            shareObject.desc,
            shareObject.link,
            shareObject.icon,
          );
          break;
        case 3:
          window.customBrowserInterface?.sendToQQ(
            2,
            shareObject.title,
            shareObject.desc,
            shareObject.link,
            shareObject.icon,
          );
          break;
        case 4:
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


