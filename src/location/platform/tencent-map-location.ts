import {
  LocationInterface,
  LocationOptions,
  LocationResult,
  LocationFlag,
  tencentMapConfig,
} from '../location-interface';
import { loader } from '../../loader/loader-unity';
import { getAreaCode } from '../../city/city';


// 用腾讯地图sdk获取lbs地址
export default class TencentMapLocation implements LocationInterface {
  public getLocation(options: LocationOptions): Promise<LocationResult> {
    return new Promise((resolve, reject) => {
      function geoShowPosition(location) {
        if (!!location.province && !!location.city) {
          const retList = getAreaCode(location.province, location.city);
          if (retList.length > 1) {
            location.provinceId = retList[0] || 0;
            location.cityId = retList[1] || 0;
          }
        }
        if (location && location.type !== 'ip') {
          // 拒绝定位会使用ip地址定位
          resolve({ location, flag: LocationFlag.LocationSuccess });
        } else if (location) {
          resolve({ location, flag: LocationFlag.LocationIpSuccess });
        } else {
          reject();
        }
      }

      function geoShowError() {
        reject();
      }

      loader(
        'https://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js',
        () => {
          // @ts-ignore
          const geolocation = new window.qq.maps.Geolocation(
            tencentMapConfig.GEO_KEY,
            tencentMapConfig.GEO_REFERER,
          );
          const tencentMapOptions = {
            timeout: options.timeout,
          };
          geolocation.getLocation(
            geoShowPosition,
            geoShowError,
            tencentMapOptions,
          );
        },
      );
    });
  }
}
