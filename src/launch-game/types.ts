export type IBaseLaunchParams = {
  context?: any;
  qrCodeLib?: any;
  dialogHandler?: any;
  otherDialogParams?: Record<string, any>;

  launchParams?: Record<string, any>;

  wxJSLink?: string;
  env?: Record<string, boolean>;
};
