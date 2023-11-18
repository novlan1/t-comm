// 经纬度，等位置信息
export interface LocationData {
  lat: number,
  lng: number,
  type?: string,
}

// 定位flag，标记定位返回结果的类型
export enum LocationFlag {
  LocationSuccess = 1, // gps定位，给精确定位
  LocationIpSuccess = 2, // ip定位，给ip定位
  LocationFailed = 3, // 定位失败，给默认定位
}

// 返回的定位结果
export type LocationResult = {
  location: LocationData
  flag: LocationFlag
};

// 不同定位场景需要实现的接口
export interface LocationInterface {
  getLocation(options?: LocationOptions): Promise<LocationResult>;
}

// 定位方法getLocation的配置参数
export interface LocationOptions {
  // 体验相关
  timeout: number, // 定位超时时间
  // 场景相关
  useWxSdk: boolean,  // 在微信环境下，是否优先使用微信Sdk定位，微信Sdk定位返回的信息将没有省市信息
  useTipSdk: boolean,   // 在游戏内环境，是否优先使用特权Sdk定位，目前只有和平和地主游戏支持
  useTencentMap: boolean // 是否使用腾讯地图定位(前端模式)
  useTencentMapIfFail: boolean,  // 使用特权Sdk定位失败的情况下，是否用腾讯地图定位兜底(前端模式)
  useTencentMapApi: boolean // 是否使用腾讯地图api定位(后台ip定位)
  useSlugSdk: boolean // 是否使用微社区浏览器api定位
  useMsdk: boolean // 是否使用msdk与native交互实现定位(需要游戏自己实现)
  // 缓存相关
  sessionCache: boolean, // 是否使用sessionStorage缓存，推荐使用
  localCache: boolean,   // 是否使用localStorage缓存
  localExpireMs: number, // localStorage缓存过期时间
  useH5Geolocation: boolean, // 是否使用原生的H5定位
  showTipLocationUsageAlert: boolean, // 是否显示tip定位用途提示弹窗
  tipLocationUsageDesc: string, // 定位用途描述，如果不为空，会弹窗让用户确认
  needAllowLocation: boolean, // 是否需要经过授权
  forceUpdateLocation: boolean, // 是否忽略缓存，强制刷新定位信息

  Dialog?: { // 提示弹窗
    confirm: (any) => Promise<any>;
  };
  useMsdkLocation?: boolean; // 是否使用msdk定位，中间层自己限定某些游戏
  msdkLocationReqStr?: string; // msdk定位时，传递的reqData，默认为 JSON.stringify({ cmd: 'reqLocation' })

  // 后台接口请求lbs定位，可为 post({ url: '/pmdtrpc.commcgi.tipcgi.tipcgi/GetLBS', showMsgToast: false })
  fetchLBSRequest?: () => Promise<{
    ip_result: {
      location: {
        lat: number;
        lng: number;
      };
      ip: number;
      ad_info: any;
    }
  }>
  fetchTipSdkLBSRequest?: () => Promise<{
    lbsinfo?: {
      gpsinfo: {
        lat: number | string;
        lng: number | string;
      };
      netinfo: {
        iplat: number | string;
        iplng: number | string;
      }
    };
  }>
  configWx?: (apiList: Array<string>, openTagList: Array<string>) => Promise<any>
}

export const tencentMapConfig = {
  // 腾讯地图定位配置
  GEO_KEY: 'PBDBZ-NC5WP-KRBDR-LUV7Z-OKLOT-LVFQE',
  GEO_KEY_PLUS: '6APBZ-I6NCW-EH7RN-R3PJI-JSZA7-B6FMV', // 地址逆解析api限额比较大的key
  GEO_REFERER: 'tip',
};
