import { LocationInterface, LocationFlag, LocationResult } from '../location-interface';
import { callJsBrowserAdapter } from '../../msdk/msdk';

export default class SlugSdkLocation implements LocationInterface {
  getLocation(): Promise<LocationResult> {
    return new Promise((resolve, reject) => {
      callJsBrowserAdapter().then(() => {
        if (typeof window.customBrowserInterface === 'object') {
          window.customBrowserInterface.getLocationInfo((result: any) => {
            if (result?.code == 1) {
              const location = { lat: result.latitude, lng: result.longitude };
              resolve({ location, flag: LocationFlag.LocationSuccess });
            } else {
              reject({ flag: result.code });
            }
          });
        } else {
          reject({ flag: LocationFlag.LocationFailed });
        }
      })
        .catch(() => {
          reject({ flag: LocationFlag.LocationFailed });
        });
    });
  }
}
