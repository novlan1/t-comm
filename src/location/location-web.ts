/* eslint-disable @typescript-eslint/no-misused-promises */
import { LocationOptions, LocationFlag, LocationInterface } from './location-interface';
import { LocationDefaultOptions } from './location-default-options';
import locationHandle from './location-handle-web';
import LocationStorage from './location-storage';
import TencentMapApiLocation from './platform/tencent-map-api-location';
// import Dialog from '../widget/vant/dialog';

export class LocationWeb {
  public static locationFlag = LocationFlag;

  private static instance: LocationWeb = new LocationWeb();
  private static locateTime = 0;

  public static getInstance() {
    return this.instance;
  }

  public static async getLocationPreCheck(options: LocationOptions) {
    return new Promise((resolve) => {
      const alertTips = window.sessionStorage.getItem('tip_is_show_location_usage_alert') || '0';
      if (options.showTipLocationUsageAlert && alertTips !== '1') {
        window.sessionStorage.setItem('tip_is_show_location_usage_alert', '1');
        if (!options.Dialog) {
          resolve(false);
        }

        options.Dialog?.confirm({
          title: '地理位置信息使用申请',
          message: options.tipLocationUsageDesc,
        }).then(() => {
          resolve(true);
        })
          .catch(() => {
            resolve(false);
          });
      } else {
        resolve(true);
      }
    });
  }

