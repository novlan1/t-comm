import { LocationData } from './location-interface';
import { savePersist, getPersist } from '../storage/persist-data';

export default class LocationStorage {
  // 从sessionStorage获取缓存位置信息
  public static getLocationFromSessionStorage(): LocationData | null {
    const storageSession = window.sessionStorage.getItem('position');
    if (storageSession) {
      try {
        const location = JSON.parse(storageSession);
        return location;
      } catch {
        return null;
      }
    }
    return null;
  }

  // 从localStorage获取缓存位置信息
  public static getLocationFromLocalStorage(): LocationData | null {
    const persistPosition = getPersist('position');
    if (persistPosition) {
      try {
        const location = JSON.parse(persistPosition);
        return location;
      } catch {
        return null;
      }
    }
    return null;
  }

  // 存储缓存位置信息到sessionStorage和localStorage
  public static setLocationToStorage(location: LocationData, expireMS: number): void {
    window.sessionStorage.setItem('position', JSON.stringify(location));
    savePersist('position', JSON.stringify(location), expireMS);
  }
}
