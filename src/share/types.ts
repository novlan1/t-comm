export type IShareObject = {
  title?: string;
  desc?: string;
  icon?: string;
  link?: string;

  type?: string | number | null;
  path?: string | null;

  forceHistoryMode?: boolean | null;
  appId?: string;

  isWzydShare?: boolean;
  wzydShareText?: string;

  callback?: () => any;

  getWxSignaturePromise?: () => Promise<any>;
  postGetMiniProgramOpenLink?: () => Promise<any> ;
};

export type IShareUiObj = {
  // initCommShareUI?: Function;
  // showCommShareUI?: Function;
  openShareUI?: Function;

  showCommShareTip?: Function;
};
