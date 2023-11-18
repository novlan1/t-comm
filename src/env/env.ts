import type { IEnv } from './types';
/**
 * 获取UA
 * @private
 * @returns {string} ua
 */
function getRealUA() {
  return (navigator.userAgent || '').toLowerCase();
}

/**
 * 检查是否是ios环境
 * @returns {boolean} 是否是ios环境
 *
 * @example
 *
 * checkUAIsIOS()
 *
 * // => true
 *
 */
export function checkUAIsIOS() {
  const realUA = getRealUA();
  return (
    /iphone|ipod|ipad|Mac OS X/i.test(realUA)
    || !!realUA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  );
}

/**
 * 获取useragent类型
 * @returns {object} useragent的map
 * @example
 *
 * getEnvUAType()
 *
 * // =>
 * {
 *   isWeixin: false,
 *   isWorkWeixin: false,
 *   isQQ: false,
 *   isPvpApp: false,
 *   isTipApp: false,
 *   isAndroid: false,
 *   isIos: true,
 *   isIOS: true,
 *   isMsdk: false,
 *   isMsdkV5: false,
 *   isSlugSdk: false,
 *   isInGame: false,
 *   isGHelper: false,
 *   isGHelper20004: false,
 *   isMiniProgram: false,
 *   isLolApp: false,
 *   isWindowsPhone: false,
 *   isSymbian: false,
 *   isPc: true,
 * };
 *
 */

export function getEnvUAType(): IEnv {
  const ua = getRealUA();
  const isWeixin = ua.indexOf('micromessenger') !== -1;
  const isWorkWeixin = ua.indexOf('wxwork') !== -1;
  const isQQ = ua.indexOf(' qq/') !== -1;
  const isPvpApp = ua.indexOf(' igameapp/') !== -1;
  const isTipApp = ua.indexOf(' gamelife/') !== -1;
  const isAndroid = ua.indexOf('android') !== -1;

  const isIos = checkUAIsIOS();

  const isIOS = isIos;
  const isMsdk = ua.indexOf(' msdk/') !== -1; // msdk
  const isMsdkX = ua.indexOf(' webviewx msdk/') !== -1; // 嵌入式msdk浏览器
  const isMsdkV5 = ua.indexOf(' msdk/5') !== -1; // msdk V5
  const isSlugSdk = ua.indexOf('ingame') !== -1; // 微社区sdk
  const isInGame = isMsdk || isSlugSdk; // 是否游戏内
  const isGHelper = ua.indexOf('gamehelper') !== -1;
  const isGHelper20004 = ua.indexOf('gamehelper_20004') !== -1;
  const isMiniProgram = ua.indexOf('miniprogram') !== -1
    || (typeof window !== 'undefined'
      // eslint-disable-next-line no-underscore-dangle
      && (window as any).__wxjs_environment === 'miniprogram');
  const isLolApp = ua.indexOf('lolapp') !== -1; // 掌上英雄联盟app

  const isWindowsPhone = /(?:Windows Phone)/.test(ua);
  const isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone;
  const isPc = !ua.match(/(phone|pad|pod|iphone|ipod|ios|ipad|android|mobile|blackberry|iemobile|mqqbrowser|juc|fennec|wosbrowser|browserng|webos|symbian|windows phone)/i);
  return {
    isWeixin,
    isWorkWeixin,
    isQQ,
    isPvpApp,
    isTipApp,
    isAndroid,
    isIos,
    isIOS,
    isMsdk,
    isMsdkX,
    isMsdkV5,
    isSlugSdk,
    isInGame,
    isGHelper,
    isGHelper20004,
    isMiniProgram,
    isLolApp,
    isWindowsPhone,
    isSymbian,
    isPc,
  };
}


export function initEnv() {
  return getEnvUAType();
}


/**
 * 检查是否是node环境
 * @return {boolean} 是否node环境
 * @example

  const res = checkNodeEnv();
  // false
 */
export const checkNodeEnv = function () {
  return !((typeof window !== 'undefined' && window.navigator));
};
