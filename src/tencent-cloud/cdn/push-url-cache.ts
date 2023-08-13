import { fetchCloudData } from '../base/base';

const AREA_MAP = {
  MAINLAND: 'mainland',
  OVERSEAS: 'overseas',
  GLOBAL: 'global',
} as const;

export async function pushUrlCache({
  secretId,
  secretKey,
  area = AREA_MAP.GLOBAL,
  urls,
}: {
  secretId: string;
  secretKey: string;
  area?: (typeof AREA_MAP)[keyof typeof AREA_MAP];
  urls: Array<string>;
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
