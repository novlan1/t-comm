import { fetchCloudData } from '../base/base';

const AREA_MAP = {
  MAINLAND: 'mainland',
  OVERSEAS: 'overseas',
  GLOBAL: 'global',
};

export async function pushUrlCache({
  secretId,
  secretKey,
  area = AREA_MAP.GLOBAL,
  urls,
}) {
  return fetchCloudData({
    secretId,
    secretKey,
    action: 'PushUrlsCache',

    version: '2018-06-06',
    endpoint: 'cdn.tencentcloudapi.com',
    service: 'cdn',
    region: '',

    payload: JSON.stringify({
      Urls: urls,
      Area: area,
    }),
  });
}
