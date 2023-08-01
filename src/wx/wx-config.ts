import type { IGetWxSignaturePromise } from './types';
import { WX_JS_SDK } from './config';
import { loadJS } from '../loader/loader';


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
