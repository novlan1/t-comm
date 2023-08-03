import type { IGetWxSignaturePromise } from '../wx/types';
// type IGetWxSignaturePromise = any;
export type IGetMiniProgramOpenLink = (params?: any) => Promise<{
  open_link?: string;
}>;

export type IShareObject = {
  title?: string;
  desc?: string;
  icon?: string;
  link?: string;

  type?: string | number | null;
  path?: string | null;
  miniprogram_link?: string | null;

  forceHistoryMode?: boolean | null;
  appId?: string;

  isWzydShare?: boolean;
  wzydShareText?: string;

  callback?: () => any;

  getWxSignaturePromise?: IGetWxSignaturePromise;
  getMiniProgramOpenLink?: IGetMiniProgramOpenLink;

  tipInvoke?: Function;
  pvpInvoke?: Function;

  showTypeInGame?: Array<number>;
};

export type IShareUiObj = {
  openShareUI?: Function;
  showCommShareTip?: Function;
};
