import mpLocationHandle from './location-handle-mp';

export class LocationMp {
  static getLocation() {
    return mpLocationHandle();
  }
}
