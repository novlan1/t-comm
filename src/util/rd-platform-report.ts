
enum ReportType {
  PERFORMANCE = 1,
  BUNDLE = 2,
  AUTO_TEST = 3
}

enum ReportPlatform {
  H5 = 1,
  MP = 2,
}

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
  const res = await axios({
    method: 'POST',
    url: `${host}/rd-platform-cgi/performance-report`,
    data: {
      data,
      type,
      platform,
    },
  })
    .catch((err) => {
      console.log('[reportToRdPlatform] err', err);
    });

  return res.data;
}
