import { loadJS } from '../loader/loader';
import {
  WX_JS_SDK,
  ShareConfig,
  SHARE_DOM_MAP,
  SHARE_TYPE_MAP,
} from './config';
import { initCustomDom } from '../dialog/custom-dialog';

import type { IGetWxSignaturePromise } from './types';


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
    styleId: SHARE_DOM_MAP.SHARE_TIP_STYLE_ID,
    styleContent,
    dialogId: SHARE_DOM_MAP.SHARE_TIP_DOM_ID,
    dialogContent,
  });


  const btn = document.getElementById(SHARE_DOM_MAP.SHARE_TIP_DOM_ID);
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
    <a href="javascript:;" class="share-dialog-close" onclick="document.getElementById('${SHARE_DOM_MAP.SHARE_UI_DOM_ID}').style.display='none';">关闭</a>\
    <div class="share-choose-login">\
      <a href="javascript:;" onclick="javascript:${callback}(${SHARE_TYPE_MAP.WX_TIMELINE});">\
        <span class="share-type share-type-1"></span>\
        <span class="share-public-text">朋友圈</span>\
      </a>\
      <a href="javascript:;" onclick="javascript:${callback}(${SHARE_TYPE_MAP.WX_FRIENDS});">\
        <span class="share-type share-type-2"></span>\
        <span class="share-public-text">微信好友</span>\
      </a>\
      <a href="javascript:;" onclick="javascript:${callback}(${SHARE_TYPE_MAP.QQ_FRIENDS});">\
        <span class="share-type share-type-3"></span>\
        <span class="share-public-text">QQ好友</span>\
      </a>\
      <a href="javascript:;" onclick="javascript:${callback}(${SHARE_TYPE_MAP.QQ_ZONE});">\
        <span class="share-type share-type-4"></span>\
        <span class="share-public-text">QQ空间</span>\
      </a>\
    </div>\
  </div>\
  <div class="share-layer" onclick="document.getElementById('${SHARE_DOM_MAP.SHARE_UI_DOM_ID}').style.display='none';"></div>
  `;
  initCustomDom({
    styleId: SHARE_DOM_MAP.SHARE_UI_STYLE_ID,
    styleContent,
    dialogId: SHARE_DOM_MAP.SHARE_UI_DOM_ID,
    dialogContent,
  });
}


export function showCommShareUI() {
  const dom = document.getElementById(SHARE_DOM_MAP.SHARE_UI_DOM_ID);
  if (dom) {
    dom.style.display = 'block';
  }
}


export function showCommShareTip() {
  const dom = document.getElementById(SHARE_DOM_MAP.SHARE_TIP_DOM_ID);
  if (dom) {
    dom.style.display = 'block';
  }
}

export function configWx({
  apiList,
  openTagList,
  getWxSignaturePromise,
}: {
  apiList: Array<string>;
  openTagList: Array<string>;
  getWxSignaturePromise: IGetWxSignaturePromise;
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
  getWxSignaturePromise: IGetWxSignaturePromise;
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

export function calBase64Size(base64url: string) {
  let str = base64url.replace('data:image/png;base64,', '');
  const equalIndex = str.indexOf('=');
  if (str.indexOf('=') > 0) {
    str = str.substring(0, equalIndex);
  }
  const strLength = str.length;
  const fileLength = parseInt(`${strLength - (strLength / 8) * 2}`, 10);
  return (fileLength / 1024).toFixed(2);
}
