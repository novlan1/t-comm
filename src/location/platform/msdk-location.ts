import { LocationInterface, LocationFlag, LocationResult, LocationOptions } from '../location-interface';
import { callJsBrowserAdapter, sendToMsdkNative, addMsdkNativeCallbackListener } from '../../msdk/msdk';
// import { GAME_HLDDZ, GAME_GP } from '../../tools/game';
import { initEnv } from '../../env/env';
// import ConfigInfo from '../../config';


export default class MsdkLocation implements LocationInterface {
  getLocation(options: LocationOptions): Promise<LocationResult> {
    return new Promise((resolve, reject) => {
      if (initEnv().isMsdk && options.useMsdkLocation
      // && (ConfigInfo.instance.getTipGid() === GAME_HLDDZ || ConfigInfo.instance.getTipGid() === GAME_GP)
      ) {
        callJsBrowserAdapter().then(() => {
          addMsdkNativeCallbackListener((data: any) => {
            console.log('addMsdkNativeCallbackListener', data);
            const response = JSON.parse(data);
            if (response?.cmd === 'reqLocation') {
              if (response?.ret === 0) {
                const location = { lat: response.latitude || response.lat, lng: response.longitude || response.lng };
                resolve({ location, flag: LocationFlag.LocationSuccess });
              } else {
                reject({ flag: response.ret, errorMsg: response.errorMsg });
              }
            }
          });

          let requestLocationData = '';
          // if (ConfigInfo.instance.getTipGid() === GAME_HLDDZ) {
          if (options.msdkLocationReqStr) {
            requestLocationData = options.msdkLocationReqStr; // 'fakelink://&Operation=ReqLocation';
          } else {
            const reqData = { cmd: 'reqLocation' };
            requestLocationData = JSON.stringify(reqData);
          }

          sendToMsdkNative(requestLocationData);
        })
          .catch(() => {
            console.log('addMsdkNativeCallbackListener error');
            reject({ flag: LocationFlag.LocationFailed });
          });
      } else {
        reject({ flag: LocationFlag.LocationFailed });
      }
    });
  }
}
