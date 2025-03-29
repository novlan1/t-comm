import { LocationData, LocationFlag, LocationInterface, LocationResult } from '../location-interface';

export default class TencentMapApiLocation implements LocationInterface {
  static lastLocation: LocationData;

  getLocation(): Promise<LocationResult> {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      wx.getLocation({
        type: 'gcj02',
        success(res: any) {
          const location = {
            lat: parseFloat(`${res.latitude}`),
            lng: parseFloat(`${res.longitude}`),
          };
          TencentMapApiLocation.lastLocation = location;
          resolve({ location, flag: LocationFlag.LocationSuccess });
        },
        fail(error: any) {
          console.log('MiniProgramLocation', error);
          // 频繁调用导致失败，返回最后一次location
          if (error.errMsg && error.errMsg.indexOf('频繁调用') > -1) {
            resolve({ location: TencentMapApiLocation.lastLocation, flag: LocationFlag.LocationSuccess });
            return;
          }
          reject();
        },
      });
    });
  }
}
