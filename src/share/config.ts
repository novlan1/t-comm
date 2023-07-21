import type { IShareObject, IShareUiObj } from './types';

export const DEFAULT_API_LIST = [
  'onMenuShareTimeline',
  'onMenuShareAppMessage',
  'onMenuShareQQ',
  'onMenuShareQZone',
  'updateAppMessageShareData',
  'updateTimelineShareData',
];

export const DEFAULT_OPEN_TAG_LIST = [
  'wx-open-launch-weapp',
];

export const DEFAULT_SHARE_ICON = 'http://ossweb-img.qq.com/images/pmd/igameapp/logo/log_igame_3.0.png';
export const WX_JS_SDK = 'https://image-1251917893.file.myqcloud.com/commjs/jweixin-1.6.0.js';
export const QQ_JS_SDK = 'https://open.mobile.qq.com/sdk/qqapi.js?_bid=152';


export class ShareConfig {
  static shareObject: IShareObject;
  static shareUiObj: IShareUiObj;

  static setShareObject(shareObject: IShareObject) {
    this.shareObject = {
      ...this.shareObject,
      ...shareObject,
    };
  }

  static setShareUI(shareUiObj:  IShareUiObj) {
    this.shareUiObj = {
      ...this.shareUiObj,
      ...shareUiObj,
    };
  }
}
