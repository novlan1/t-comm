import { merge } from '../lodash-mini/merge';
import { initEnv } from '../env/env';
import { launchApp } from './core';
import { GAME_GP, GAME_HLDDZ, GAME_LOLM, GAME_MAJIANG, GAME_PVP, GAME_TLBB, GAME_TY, GAME_X5M } from './config';
import type { ILaunchAppParams } from './types';


// 微信的appId
const WX_APP_ID = 'wx3d0d33def060a347';

/**
 * @description 拉起王者荣耀游戏
 * @param {Object} options 可选，覆盖内部默认配置，参考 launchApp 的参数要求
 */
export function gotoWzGame(options: ILaunchAppParams = {}) {
  const env = initEnv();
  const apkName = 'com.tencent.tmgp.sgame';
  const dialogTip = env.isWeixin ? '你还没有安装游戏哦，请安装“王者荣耀”，玩游戏累积战绩领奖' : '你还没有安装游戏哦，请安装“王者荣耀”，玩游戏累积战绩领奖';

  const params = merge({}, {
    // 微信内
    appid: WX_APP_ID,
    weixinScheme: 'wx95a3a4d7c627e07d://',
    // 手Q内拉起
    qqAppScheme: 'tencent1104466820://',
    qqAppPackageName: apkName,
    // 原生浏览器
    browserAppScheme: 'wx95a3a4d7c627e07d://',
    browserApkScheme: 'smoba://',
    // 唤起失败处理开启优先级：跳转下载 > 跳转链接 > 弹窗提示
    openMarket: false,
    needRedirect: false,
    appMarketUrl: 'https://itunes.apple.com/cn/app/id989673964',
    apkMarketUrl: `market://details?id=${apkName}`,
    failTips: dialogTip,
  }, options);

  launchApp(params);
}

/**
 * @description 拉起王者荣耀游戏微社区
 * @param {Object} options          必须，参数对象。除 pageUrl 外，其余参数可选，参考 launchApp 的参数要求
 * @param {String} options.pageUrl  必须，内置落地页。
 */
export function gotoWzCommunity(options: ILaunchAppParams = {}) {
  const env = initEnv();
  let pageUrl = options.pageUrl || '';
  if (pageUrl === '') {
    console.error('参数 pageUrl 为空');
    return;
  }

  // 仅针对安卓，对带参数的链接二次编码
  if (env.isAndroid) {
    pageUrl = encodeURIComponent(pageUrl);
  }

  const apkName = 'com.tencent.tmgp.sgame';
  const scheme = getOpenGameScheme(GAME_PVP, pageUrl);
  const params = merge({}, {
    isUseSchemeParams: true,
    // 微信内
    appid: WX_APP_ID,
    weixinScheme: scheme,
    // 手Q内拉起
    qqAppScheme: scheme,
    qqAppPackageName: apkName,
    // 原生浏览器
    browserAppScheme: scheme,
    browserApkScheme: scheme,
    // 唤起失败处理开启优先级：跳转下载 > 跳转链接 > 弹窗提示
    openMarket: false,
    needRedirect: false,
    appMarketUrl: 'https://itunes.apple.com/cn/app/id989673964',
    apkMarketUrl: `market://details?id=${apkName}`,
    failTips: '前往“王者荣耀-社区-发现-生活福利”，玩游戏累积战绩领奖',
  }, options);

  launchApp(params);
}

/**
 * @description 拉起和平精英游戏
 * @param {Object} options 可选，覆盖内部默认配置，参考 launchApp 的参数要求
 */
export function gotoGPGame(options: ILaunchAppParams = {}) {
  const pageUrl = options.pageUrl || '';
  const scheme = getOpenGameScheme(GAME_GP, pageUrl);
  const qqAppPackageName = 'com.tencent.tmgp.pubgmhd';
  const params = merge({}, {
    isUseSchemeParams: true,
    // 微信内
    appid: WX_APP_ID,
    weixinScheme: scheme,
    // 手Q内拉起
    qqAppScheme: scheme,
    qqAppPackageName,
    // 原生浏览器
    browserAppScheme: scheme,
    browserApkScheme: scheme,
    // 唤起失败处理开启优先级：跳转下载 > 跳转链接 > 弹窗提示
    openMarket: false,
    needRedirect: false,
    appMarketUrl: 'https://itunes.apple.com/cn/app/id1321803705',
    apkMarketUrl: `market://details?id=${qqAppPackageName}`,
    failTips: '你还没有安装游戏哦，请安装“和平精英”，玩游戏累积战绩领奖',
  }, options);

  launchApp(params);
}

/**
 * @description 拉起欢乐斗地主游戏
 * @param {Object} options 可选，覆盖内部默认配置，参考 launchApp 的参数要求
 */
