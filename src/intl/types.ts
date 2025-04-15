export interface Options {
  env: string;
  gameID: number;
  appID: string;
  webID: string;

  // cookie 设置的 domain
  cookieDomain: string;

  // 用 cookie 换取登录态的 api 接口
  checkLoginAPI: (userInfo: UserInfo) => Promise<any>;

  // 登录弹窗的选择器
  // 默认为 #infinite-pass-component
  loginDomSelector?: string;
}


export interface UserInfo {
  openid: string;
  token: string;
  channel_info?: {
    channelId: number;
  }
}
