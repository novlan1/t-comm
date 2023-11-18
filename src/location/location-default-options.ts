export class LocationDefaultOptions {
  // 默认位置
  public static defaultLocation = {
    lat: 22.548178,
    lng: 113.944866,
  };

  // 配置默认值
  public static defaultTimeout = 3000;
  public static defaultUseWxSdk = true;
  public static defaultUseTipSdk = false;
  public static defaultUseSlugSdk = false;
  public static defaultUseMsdk = false;
  public static defaultUseTencentMap = true;
  public static defaultUseTencentMapIfFail = true;
  public static defaultUseTencentMapApi = false;
  public static defaultCache = true;
  public static defaultLocalCache = false; // 是否使用localStorage
  public static defaultLocalExpireMs = 1000 * 60 * 60 * 24 * 0.5; // 使用localStorage的过期时间，默认0.5天，单位毫秒
  public static defaultTipLocationUsageDesc = '允许当前页面获取你的地理位置信息，以查看你身边的优惠商户和特权商户';
  public static defaultNeedAllowLocation = true;// 是否要经过授权
  public static defaultForceUpdateLocation = false;// 是否需要忽略缓存，强制刷新定位
}
