import { LocationInterface, LocationFlag, LocationResult, LocationOptions } from '../location-interface';
// import { post } from '../../network/post';


// 用特权sdk获取lbs地址
export default class TipSdkLocation implements LocationInterface {
  public getLocation(options: LocationOptions): Promise<LocationResult> {
    return new Promise((resolve, reject) => {
      if (!options.fetchTipSdkLBSRequest) {
        reject();
        return;
      }
      options.fetchTipSdkLBSRequest?.().then((response) => {
        // }))
        // post({
        //   url: 'https://a.igame.qq.com/pmdtrpc.commcgi.user.user/GetUserLbsInfo',
        //   showMsgToast: false,
        //   timeout: options.timeout,
        // }).then((response) => {
        if (response.lbsinfo) {
          if (response.lbsinfo.gpsinfo?.lat && response.lbsinfo.gpsinfo.lng) {
            const location = {
              lat: parseFloat(`${response.lbsinfo.gpsinfo.lat}`),
              lng: parseFloat(`${response.lbsinfo.gpsinfo.lng}`),
            };
            resolve({ location, flag: LocationFlag.LocationSuccess });
          } else if (response.lbsinfo.netinfo?.iplat && response.lbsinfo.netinfo.iplng) {
            const location = {
              lat: parseFloat(`${response.lbsinfo.netinfo.iplat}`),
              lng: parseFloat(`${response.lbsinfo.netinfo.iplng}`),
            };
            resolve({ location, flag: LocationFlag.LocationIpSuccess });
          } else {
            reject();
          }
        } else {
          reject();
        }
      })
        .catch((error) => {
          console.log('GetUserLbsInfo', error);
          reject();
        });
    });
  }
}