export function gotoDzGame(options: ILaunchAppParams = {}) {
  const pageUrl = options.pageUrl || '';
  const scheme = getOpenGameScheme(GAME_HLDDZ, pageUrl);
  const qqAppPackageName = 'com.qqgame.hlddz';
  const params = merge({}, {
    isUseSchemeParams: true,
    // 微信内
    appid: WX_APP_ID,
    weixinScheme: scheme,
    // 手Q内拉起
    qqAppScheme: scheme,
    qqAppPackageName,
    // 原生浏览器
    browserAppScheme: scheme,
    browserApkScheme: scheme,
    // 唤起失败处理开启优先级：跳转下载 > 跳转链接 > 弹窗提示
    openMarket: false,
    needRedirect: false,
    appMarketUrl: 'https://itunes.apple.com/cn/app/id446324234',
    apkMarketUrl: `market://details?id=${qqAppPackageName}`,
    failTips: '可以微信搜索“欢乐斗地主”小程序，玩游戏累积战绩领奖',
  }, options);

  launchApp(params);
}

/**
 * 拉起欢乐麻将游戏
 * @param {Object} options 可选，覆盖内部默认配置，参考 launchApp 的参数要求
 */
export function gotoMJGame(options = {}) {
  const scheme = getOpenGameScheme(GAME_MAJIANG);
  const qqAppScheme = getOpenGameScheme(GAME_MAJIANG);
  const qqAppPackageName = 'com.qqgame.happymj';
  const params = merge({}, {
    // 微信内
    appid: WX_APP_ID,
    weixinScheme: scheme,
    // 手Q内拉起
    qqAppScheme,
    qqAppPackageName,
    // 原生浏览器
    browserAppScheme: scheme,
    browserApkScheme: scheme,
    // 唤起失败处理开启优先级：跳转下载 > 跳转链接 > 弹窗提示
    openMarket: false,
    needRedirect: false,
    appMarketUrl: 'https://itunes.apple.com/cn/app/id689180123',
    apkMarketUrl: `market://details?id=${qqAppPackageName}`,
    failTips: '你还没有安装游戏哦，请安装“欢乐麻将”，玩游戏累积战绩领奖',
  }, options);

  launchApp(params);
}

/**
 * @description 拉起英雄联盟手游
 * @param {Object} options 可选，覆盖内部默认配置，参考 launchApp 的参数要求
 */
export function gotoLOLMGame(options: ILaunchAppParams = {}) {
  const scheme = getLOLMDeeplinkScheme(options.pageUrl || '');
  const qqAppPackageName = 'com.tencent.lolm';
  const params = merge({}, {
    isUseSchemeParams: true,
    // 微信内
    appid: WX_APP_ID,
    weixinScheme: scheme,
    // 手Q内拉起
    qqAppScheme: scheme,
    qqAppPackageName,
    // 原生浏览器
    browserAppScheme: scheme,
    browserApkScheme: scheme,
    // 唤起失败处理开启优先级：跳转下载 > 跳转链接 > 弹窗提示
    openMarket: false,
    needRedirect: false,
    appMarketUrl: 'https://apps.apple.com/cn/app/id1455054000',
    apkMarketUrl: `market://details?id=${qqAppPackageName}`,
    failTips: '你还没有安装游戏哦，请安装“英雄联盟手游”，玩游戏累积战绩领奖',
  }, options);

  launchApp(params);
}

/**
 * 拉起天龙八部游戏
 * @param {Object} options 可选，覆盖内部默认配置，参考 launchApp 的参数要求
 */
export function gotoTLBBGame(options = {}) {
  const scheme = getOpenGameScheme(GAME_TLBB);
  const qqAppScheme = getOpenGameScheme(GAME_TLBB);
  const qqAppPackageName = 'com.tencent.tmgp.tstl';
  const params = merge({}, {
    // 微信内
    appid: WX_APP_ID,
    weixinScheme: scheme,
    // 手Q内拉起
    qqAppScheme,
    qqAppPackageName,
    // 原生浏览器
    browserAppScheme: scheme,
    browserApkScheme: scheme,
    // 唤起失败处理开启优先级：跳转下载 > 跳转链接 > 弹窗提示
    openMarket: false,
    needRedirect: false,
    appMarketUrl: 'https://itunes.apple.com/cn/app/id1132257692',
    apkMarketUrl: `market://details?id=${qqAppPackageName}`,
    failTips: '你还没有安装游戏哦，可以微信搜索“天龙八部”游戏',
  }, options);

  launchApp(params);
}

/**
 * 拉起天涯明月刀游戏
 * @param {Object} options 可选，覆盖内部默认配置，参考 launchApp 的参数要求
 */
export function gotoTDGame(options = {}) {
  const scheme = getOpenGameScheme(GAME_TY);
  const qqAppScheme = getOpenGameScheme(GAME_TY);
  const qqAppPackageName = 'com.tencent.tmgp.wuxia';
  const params = merge({}, {
    // 微信内
    appid: WX_APP_ID,
    weixinScheme: scheme,
    // 手Q内拉起
    qqAppScheme,
    qqAppPackageName,
    // 原生浏览器
    browserAppScheme: scheme,
    browserApkScheme: scheme,
    // 唤起失败处理开启优先级：跳转下载 > 跳转链接 > 弹窗提示
    openMarket: false,
    needRedirect: false,
    appMarketUrl: '',
    apkMarketUrl: `market://details?id=${qqAppPackageName}`,
    failTips: '你还没有安装游戏哦，请安装“天涯明月刀”，玩游戏累积战绩领奖',
  }, options);

  launchApp(params);
}

