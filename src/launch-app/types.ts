export type ILaunchAppParams = {
  isUseSchemeParams?: boolean;

  appid?: string;
  weixinScheme?: string;

  browserAppScheme?: string;
  browserApkScheme?: string;

  qqAppScheme?: string;
  qqAppPackageName?: string;

  openMarket?: boolean;
  appMarketUrl?: string;
  apkMarketUrl?: string;

  needRedirect?: boolean;
  redirectUrl?: string;

  failTips?: string;

  failCallback?: Function | null;
  successCallback?: Function | null;

  pageUrl?: string;

  schemeMap?: Record<string, any>;

  Toast?: {
    showLoading: (str: string) => void;
    dismissLoading: () => void;
  }

  Dialog?: {
    showTipsDialog: (str: string) => void;
  }
};
