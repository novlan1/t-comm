
enum ReportType {
  PERFORMANCE = 1,
  BUNDLE = 2,
  AUTO_TEST = 3,
  BUNDLE_MP = 4,
}

enum ReportPlatform {
  NOT_KNOWN = 0,
  H5 = 1,
  MP = 2,
}

/**
 * 上报数据到研发平台
 * @param {object} param 参数
 * @param {object} param.data 上报数据
 * @param {string} param.host 请求域名
 * @param {ReportType} param.type 上报类型
 * @param {ReportPlatform} param.platform 上报平台
 * @returns 上报结果
 */
export async function reportToRdPlatform({
  data,
  host,
  type = 1,
  platform = 1,
}: {
  data: any;
  host: any;
  type?: ReportType;
  platform?: ReportPlatform
}) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const axios = require('axios');
  const url = host.includes('localhost:') ? `${host}/performance-report` : `${host}/rd-platform-cgi/performance-report`;

  const res = await axios({
    method: 'POST',
    url,
    data: {
      data,
      type,
      platform,
    },
  })
    .catch((err: unknown) => {
      console.log('[reportToRdPlatform] err', err);
    });

  return res.data;
}
