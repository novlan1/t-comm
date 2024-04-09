import type { OpenLocation } from './types';

/**
 * 打开地图，查看位置
 * @param param 参数
 * @returns 查看Promise
 * @example
 * ```ts
 * openLocationInMp({
 *   lat,
 *   lng,
 *   name,
 *   address,
 * });
 */
export function openLocationInMp({
  lat = '',
  lng = '',
  name = '',
  address = '',
  scale = 18,
}: OpenLocation) {
  return new Promise((resolve, reject) => {
    uni.openLocation({
      latitude: +lat, // 纬度
      longitude: +lng, // 经度
      name, // 地点名称
      address, // 地址的详细说明
      scale, // 缩放比例
      success(res: any) {
        console.log('打开地图成功');
        resolve(res);
      },
      fail(err: any) {
        console.log('打开地图失败', err);
        reject(err);
      },
    });
  });
}

/**
 * 打开地图，查看位置
 * @param param 参数
 * @returns 查看Promise
 * @example
 * ```ts
 * openLocationInH5({
 *   lat,
 *   lng,
 *   name,
 *   address,
 *
 *   context: this,
 *   route: '/map'
 * });
 * ```
 */
export function openLocationInH5({
  lat = '',
  lng = '',
  name = '',
  address = '',

  route,
  context,
}: OpenLocation): Promise<number> {
  const href =  `https://apis.map.qq.com/uri/v1/marker?marker=coord:${lat},${lng};title:${name};addr:${address}&referer=tip`;
  if (route && context) {
    context.$router.push({
      path: route,
      query: {
        url: decodeURIComponent(href),
      },
    });
    return Promise.resolve(1);
  }
  window.location.href = href;

  return Promise.resolve(1);
}
