declare module 'rollup-plugin-babel'
declare module 'rollup-plugin-eslint'
declare module 'conventional-changelog'


declare const VConsole: any;
declare const uni: any;
declare const GameHelper: any;
declare const getCurrentPages: any;
declare const wx: any;
declare const WeixinJSBridge: any;

declare interface Window {
  VConsole?: any;
  wx?: any;
  mqq?: any;
  html2canvas?: any;

  // share related
  customBrowserInterface?: Record<string, any>
  shareCallBack?: Function;
  setTitleButtonsCallback?: Function;
  msdkShare: any;

  vConsole: any;

  // msdk related
  msdkCallNative?: Function;
  msdkCall?: Function;
  setMsdkCallback?: Function;
  msdkAddNativeCallbackObserver?: Function;
  msdkRemoveNativeCallbackObserver?: Function;
  msdkCloseWebview?: Function;
  msdkiOSHandler?: Function;

  WeixinJSBridge: any;
  msdkShareDelegate?: any;
  WebViewJavascriptBridge?: any;
  msdkNativeCallback?: any;
}

declare interface Document {
  attachEvent?: any;
}
