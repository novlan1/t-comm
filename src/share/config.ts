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
export const QQ_JS_SDK = 'https://open.mobile.qq.com/sdk/qqapi.js?_bid=152';

export const SHARE_DOM_MAP = {
  SHARE_TIP_DOM_ID: 'div_share_tip',
  SHARE_TIP_STYLE_ID: 'div_share_tip_style',
  SHARE_UI_DOM_ID: 'div_share_ui',
  SHARE_UI_STYLE_ID: 'div_share_ui_style',
};


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

export const SHARE_TYPE_MAP = {
  WX_FRIENDS: 1,
  WX_TIMELINE: 2,
  QQ_FRIENDS: 3,
  QQ_ZONE: 4,
} as const;
export const DEFAULT_SHOW_TYPE_IN_GAME = [
  SHARE_TYPE_MAP.WX_FRIENDS,
  SHARE_TYPE_MAP.WX_TIMELINE,
  SHARE_TYPE_MAP.QQ_FRIENDS,
  SHARE_TYPE_MAP.QQ_ZONE,
] as const;

const SHARE_TYPE_NAME_MAP = {
  [SHARE_TYPE_MAP.WX_FRIENDS]: '微信好友',
  [SHARE_TYPE_MAP.WX_TIMELINE]: '微信朋友圈',
  [SHARE_TYPE_MAP.QQ_FRIENDS]: 'QQ好友',
  [SHARE_TYPE_MAP.QQ_ZONE]: 'QQ空间',
} as const;

export const SHARE_TYPE_LIST = Object.keys(SHARE_TYPE_MAP).map((key) => {
  const value = SHARE_TYPE_MAP[key as keyof typeof SHARE_TYPE_MAP];

  return {
    value,
    label: SHARE_TYPE_NAME_MAP[value],
  };
});
