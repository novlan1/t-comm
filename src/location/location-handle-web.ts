import { getEnvUAType } from '../env/env';

import H5GeolocationLocation from './platform/h5-geolocation-location';
import MsdkLocation from './platform/msdk-location';
import SlugSdkLocation from './platform/slug-sdk-location';
import TencentMapApiLocation from './platform/tencent-map-api-location';
import TencentMapLocation from './platform/tencent-map-location';
import TipSdkLocation from './platform/tip-sdk-location';
import WechatSdkLocation from './platform/wechat-sdk-location';

function locationHandle(options: any): any {
  const { isInGame, isMsdkX, isWeixin, isSlugSdk, isMiniProgram } = getEnvUAType();
  let handle;
  if (options.useWxSdk && isWeixin) {
    handle = new WechatSdkLocation();
  } else if (options.useSlugSdk && isSlugSdk) {
    handle = new SlugSdkLocation();
  } else if (options.useMsdk && isMsdkX) {
    handle = new MsdkLocation();
  } else if (options.useTipSdk && isInGame) {
    handle = new TipSdkLocation();
  } else if (options.useTencentMapApi) {
    handle = new TencentMapApiLocation();
  } else if (options.useH5Geolocation && isMiniProgram) {
    handle = new H5GeolocationLocation();
  } else if (options.useTencentMap) {
    handle = new TencentMapLocation();
  }
  return handle;
}

locationHandle.failHandle = function (options: any, handle: any) {
  if (options.useTencentMapIfFail
    && handle
    && handle instanceof TipSdkLocation) {
    return new TencentMapLocation();
  }
};

export default locationHandle;
