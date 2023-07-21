declare module 'rollup-plugin-babel'
declare module 'rollup-plugin-eslint'
declare module 'conventional-changelog'


declare const VConsole: any;
declare const uni: any;
declare const GameHelper: any;

declare interface Window {
  VConsole?: any;
  wx?: any;
  mqq?: any;
  html2canvas?: any;
  customBrowserInterface?: Record<string, any>
}
