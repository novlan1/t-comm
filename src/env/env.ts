/**
 * 获取UA
 * @returns ua
 */
function getRealUA() {
  return navigator.userAgent || '';
}

/**
 * 检查是否是ios环境
 * @param ua - useragent
 * @returns 是否是ios环境
 *
 * @example
 * ```ts
 * checkUAIsIOS() // true
 * ```
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

 * @param u - useragent
 * @returns map
 */

export function getEnvUAType() {
  const ua = getRealUA();
  const isWeixin = ua.indexOf('micromessenger') !== -1;
  const isWorkWeixin = ua.indexOf('wxwork') !== -1;
  const isQQ = ua.indexOf(' qq/') !== -1;
  const isPvpApp = ua.indexOf(' igameapp/') !== -1;
  const isTipApp = ua.indexOf(' gamelife/') !== -1;
  const isAndroid = ua.indexOf('android') !== -1;
  // env.isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') !== -1);
  const isIos = checkUAIsIOS();
  const isIOS = isIos;
  const isMsdk = ua.indexOf(' msdk/') !== -1; // msdk
  const isMsdkV5 = ua.indexOf(' msdk/5') !== -1; // msdk V5
  const isSlugSdk = ua.indexOf('ingame') !== -1; // 微社区sdk
  const isInGame = isMsdk || isSlugSdk; // 是否游戏内
  const isGHelper = ua.indexOf('gamehelper') !== -1;
  const isGHelper20004 = ua.indexOf('gamehelper_20004') !== -1;
  const isMiniProgram =    ua.indexOf('miniprogram') !== -1
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
