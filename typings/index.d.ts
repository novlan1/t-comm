declare module 'rollup-plugin-babel'
declare module 'rollup-plugin-eslint'
declare module 'conventional-changelog'


declare const VConsole: any;
declare const uni: any;
declare const GameHelper: any;
declare const getCurrentPages: any;

declare interface Window {
  VConsole?: any;
  wx?: any;
  mqq?: any;
  html2canvas?: any;

  // share related
  customBrowserInterface?: Record<string, any>
  shareCallBack?: Function;
  setTitleButtonsCallback?: Function;
}