/**
 * @description 拉起qq炫舞游戏
 * @param {Object} options 可选，覆盖内部默认配置，参考 launchApp 的参数要求
 */
export function gotoX5MGame(options: ILaunchAppParams = {}) {
  const pageUrl = options.pageUrl || '';
  const scheme = getOpenGameScheme(GAME_X5M, pageUrl);
  const qqAppPackageName = 'com.tencent.tmgp.qqx5';
  const params = merge({}, {
    isUseSchemeParams: true,
    // 微信内
    appid: WX_APP_ID,
    weixinScheme: scheme,
    // 手Q内拉起
    qqAppScheme: scheme,
    qqAppPackageName,
    // 原生浏览器
    browserAppScheme: scheme,
    browserApkScheme: scheme,
    // 唤起失败处理开启优先级：跳转下载 > 跳转链接 > 弹窗提示
    openMarket: false,
    needRedirect: false,
    appMarketUrl: 'https://apps.apple.com/cn/app/id1219233424',
    apkMarketUrl: `market://details?id=${qqAppPackageName}`,
    failTips: '可以微信搜索“QQ炫舞”小程序，玩游戏累积战绩领奖',
  }, options);

  launchApp(params);
}

const getLOLMDeeplinkScheme = function (pageUrl: string) {
  let scheme = 'lolm://';
  if (pageUrl) {
    scheme = `${scheme}?linktype=H5&param1=`;
    // param1的值由lolm侧分配（联系magchang，brucelin）
    // param1=13000 对应H5链接前缀的是https://igame.qq.com/tip/ingame-page/
    // param1=13001 对应H5链接前缀的是https://test.igame.qq.com/tip/ingame-page/
    // param1=13002 对应H5链接前缀的是https://h5.nes.slol.qq.com/
    // param1=13003 对应H5链接前缀的是https://h5-test.nes.slol.qq.com/
    if (pageUrl.indexOf('test.igame.qq.com') !== -1) {
      // scheme += 13001; // 现网测试LOLM无法跳转测试环境，改成现网中转页
      scheme += 13000;
      pageUrl = pageUrl.replace('https://test.igame.qq.com/tip/ingame-page/', '');
    } else if (pageUrl.indexOf('igame.qq.com') !== -1) {
      scheme += 13000;
      pageUrl = pageUrl.replace('https://igame.qq.com/tip/ingame-page/', '');
    } else if (pageUrl.indexOf('h5.nes.slol.qq.com') !== -1) {
      scheme += 13002;
      pageUrl = pageUrl.replace('https://h5.nes.slol.qq.com/', '');
    } else if (pageUrl.indexOf('h5-test.nes.slol.qq.com') !== -1) {
      scheme += 13003;
      pageUrl = pageUrl.replace('https://h5-test.nes.slol.qq.com/', '');
    }
    scheme += `&param2=${pageUrl}`;
  }
  return scheme;
};

/**
 * 获取拉起各个游戏的scheme,如果参数中设置了页面，则为deeplink scheme
 *
 * @param {int} gid 游戏ID
 * @param {String} pageUrl 要打开的页面地址，为空时表示只拉起游戏
 */
export const getOpenGameScheme = function (gid: number, pageUrl = '') {
  const env = initEnv();
  let scheme = '';
  switch (gid) {
    case GAME_PVP:
      scheme = 'tencentmsdk1104466820://';
      if (pageUrl) {
        scheme = `${scheme}?gamedata=JUMPX5_${encodeURIComponent(pageUrl)}`;
      }
      break;
    case GAME_GP:
      scheme = 'pubgmhd1106467070://';
      if (pageUrl) {
        // force关闭拍脸，dir是朝向，fullscreen全屏显示
        scheme = `${scheme}?exdata:method=open_url,url=${encodeURIComponent(pageUrl)},force=1,dir=2,fullscreen=1`;
      }
      break;
    case GAME_HLDDZ:
      scheme = env.isIOS ? 'tencent363://' : 'qqgame.hlddz.scheme://';
      if (pageUrl) {
        const mode = 'MSDK_EmbeddedWebView';
        scheme = `${scheme}${env.isIOS ? '&a=:/' : ''}&Operation=OpenGeneralURL&URL=${pageUrl}&Size=FullScreen&Mode=${mode}&IsVideo=False&CheckGuest=True&InQueue=False&MultiInst=False`;
      }
      break;
    case GAME_MAJIANG:
      scheme = 'happymjscheme://';
      break;
    case GAME_LOLM:
      scheme = getLOLMDeeplinkScheme(pageUrl);
      break;
    case GAME_TY:
      scheme = 'tencent1105636778://';
      break;
    case GAME_TLBB:
      scheme = 'tencent1105245568://';
      break;
    case GAME_X5M:
      scheme = 'tencent1105483033://';
      break;
    default:
      break;
  }
  return scheme;
};

