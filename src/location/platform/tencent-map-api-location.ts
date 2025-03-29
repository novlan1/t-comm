import axios from 'axios';

// import { post } from '../../network/post';
import { getAreaCode } from '../../city/city';
import { get } from '../../lodash-mini';
import { LocationFlag, LocationInterface, LocationOptions, LocationResult, tencentMapConfig } from '../location-interface';

// 用腾讯地图api通过IP获取lbs地址
export default class TencentMapApiLocation implements LocationInterface {
  // 用经纬度逆解析出省市信息
  public static getAreaInfoByLatAndLng(lat: number, lng: number) {
    return new Promise((resolve, reject) => {
      axios.get(`https://apis.map.qq.com/ws/geocoder/v1/?location=${lat},${lng}&key=${tencentMapConfig.GEO_KEY_PLUS}`).then((res) => {
        if (res.data) {
          const { data } = res;
          (data as any).city = get(data, 'result.ad_info.city');
          (data as any).province = get(data, 'result.ad_info.province');
          const retList = getAreaCode((data as any).province, (data as any).city);
          if (retList.length > 1) {
            (data as any).provinceId = retList[0] || 0;
            (data as any).cityId = retList[1] || 0;
          }
          resolve(data);
        } else {
          reject();
        }
      })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public getLocation(options: LocationOptions): Promise<LocationResult> {
    return new Promise((resolve, reject) => {
      if (!options.fetchLBSRequest) {
        reject();
        return;
      }

      options.fetchLBSRequest?.().then((res) => {
        // })
        // post({ url: '/pmdtrpc.commcgi.tipcgi.tipcgi/GetLBS', showMsgToast: false }).then((res) => {
        const result = (res?.ip_result) || {};
        const location = (result?.location) || {};

        if (location?.lat && location.lng) {
          const position = {
            lat: location.lat,
            lng: location.lng,
            ip: result.ip,
            type: 'ip',
            adInfo: result.ad_info,
          };
          resolve({ location: position, flag: LocationFlag.LocationIpSuccess });
        } else {
          reject();
        }
      })
        .catch((error) => {
          console.log('TencentMapApiLocation', error);
          reject();
        });
    });
  }
}
