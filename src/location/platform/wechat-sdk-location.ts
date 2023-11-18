import { LocationInterface, LocationFlag, LocationResult, LocationOptions } from '../location-interface';
// import { configWx } from '../../tools/weixin';

// 用微信sdk获取lbs定位
export default class WechatSdkLocation implements LocationInterface {
  public getLocation(options: LocationOptions): Promise<LocationResult> {
    return new Promise((resolve, reject) => {
      if (!options.configWx) {
        reject();
        return;
      }

      let locationSuccessFlag = false;
      options.configWx?.(['getLocation', 'openLocation'], []).then((wx) => {
        const tmp = {
          type: 'gcj02',
          success(res) {
            const location = {
              lat: parseFloat(res.latitude),
              lng: parseFloat(res.longitude),
            };
            resolve({ location, flag: LocationFlag.LocationSuccess });
            locationSuccessFlag = true;
          },
          fail(error) {
            console.log('WechatSdkLocation', error);
            reject();
            locationSuccessFlag = false;
          },
          complete() {
            if (!locationSuccessFlag) {
              reject();
            }
          },
        };

        (wx as any).getLocation(tmp);
      })
        .catch((error) => {
          console.log('WechatSdkLocation', error);
          reject();
        });
    });
  }
}
