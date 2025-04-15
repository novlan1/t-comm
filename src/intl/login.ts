import cookie from 'js-cookie';

import type { Options, UserInfo } from './types';

// 1. 授权登录之后，前端可以拿到 INTLSDK 的 openid、token，
// 把这两个写入 cookie 中，cookie 名称分别为 tip_intl_openid、tip_intl_token。
// 2. url中携带 _ltype=tiploginintl&appid=xxx&channelid=xxx，调用后台1个接口换取登录态，
// 后台校验登录态通过之后，会在 cookie 中写入 session_id。
// 3. 后续调用接口不需要再携带_ltype=tiploginintl&appid=xxx&channelid=xxx，
// 只需要携带cookie中的session_id就可以了。


/**
 * 通过 intl 登录
 * @param {Options} options 参数
 * @example
 *
 * ```ts
 * function loginIntl() {
 *   const checkLoginAPI = res => new Promise((resolve, reject) => {
 *     getScheList({
 *       query: {
 *         ...INTL_CONFIG.extraQueryObject,
 *         appid: INTL_CONFIG.gameID,
 *         channelid: res.channel_info?.channelId,
 *       },
 *     }).then((res) => {
 *       resolve(res);
 *     })
 *       .catch((err) => {
 *         reject(err);
 *       });
 *   });
 *
 *   return loginByIntl({
 *     cookieDomain: COOKIE_DOMAIN,
 *     env: INTL_CONFIG.env,
 *     gameID: INTL_CONFIG.gameID,
 *     appID: INTL_CONFIG.appID,
 *     webID: INTL_CONFIG.webID,
 *     checkLoginAPI,
 *   });
 * }
 *
 * ```
 */
export function loginByIntl(options: Options) {
  return loginIntl(options);
}


function handleUserInfo(res: UserInfo, options: Options) {
  // cookie.set('tip_intl_login_info', JSON.stringify(res), { expires: 7, domain: options.cookieDomain });
  cookie.set('tip_intl_openid', res.openid, { expires: 7, domain: options.cookieDomain });
  cookie.set('tip_intl_token', res.token, { expires: 7, domain: options.cookieDomain });

  return new Promise((resolve, reject) => {
    options.checkLoginAPI(res).then((res) => {
      resolve(res);
    })
      .catch((err) => {
        reject(err);
      });
  });
}


function loginIntl(options: Options) {
  return new Promise((resolve, reject) => {
    const pass = new PassFactory.Pass({
      env: options.env, // Environment
      gameID: options.gameID, // GAME_ID configured in Player Network Console
      appID: options.appID, // APP_ID configured in Player Network Console
      webID: options.webID, // WEB_ID in Player Network Console
    });
    const selector = options.loginDomSelector ?? '#infinite-pass-component';
    console.log('[pass]', pass);

    // Call `start` to mount the Web widget to the specified DOM node
    // After a successful login, the login result is returned in the `onLogin` and `onRegister` events.
    pass.start(selector);

    // You should listen to the events and obtain the user's authentication
    // information when the user completes login or registration.
    pass.on('onLogin', (userInfo: UserInfo) => {
    // After the user fails to log in, the 'onLoginError event' will be triggered,
    // and the game logic after the user successfully logs in, can be processed in the event callback
    // For example, redirect to a specific page
      console.log('[onLogin userInfo]', userInfo);
      handleUserInfo(userInfo, options)
        .then((res) => {
          resolve({
            res,
            pass,
            userInfo,
          });
          pass.hide();
        })
        .catch((err) => {
          reject(err);
        });
    });

    pass.on('onRegister', (userInfo: UserInfo) => {
    // Logic added after successful registration
    // For example, redirect to a specific page
      console.log('[onRegister userInfo]', userInfo);

      handleUserInfo(userInfo, options)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}