  /**
   * 获取定位信息
   * @static
   * @param {object} options 定位参数
   * @param {number} options.timeout 定位超时时间
   * @param {boolean} options.useWxSdk  在微信环境下，是否优先使用微信Sdk定位，微信Sdk定位返回的信息将没有省市信息
   * @param {boolean} options.useTipSdk 在游戏内环境，是否优先使用特权Sdk定位，目前只有和平和地主游戏支持
   * @param {boolean} options.useSlugSdk 在游戏内环境，是否优先使用微社区Sdk定位，目前只有和平游戏支持
   * @param {boolean} options.useMsdk 在游戏内环境，是否优先使用Msdk定位，目前只有地主支持
   * @param {boolean} options.useTencentMap 是否用腾讯地图定位请求经纬度(默认为此种方式,走的是前端授权定位)
   * @param {boolean} options.useTencentMapIfFail 使用特权Sdk定位失败的情况下，是否用腾讯地图定位兜底
   * @param {boolean} options.useTencentMapApi 是否使用腾讯地图api定位(后台IP定位)
   * @param {boolean} options.sessionCache 是否使用sessionStorage缓存，推荐使用
   * @param {boolean} options.localCache 是否使用localStorage缓存
   * @param {number} options.localExpireMs localStorage缓存过期时间
   *
   * @example
   *
   * import Location from 'src/common/location';
   *
   * Location.getLocation({
   *   timeout: 3000,
   *   useWxSdk: false,
   *   useTipSdk: false,
   *   useSlugSdk: false,
   *   useTencentMap: true,
   *   useTencentMapIfFail: false,
   *   useTencentMapApi: false,
   *   sessionCache: false,
   *   localCache: false,
   *   localExpireMs: 100000
   * })
   *   .then((res) => {
   *     window.app.position = res.location;
   *   })
   *   .catch(() => {
   *   });
   *
   */
  public static getLocation(options: LocationOptions) {
    // 填充默认数据
    options.timeout = options.timeout ?? LocationDefaultOptions.defaultTimeout;
    options.useWxSdk = options.useWxSdk ?? LocationDefaultOptions.defaultUseWxSdk;
    options.useTipSdk = options.useTipSdk ?? LocationDefaultOptions.defaultUseTipSdk;
    options.useSlugSdk = options.useSlugSdk ?? LocationDefaultOptions.defaultUseSlugSdk;
    options.useMsdk = options.useMsdk ?? LocationDefaultOptions.defaultUseMsdk;
    options.useTencentMap = options.useTencentMap ?? LocationDefaultOptions.defaultUseTencentMap;
    options.useTencentMapIfFail = options.useTencentMapIfFail ?? LocationDefaultOptions.defaultUseTencentMapIfFail;
    options.useTencentMapApi = options.useTencentMapApi ?? LocationDefaultOptions.defaultUseTencentMapApi;
    options.sessionCache = options.sessionCache ?? LocationDefaultOptions.defaultCache;
    options.localCache = options.localCache ?? LocationDefaultOptions.defaultLocalCache;
    options.localExpireMs = options.localExpireMs ?? LocationDefaultOptions.defaultLocalExpireMs;
    options.tipLocationUsageDesc = options.tipLocationUsageDesc ?? LocationDefaultOptions.defaultTipLocationUsageDesc;
    options.needAllowLocation = options.needAllowLocation ?? LocationDefaultOptions.defaultNeedAllowLocation;
    options.forceUpdateLocation = options.forceUpdateLocation ?? LocationDefaultOptions.defaultForceUpdateLocation;

    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      // 是否要授权
      if (options.needAllowLocation) {
        const isAllowLocation = await this.getLocationPreCheck(options);
        if (isAllowLocation == false) {
          resolve({ location: LocationDefaultOptions.defaultLocation, flag: LocationFlag.LocationFailed });
          return;
        }
      }

      // 如果不是强制刷新定位信息，则走缓存判断，否则忽略缓存
      if (!options.forceUpdateLocation) {
        // 使用sessionStorage存储的位置信息
        if (options.sessionCache && LocationStorage.getLocationFromSessionStorage()) {
          let flag = LocationFlag.LocationSuccess;
          if (LocationStorage.getLocationFromSessionStorage()!.type === 'ip') {
            flag = LocationFlag.LocationIpSuccess;
          }
          resolve({ location: LocationStorage.getLocationFromSessionStorage(), flag });
          return;
        }
        // 使用localStorage存储的位置信息
        if (options.localCache && LocationStorage.getLocationFromLocalStorage()) {
          let flag = LocationFlag.LocationSuccess;
          if (LocationStorage.getLocationFromLocalStorage()!.type === 'ip') {
            flag = LocationFlag.LocationIpSuccess;
          }
          resolve({ location: LocationStorage.getLocationFromLocalStorage(), flag });
          return;
        }
      }

      this.getInstance().locationHandle = locationHandle(options);
      // 读取本地存储的定位时间，和对象存储的比较，取大的，再判断时间（避免重复请求）
      const storedTime = parseInt(window.localStorage.getItem('tip_locate_time') || '0');
      if (this.locateTime < storedTime) {
        this.locateTime = storedTime;
      }
      // 如果当前时间距离上次定位时间超过10s，则可以重新定位（这里避免的是重复请求，其他情况可以打开localCache）
      if (new Date().getTime() - this.locateTime > 10000 && this.getInstance().locationHandle) {
        this.getInstance().locationHandle.getLocation(options).then((res) => {
          resolve(res);
          this.storeLocationInfo(res.location, options);
        })
          .catch((error) => {
            failCallback(error);
          });
      } else {
        resolve({ location: LocationDefaultOptions.defaultLocation, flag: LocationFlag.LocationFailed });
      }

      // 特殊处理下特权sdk定位失败，降级到腾讯地图定位
      const failCallback = (error) => {
        const failHandle = locationHandle.failHandle(options, this.getInstance().locationHandle);
        if (failHandle) {
          this.getInstance().locationHandle = failHandle;
          this.getInstance().locationHandle.getLocation(options).then((res) => {
            resolve(res);
            this.storeLocationInfo(res.location, options);
          })
            .catch((error) => {
              console.log(error);
              resolve({
                location: LocationDefaultOptions.defaultLocation,
                flag: LocationFlag.LocationFailed,
                errorMsg: error?.errorMsg || error?.errMsg,
              });
            });
        } else {
          console.log(error);
          resolve({
            location: LocationDefaultOptions.defaultLocation,
            flag: LocationFlag.LocationFailed,
            errorMsg: error?.errorMsg || error?.errMsg,
          });
        }
      };
    });
  }

  public static getAreaInfoByLatAndLng(lat: number, lng: number) {
    return TencentMapApiLocation.getAreaInfoByLatAndLng(lat, lng);
  }

  /**
   * 存储定位成功和缓存位置信息
   *
   * @param {object} location 位置信息
   * @param {object} options 定位配置信息
   * @private
   */
  private static storeLocationInfo(location, options) {
    // 缓存位置信息
    if (location) {
      // 定位成功后，再读取当前时间，并存储
      this.locateTime = new Date().getTime();
      window.localStorage.setItem('tip_locate_time', `${this.locateTime}`);

      LocationStorage.setLocationToStorage(location, options.localExpireMs);
    }
  }

  private locationHandle: LocationInterface;

  /**
   * @classdesc 定位工具，支持腾讯地图定位、微信的sdk定位、游戏人生sdk定位
   * @constructor
   */
  constructor() {
    this.locationHandle = null as any;
  }
}


